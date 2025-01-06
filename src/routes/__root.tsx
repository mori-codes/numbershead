import { createRootRoute, Link, Navigate, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import styles from "./root.module.css"
import { Logo } from "../components/icons"
import { MuteButton } from "../components/buttons"

const env = import.meta.env.MODE

export const Route = createRootRoute({
  component: () => (
    <>
      <Link to="/" className={styles.logo}>
        <Logo />
      </Link>{" "}
      <div className={styles["mute-button"]}>
        <MuteButton />
      </div>
      <Outlet />
      {env === "development" ? <TanStackRouterDevtools /> : null}
    </>
  ),

  notFoundComponent: () => <Navigate to="/" />,
})
