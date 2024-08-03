"use client"

import React, { Component, useEffect } from 'react'
import { useState, useContext } from 'react'
import dynamic from 'next/dynamic'
import styles from './counters.module.css'
import * as d3 from 'd3'
import { useConfig, useHWContext, HWContextButtonType } from 'nextra-theme-docs'
import { HWContextType } from '../contexts/helpwincontext'
import { useRouter } from 'next/router'
import { usePathname, useSearchParams } from 'next/navigation'


type Foo = {
  chartCode: string;
  options: object;
  onClick: (any) => void
};

const svgViewportWidth = 600;
const svgViewportHeight = 400;

const symbolregex = /([a-zA-Z0-9]+)\=\>([a-zA-Z0-9]+)(?:: ([?a-zA-Z0-9 ]+)|)(?:\|([a-zA-Z0-9]+)|)(?::>(\S+)|)/g
const seqregex = /[a-zA-Z0-9\(\)]+/g
const seqregex1 = /[a-zA-Z0-9]+/g

const opt = {
  x: 0,
  y: 0,
  'line-width': 1,
  'line-length': 20,
  'text-margin': 10,
  'font-size': 14,
  'font-color': '#555',
  'line-color': '#999',
  'element-color': '#999',
  fill: 'white',
  'yes-text': 'yes',
  'no-text': 'no',
  'arrow-end': 'block',
  scale: 1,
  symbols: {
    start: {
      'font-color': '#FF9696',
      'font-weight': 'bold',
    },
    end: {
      'font-color': '#70C46E',
      'font-weight': 'bold',
    },
  }

};
    
const ComponentWithNoSSR = dynamic<Foo>(
  () => import('../node_modules/react-simple-flowchart/lib/index.js'),
  { ssr: false }
  
)

interface fcsymbol {
  name: string,
  type: string,
  text: string,
  opts: Map<string, fcsymbol>,
  back: Map<string, fcsymbol>,
  link: string,
  true?: string,
  false?: string
}

function parseFlowChart(s: string): Map<string, fcsymbol> {

  let symmap = new Map()
  let matches = [...s.matchAll(symbolregex)].flat()
  let co: fcsymbol = undefined
  let ct = 0

  for(let match of matches) {
    if(symbolregex.test(match)) {
      if(co) {
        symmap.set(co.name, co)
      }
      co = {
        opts: new Map<string, fcsymbol>(),
        back: new Map<string, fcsymbol>(),
      } as fcsymbol
      ct = 1
      continue
    }
    switch(ct) {
      case 1:
        
        co.name = match
        break
      case 2:
        co.type = match
        break
      case 3:
        co.text = match
        break
      default:
    }
    ct += 1
  }

  if(co) {
    symmap.set(co.name, co)
  }

  console.log(symmap)
  return symmap

}

function parseRules(s: string, smap: Map<string, fcsymbol>): Map<string, fcsymbol> {
  let sps = s.split("\n")
  for(let si of sps){
    let matches = [...si.matchAll(seqregex)].flat()
    console.log(`matchall ${matches}`)

    let ct = 0
    let curr : fcsymbol = undefined
    let last : fcsymbol = null

    console.log(matches)
    let fcdir : string = undefined

    for(let match of matches) {
      if(seqregex1.test(match)) {
        let matches1 = [...(match as string).match(seqregex1)].flat()
        curr = smap.get(matches1[0])
        if(last) {
          curr.back.set(last.name, last)
          last.opts.set(matches.length > 1 ? curr.name : "undef", curr)
          console.log("fcdir")
          console.log(fcdir)
          last.true = curr.name
          if(fcdir == "no") {
            last.false = curr.name
          }
        }
        last = curr
        fcdir = matches1[1]
      }
    }
  }
  console.log(smap)
  return smap


}

function symToChart(start: string, syms: Map<string, fcsymbol>): { ccode?: string, rcode?: string } {
  let ccde : string[] = []
  let rcde : string[] = []

  console.log("syms")
  console.log(syms)

  if(syms == undefined) {
    console.log("no syms")
    return undefined
  }

  hSymToR(rcde, [], syms.get(start))
  syms.forEach((val, key, map) => {
    let str : string = `${val.name}=>${val.type}: ${val.text}`
    ccde.push(str)
  })

  let ccdeout = ""
  let rcdeout = ""
  for(let str of ccde) {
    ccdeout += str + "\n"
  }
  for(let str of rcde) {
    rcdeout += str + "\n"
  }


  return {ccode: ccdeout, rcode: rcdeout}
}

function hSymToR(s: string[], p: string[], fc: fcsymbol): void {
  console.log("hsymtor")
  let st : string = ""
  do {
    if(p.includes(fc.name)) {
      break
    }
    st += fc.name /*+ fc.pos +*/ 
    if(fc.opts.keys.length > 1) {
      hSymToR(s, p, fc.opts.get(fc.opts.keys[1]))
    }
    if(p.includes(fc.name)) {
      break
    }
    p.push(fc.name)
    st += "->"
    console.log("st")
    console.log(st)
  } while (fc.opts.keys.length > 0)

}



function NoSSRFlowchart(props) {
  console.log("nossrfc render")
  const cf = useConfig()
  const hwc = useHWContext()
  const router = useRouter()
  const qparams = useSearchParams()
  
  
  //const [count, setCount] = useState(0)
  const [symmap, setSymmap] = useState<Map<string, fcsymbol>>(undefined)
  const [chartCode, setChartCode] = useState(props.chartFile.code)
  const [ruleCode, setRuleCode] = useState(props.chartFile.rules)
  const [selectedSym, setSelectedSym] = useState(undefined)
  const [newOpt, setNewOpt] = useState(opt)
  const [queryTrigger, setQueryTrigger] = useState(true)
  const refLevels = qparams.get("refLevels")
  let selSym = qparams.get("selSym")
  const refSym = qparams.get("refSym")
  const refDir = qparams.get("refDir")
  const thisPath = usePathname()
  useEffect(() => {
    
    setSymmap(parseRules(props.chartFile.rules, parseFlowChart(props.chartFile.code)))
    
  },[])
  
  useEffect(() => {
    console.log("symmappppfsdpfs")
    console.log(symmap)
    if(selSym && queryTrigger && qparams && symmap && router.isReady) {
      let symsel = attemptSelect(selSym, symmap)
      if(symsel != undefined){
        console.log("symsel")
        console.log(symsel)
        let symselopts = Array.from(symsel.opts, ([key, val]) => {return val}) as unknown as fcsymbol[]
        console.log("symselopts")
        console.log(symselopts)
        if(refDir) {
          let symsell = attemptSelect(symsel.true, symmap)
          setWin(symsel.true ? (symsell ? symsell : symselopts[0]) : symselopts[0], symmap, hwc, newMdMap, newLinkMap)
          console.log("with refDir")
        } else {
          setWin(symsel, symmap, hwc, newMdMap, newLinkMap)
        }
      }
      

    }

  }, [qparams, symmap, router])
  

  const selSymColor = "#CDF3FF"
  let newMdMap = new Map<string, string>(Object.entries(props.chartFile.mdMap))
  let newLinkMap = new Map<string, string>(Object.entries(props.chartFile.links))
  /*if(selSym && queryTrigger) {
    setWins(selSym, symmap, hwc, newMdMap, newLinkMap)
    setQueryTrigger(false)
  }*/
  //let fallbackfc : fcsymbol = undefined
    
  
  function attemptSelect(t: string, smap: Map<string, fcsymbol>): fcsymbol {
    let ent : fcsymbol = undefined
    console.log(`ent text ${t}`)
    if(smap.has(t)) {
      ent = smap.get(t)
    } else {
      console.log(t.slice(0, -1))
      if(t.length > 1) {
        console.log("right len")
        if(smap.has(t.slice(0, -1))) {
          console.log(`fsdfs ${smap.has(t.slice(0, -1))}`)
          ent = smap.get(t.slice(0, -1))
        } else {
          console.log("ent is nothing")
        }
      }
    }
    return ent
  }
  
  function setWin(fcs: fcsymbol, smap: Map<string, fcsymbol>, hw: HWContextType, mdMap: Map<string, string>, linkMap: Map<string, string>, callback?: (fcsymbol) => void): void{
    let nu = undefined
    let n0 = undefined
    setSelectedSym([fcs.name, fcs.name + "i"])
    try { 
      if(refLevels != null) {
        nu = JSON.parse(decodeURIComponent(refLevels))
      }
    } catch(err) {
      console.log("json parse error")
      console.log(err)
    }
    if(fcs.type == "end") {
      if(nu) {
        console.log("end end end")
        n0 = nu.pop()
        console.log(n0)
        console.log(nu)
        if(n0) {
          router.push({pathname: n0.pathname, query: {selSym: n0.refSym, refDir:"t", refLevels: JSON.stringify(nu)}})
        } else {
          router.push(router.pathname)
        }
      }
      
    }
    if(linkMap.has(fcs.name)) {
      console.log(`link ${linkMap.get(fcs.name)}`)
      let newRefLevel = nu ? nu : []
      console.log("nrlev")
      console.log(newRefLevel)
      newRefLevel.push({pathname: thisPath, refSym: fcs.name})
      console.log("nrlev1")
      console.log(newRefLevel)
      console.log(typeof(newRefLevel))
      router.push({pathname: linkMap.get(fcs.name), query: {selSym: "st", refLevels: JSON.stringify(newRefLevel)}})
      return
  
    }
    if(mdMap.has(fcs.name)) {
      console.log("ent set md")
      hw.setMDDir("md/" + mdMap.get(fcs.name))
  
    } else {
      hw.setMDDir("md/" + mdMap.get("__DEFAULT"))
    }
    let buttons: HWContextButtonType[] = []
    fcs.opts.forEach((val, key, map) => {
      buttons.push({label: ">" + (props.chartFile.buttonLabels?.hasOwnProperty(val.name) ? props.chartFile.buttonLabels[val.name] : val.name), onClick: () => {setWins(val.name, smap, hw, mdMap, linkMap)}})
  
    })
    fcs.back.forEach((val, key, map) => {
      buttons.push({label: "<" + (props.chartFile.buttonLabels?.hasOwnProperty(val.name) ? props.chartFile.buttonLabels[val.name] : val.name), onClick: () => {setWins(val.name, smap, hw, mdMap, linkMap)}})
    })
    hw.setButtonState(buttons)
    if(callback) {
      callback(fcs)
    }
  
  }

  function getStarts(syms: Map<string, fcsymbol>): fcsymbol[] {
    console.log("getstarts")
    console.log(syms)
    

    let ra = []
    syms?.forEach((val, key, map) => {
      if(val.type == "start") {
        ra.push(val)
      }
    })

    return ra

  }
  
  function setWins(fcs: string, smap: Map<string, fcsymbol>, hw: HWContextType, mdMap: Map<string, string>, linkMap: Map<string, string>, callback?: (fcsymbol) => void): void{
    let ent = attemptSelect(fcs, smap)
    console.log(ent)
    if(ent != undefined && ent != null) {
      //setSelectedSym([ent.name, ent.name + "i"])
      setWin(ent, smap, hw, mdMap, linkMap, callback)
    } else {
      console.log("ent is nothing")
    }
  }

  console.log("strarts")
  console.log(getStarts(symmap))

  /*function handleClick() {
    setCount(count + 1)
  }*/

  

  return (
    <div id='fcwrap' >
      <div className="rounded-md outline-dotted outline-1 overflow-hidden w-fit relative">
        <ComponentWithNoSSR chartCode={props.chartFile?.code + props.chartFile?.rules} options={newOpt} selectedSym={selectedSym} selSymColor={selSymColor} winSet={(elementText, callback) => {
          console.log("setwin")
          setWins(elementText, symmap, hwc, newMdMap, newLinkMap, callback)
          }}/>
          {getStarts(symmap).map((val) => {
            console.log("start buttons")
            
            return <button className='rounded-md border-dotted border border-slate-500 bg-slate-300 text-slate-950 absolute justify-end mr-4 mb-4 p-2 w-[70px] right-0 bottom-0' onClick={()=>{
              window.history.replaceState(null, '', thisPath)
              setWins(val.name, symmap, hwc, newMdMap, newLinkMap)
              }}>{val.name}</button>
          })}
          
      </div>
        
    </div>
  )
}

export default NoSSRFlowchart