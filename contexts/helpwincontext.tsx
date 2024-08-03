import type { ReactNode, ReactElement, SetStateAction, Dispatch } from 'react'
import { createContext, useState } from "react";

export type HWContextType = {
    mdDir: string,
    setMDDir: Dispatch<SetStateAction<string>>
}

export const HWContext = createContext<HWContextType>({
    mdDir: "md/test",
    setMDDir: () => {}
})

export const HWContextProvider = ({ children }: { children: ReactNode
 }): ReactElement => {
    const [ hwMDDir, setHWMDDir ] = useState("md/test")
    const val: HWContextType = { mdDir: hwMDDir, setMDDir: setHWMDDir }

    return <HWContext.Provider value={val}>{children}</HWContext.Provider>

}