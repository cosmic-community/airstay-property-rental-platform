import Link from 'next/link'
import { Host } from '@/types'

interface HostCardProps {
  host: Host
  pricePerNight: number
}

export default function HostCard({ host, pricePerNight }: HostCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-bold text-gray-900">
            ${pricePerNight}
          </span>
          <span className="text-gray-600">/night</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Host
        </h3>
        
        <Link href={`/hosts/${host.slug}`} className="block hover:bg-gray-50 rounded-lg p-4 -m-4 transition-colors duration-200">
          <div className="flex items-center gap-4">
            {host.metadata.profile_photo ? (
              <img
                src={`${host.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                alt={host.metadata.host_name}
                width="60"
                height="60"
                className="w-15 h-15 rounded-full object-cover"
              />
            ) : (
              <div className="w-15 h-15 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-400 text-2xl">👤</span>
              </div>
            )}
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">
                {host.metadata.host_name}
              </h4>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                {host.metadata.response_rate && (
                  <span>{host.metadata.response_rate} response rate</span>
                )}
                {host.metadata.member_since && (
                  <span>Member since {new Date(host.metadata.member_since).getFullYear()}</span>
                )}
              </div>
            </div>
          </div>
          
          {host.metadata.bio && (
            <p className="text-sm text-gray-600 mt-3 line-clamp-3">
              {host.metadata.bio}
            </p>
          )}
        </Link>
      </div>
      
      <div className="mt-6">
        <button className="btn-primary w-full">
          Contact Host
        </button>
      </div>
    </div>
  )
}