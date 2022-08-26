import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import store, { persistor } from "./store/index"
// import "./assets/fonts/PPTelegraf-Medium.otf"
import { PersistGate } from "redux-persist/integration/react"
import "@rainbow-me/rainbowkit/dist/index.css"

if (process.env.NODE_ENV === "production") {
    console.log = () => {}
    // console.error = () => {}
    console.debug = () => {}
}

function getLibrary(provider) {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
