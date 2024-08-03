'use client'

import React, { useContext } from 'react'
import cn from 'clsx'
import useSWR from 'swr'
import { HWContext, useHWContext, HWContextType } from '../contexts/helpwincontext'
import parse, { attributesToProps, Element, HTMLReactParserOptions } from 'html-react-parser'
import ModalImage from 'react-modal-image'

const classes = {
    main: ""
}

type HelpWinProps = {
    chartName?: string,
    children?: any
}

export const HelpWinSWR = ({val}: {val: string}) => {
    let rt = "test"
    const fetcher = (url: any) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`/api/${val}`, fetcher)
    if(error) {
        return <p>error</p>

    } else if(isLoading) {
        return <p>isloading</p>

    }

    if(data) {
        console.log(data)
    }
    const options : HTMLReactParserOptions = {
        replace(domNode) {
            if(domNode instanceof Element && domNode.attribs  && domNode.name && domNode.name === "img") {
                const props = attributesToProps(domNode.attribs)
                return <div><ModalImage small={props.src as string} large={props.src as string} /></div>
            }
        }
    }

    return <div>{parse(data.q, options)}</div>
}

export const HelpWin: React.FC<HelpWinProps> = ({ chartName, children }) => {

    const HWDirContext = useHWContext()
    
    return <div className='nx-sticky nx-pointer-events-none -nx-mt-96 nx-bottom-0 nx-w-full nx-flex nx-h-full nx-justify-end nx-p-4'>
        <div id='helpwin' className=
            "nx-rounded-md nx-h-96 nx-w-96 nx-p-4 nx-bg-gray-300 nx-resize nx-flex nx-flex-col nx-justify-between">
                <div className='nx-w-full nx-pointer-events-auto nx-h-2/3 nx-p-4 nx-text-blue-950 nx-fill-blue-500 nx-overflow-y-scroll'>
                    {/*lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch lorum ipsum bitch*/}
                    
                    {children}
                    <HelpWinSWR val={HWDirContext.mdDir} />
                </div>
                <div className='nx-w-full nx-pointer-events-auto nx-flex nx-flex-row nx-bottom-0 nx-inset-x-0 nx-justify-start'>
                    
                    {HWDirContext.buttonState.map((b) => {
                        return (
                            <button onClick={b.onClick? b.onClick : () => {console.log(`no action ${b.label}`)}} className='nx-p-4 nx-rounded-md nx-fill-white nx-bg-blue-500 hover:nx-bg-blue-600 active:nx-bg-blue-700 nx-text-gray-200 nx-mr-4'>{b.label}</button>
                        )
                    })}
                    
                </div>

        </div>
    </div>
}