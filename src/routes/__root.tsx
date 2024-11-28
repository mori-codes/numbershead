import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import styles from "./root.module.css"
import { Logo } from "../components/icons"

const env = import.meta.env.MODE

export const Route = createRootRoute({
  component: () => (
    <>
      <Link to="/" className={styles.logo}>
        <Logo />
      </Link>{" "}
      <Outlet />
      {env === "development" ? <TanStackRouterDevtools /> : null}
    </>
  ),
})
