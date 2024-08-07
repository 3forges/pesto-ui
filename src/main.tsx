import { render } from 'preact'
import { App } from './App.tsx'
import './index.css'

import React from "react"
//import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

/**
 * 
 */
import { ApiProvider } from "@reduxjs/toolkit/query/react"

// import App from "./App"
import "./index.css"
// import { pestoApi } from './app/api/api.ts'
// import * as api from './app/api/'
import { pestoApi } from './app/api/endpoints/'


import { SidebarContext } from './context/SideBarContext.tsx'

render(
    <React.StrictMode>
        <SidebarContext.Provider value={{
            isOpenOnSmallScreens: false,
            isPageWithSidebar: true,
            setOpenOnSmallScreens: (screenSize) => {
                // https://www.flowbite-react.com/docs/components/sidebar#
                console.log(` >>> screenSize is : `, screenSize)
            }
        }}>

                <ApiProvider api={pestoApi}>
                        <App />
                </ApiProvider>

        </SidebarContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')!
)
