import {createRoot} from 'react-dom/client'
import {StrictMode} from "react";
import './index.css'
import App from './App.tsx'
import {MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import {Notifications} from "@mantine/notifications";
import {JSX} from "react"
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider>
            <Notifications/>
            <App/>
        </MantineProvider>
    </StrictMode>,
)
