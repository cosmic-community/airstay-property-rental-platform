import { Host } from '@/types'

interface HostProfileProps {
  host: Host
}

export default function HostProfile({ host }: HostProfileProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-shrink-0">
          {host.metadata.profile_photo ? (
            <img
              src={`${host.metadata.profile_photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={host.metadata.host_name}
              width="120"
              height="120"
              className="w-30 h-30 rounded-full object-cover"
            />
          ) : (
            <div className="w-30 h-30 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-6xl">👤</span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {host.metadata.host_name}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {host.metadata.response_rate && (
              <div>
                <span className="text-sm text-gray-600 block mb-1">Response Rate</span>
                <span className="text-lg font-semibold text-gray-900">
                  {host.metadata.response_rate}
                </span>
              </div>
            )}
            
            {host.metadata.member_since && (
              <div>
                <span className="text-sm text-gray-600 block mb-1">Member Since</span>
                <span className="text-lg font-semibold text-gray-900">
                  {new Date(host.metadata.member_since).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </span>
              </div>
            )}
            
            {host.metadata.email && (
              <div>
                <span className="text-sm text-gray-600 block mb-1">Contact</span>
                <span className="text-lg font-semibold text-gray-900">
                  Available
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {host.metadata.bio && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {host.metadata.bio}
          </p>
        </div>
      )}
    </div>
  )
}