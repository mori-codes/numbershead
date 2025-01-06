import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import "./index.css"

import { routeTree } from "./routeTree.gen"
import { NumbersDBProvider } from "./data/NumbersDBProvider"
import { AudioProvider } from "./helpers/useAudio"

const router = createRouter({ routeTree, notFoundMode: "root" })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NumbersDBProvider>
      <AudioProvider>
        <RouterProvider router={router} />
      </AudioProvider>
    </NumbersDBProvider>
  </StrictMode>
)
