import { createLazyFileRoute } from '@tanstack/react-router'
import { Home } from '../pages/Home/Home'

export const Route = createLazyFileRoute('/')({
  component: Home,
})