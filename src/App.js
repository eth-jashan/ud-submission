import React, { useState, useRef } from "react"
import { Routes, Route } from "react-router-dom"
import "./App.scss"
import * as dayjs from "dayjs"
import * as relativeTimePlugin from "dayjs/plugin/relativeTime"
import { useDispatch } from "react-redux"
import AppContext from "./appContext"
import StartupScreen from "./pages/StartupScreen"
import ConnectScreen from "./pages/ConnectScreen"
import DiscordFallback from "./pages/DiscordFallback"
import TwitterFallback from "./pages/TwitterFallback"
import DashboardScreen from "./pages/Dashboard"

function App() {
    dayjs.extend(relativeTimePlugin)
    const dispatch = useDispatch()

    return (
        <div className="App">
            <div className="App-header">
                <Routes>
                    <Route path="/" element={<ConnectScreen />} />
                    <Route path="/dashboard" element={<DashboardScreen />} />
                    <Route
                        path="/discord/fallback"
                        element={<DiscordFallback />}
                    />
                    <Route
                        path="/twitter/fallback"
                        element={<TwitterFallback />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App
