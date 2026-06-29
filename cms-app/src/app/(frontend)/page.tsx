'use client'

import dynamic from 'next/dynamic'

const ClientApp = dynamic(() => import('../../gccc/App'), { ssr: false })

export default function FrontendPage() {
  return <ClientApp />
}
