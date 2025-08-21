// app/hosts/[slug]/page.tsx
import { getHost } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import HostProfile from '@/components/HostProfile'

interface HostPageProps {
  params: Promise<{ slug: string }>
}

export default async function HostPage({ params }: HostPageProps) {
  const { slug } = await params
  const host = await getHost(slug)

  if (!host) {
    notFound()
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <HostProfile host={host} />
    </div>
  )
}

export async function generateMetadata({ params }: HostPageProps) {
  const { slug } = await params
  const host = await getHost(slug)

  if (!host) {
    return {
      title: 'Host Not Found - AirStay',
    }
  }

  return {
    title: `${host.metadata.host_name} - Host Profile - AirStay`,
    description: host.metadata.bio || `Learn about ${host.metadata.host_name}, a host on AirStay`,
  }
}