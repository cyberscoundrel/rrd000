import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlowChart from 'flowchart.js';
import * as d3 from "d3";
import d3Transform from 'd3-transform' 

const svgViewportWidth = 600;
const svgViewportHeight = 400;

var transx = 0
var transy = 0
var matx

class Flowchart extends Component {

  constructor(props) {
    super(props)
    this.tx = 0
    this.ty = 0
  }




  loadChart() {
    const { chartCode, options, winSet, selectedSym } = this.props
    console.log("options")
    console.log(options)
    const flowNew = FlowChart.parse(chartCode);
    var targetsvg = undefined
    var ptrn =  undefined

    const mfroms = (st) => {

      var matches = [...st.matchAll(/([\d.-]+)/g)]
      return {
        a: parseFloat(matches[0][0]), 
        b: parseFloat(matches[1][0]), 
        c: parseFloat(matches[2][0]), 
        d: parseFloat(matches[3][0]), 
        e: parseFloat(matches[4][0]), 
        f: parseFloat(matches[5][0])
      }
      
    }

    console.log(options)

    if (this.chart) {
      try{
        this.chart.removeChild(this.chart.children[0]);
      } catch(err) {
        console.log("no chart to remove")
        console.log(err)
      }
      flowNew.drawSVG(this.chart, options);
      targetsvg = d3.select('#fcwrap').select('svg')
      d3.select('#fcwrap').select('svg')
      .attr('viewBox', [0, 0, svgViewportWidth, svgViewportHeight].join(' '))
      .attr('height', svgViewportHeight)
      .attr('width', svgViewportWidth)
    }
    const allnodes = targetsvg.selectChildren()
    const contentWrap = targetsvg.append('g').attr('id', 'contentwrap')
    contentWrap.attr('transform', `matrix(1,0,0,1,${transx},${transy})`)
    let thisal = this
    allnodes.each(function() {
      let selected = d3.select(this)
      selected.on("click", (e) => {
        if(winSet != undefined) {
          console.log("winset undef")
          //const thsel = d3.select(this).node().getCTM().inverse().multiply( targetsvg.node().getCTM() )
          
          winSet(d3.select(this).attr("id"), (s) => {
            let trns = mfroms(d3.select(`#${s.name}t`).attr("transform"))
            console.log(d3.select(`#${s.name}t`).attr("transform"))
            console.log(trns)
            transx = -trns.e
            transy = -trns.f
            thisal.setState(thisal.state)

          })
          //transx = thsel.e
          //transy = thsel.f
          //contentWrap.attr('transform', `matrix(${thsel.a},${thsel.b},${thsel.c},${thsel.d},${thsel.e},${thsel.f})`)
        }
      })
      selected.style('cursor', 'pointer')
      contentWrap.node().appendChild(this)
    })
    
    const handleDrag = d3.drag()
    .subject(function() {
      const me = d3.select(this);
      return { x: transx, y: transy }
    })
    .on('drag', function(event) {
      const me = d3.select(this);
      const transform = `matrix(1,0,0,1,${transx},${transy})`;
      transx = event.x
      transy = event.y
      me.attr('transform', transform);
    });

    handleDrag(contentWrap)
    ptrn = d3.select('#fcwrap').select('svg').append('pattern')
      .attr('id', "pattern-circles")
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 20)
      .attr('height', 20)
      .attr('patternUnits', "userSpaceOnUse")
      .attr('patternContentUnites', "userSpaceOnUse")
    ptrn.append('rect')
      .attr('id', "pattern-rect")
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', "#ececec")
    ptrn.append('circle')
      .attr('id', "pattern-circle")
      .attr('cx', 10)
      .attr('cy', 10)
      .attr('r', 1)
      .attr('fill', "#d0d0d0")
    contentWrap.append('rect')
      .attr('class', 'mouse-capture')
      .attr('x', -5000)
      .attr('y', -5000)
      .attr('width', 15000)
      .attr('height', 15000)
      .attr('fill', "url(#pattern-circles)")
      .lower() // put it below the map

    ptrn.lower()

    let selectedSymb = this.props.selectedSym

    console.log("selectedSymb")
    console.log(this.props.selectedSym)

    try {
      for(let str of selectedSymb) {
        console.log(`sym str ${str}`)
        let el = d3.select('#fcwrap').select('svg').select(`#${str}`)
        console.log(el)
        el.attr('fill', this.props.selSymColor)
      }
    } catch(err) {
      console.log("selected sym error")
      console.log(err)
    }

  }

  static propTypes = {
    chartCode: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    winSet: PropTypes.func,
    selectedSym: PropTypes.object,
    selSymColor: PropTypes.string
  };

  static defaultProps = {
    onClick: () => null
};

  componentDidMount() {
    this.loadChart()

  };

  componentDidUpdate() {
    this.loadChart()
    
  };

  handleClick(e) {
    if (e.target.tagName === 'tspan') {
      this.props.onClick(e.target.innerHTML);
    }
    if (e.target.tagName === 'rect' || e.target.tagName === 'path') {
      this.props.onClick(e.target.id);
    }

  }

  render() {
    return (
      <div ref={div => this.chart = div} />
    );
  };
}

export default Flowchart;

