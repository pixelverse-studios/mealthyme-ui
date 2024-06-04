'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const ROUTE = '/404'

export default function NotFoundPage() {
  const router = useRouter()
  const path = usePathname()
  if (typeof window !== 'undefined' && path !== ROUTE) {
    return router.push(ROUTE)
  }

  return <div>404 page doesnt exist</div>
}
