import { createLazyFileRoute } from '@tanstack/react-router'
import { Create } from '../pages/Create/Create'

export const Route = createLazyFileRoute('/new')({
  component: Create,
})
