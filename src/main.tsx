import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./AppDoctorPaws.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

import './api/doctorPawsApi.ts';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
