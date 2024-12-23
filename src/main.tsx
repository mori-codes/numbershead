import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import "./index.css"

import { routeTree } from "./routeTree.gen"
import { NumbersDBProvider } from "./data/NumbersDBProvider"

const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NumbersDBProvider>
      <RouterProvider router={router} />
    </NumbersDBProvider>
  </StrictMode>
)
