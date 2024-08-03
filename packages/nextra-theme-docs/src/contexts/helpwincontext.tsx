import type { ReactNode, ReactElement, SetStateAction, Dispatch } from 'react'
import { createContext, useState, useContext } from "react";

export type HWContextButtonType = {
    label: string,
    symRef?: string,
    onClick?: () => void
}

export type HWContextType = {
    mdDir: string,
    buttonState: HWContextButtonType[],
    setMDDir: Dispatch<SetStateAction<string>>,
    setButtonState: Dispatch<SetStateAction<HWContextButtonType[]>>
}

export const HWContext = createContext<HWContextType>({
    mdDir: "md/test",
    buttonState: [],
    setMDDir: () => {},
    setButtonState: () => {}
})

export const HWContextProvider = ({ children }: { children: ReactNode
 }): ReactElement => {
    const [ hwMDDir, setHWMDDir ] = useState("md/test")
    const [ hwButtonState, setHWButtonState ] = useState<HWContextButtonType[]>([])
    const val: HWContextType = { mdDir: hwMDDir, buttonState: hwButtonState, setMDDir: setHWMDDir, setButtonState: setHWButtonState }

    return <HWContext.Provider value={val}>{children}</HWContext.Provider>

}

export function useHWContext() {
    return useContext<HWContextType>(HWContext)

}