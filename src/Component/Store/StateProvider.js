import React, { createContext,useReducer, useContext } from 'react'

export const testContext = createContext()

export const StateProvider=({reducer,initialValue,children})=> {
    return(
    <testContext.Provider value={useReducer(reducer,initialValue)}>
        {children}
    </testContext.Provider>
    )
}
export const useStateValue = ()=>useContext(testContext)
