'use client'
import { redirect } from 'next/navigation'

import { RECIPE_ROUTES } from '../components/nav/utils'

export default function Home() {
  return redirect(RECIPE_ROUTES.all)
}
