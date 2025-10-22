'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function GenerateContent() {
  const [brands, setBrands] = useState<any[]>([])
  const [selectedBrand, setSelectedBrand] = useState<any>(null)
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [generatedContent, setGeneratedContent] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingBrands, setLoadingBrands] = useState(true)

  useEffect(() => {
    loadBrands()
  }, [])

  const loadBrands = async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false })

    if (data && data.length > 0) {
      setBrands(data)
      setSelectedBrand(data[0])
    }
    setLoadingBrands(false)
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBrand) return

    setLoading(true)

    try {
      const res = await fetch('/api/generate-branded', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: {
            brandName: selectedBrand.brand_name,
            brandVoice: selectedBrand.brand_voice,
            topics: selectedBrand.topics,
            targetAudience: selectedBrand.target_audience,
            platforms: selectedBrand.platforms,
          },
          topic,
          platform,
        }),
      })

      const data = await res.json()

      if (data.error) {
        alert(data.error)
      } else {
        setGeneratedContent([
          {
            platform,
            content: data.content,
            timestamp: new Date(),
          },
          ...generatedContent,
        ])
      }
    } catch (err) {
      alert('Something went wrong')
    }

    setLoading(false)
  }

  if (loadingBrands) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-gray-600">Loading your brands...</div>
        </div>
      </div>
    )
  }

  if (!selectedBrand) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create Your First Brand
          </h1>
          <p className="text-gray-600 mb-6">
            You need to create a brand profile before generating content
          </p>
          <button
            onClick={() => (window.location.href = '/create-brand')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
          >
            Create Brand Profile
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Generate Content
          </h1>
          <p className="text-gray-600">
            Create posts that match your brand voice perfectly
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar - Brand Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              {brands.length > 1 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Brand
                  </label>
                  <select
                    value={selectedBrand?.id}
                    onChange={(e) => {
                      const brand = brands.find((b) => b.id === e.target.value)
                      setSelectedBrand(brand)
                    }}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                  >
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.brand_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <h2 className="font-bold text-lg mb-4">
                {selectedBrand?.brand_name}
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Voice</div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium capitalize">
                    {selectedBrand?.brand_voice}
                  </span>
                </div>

                {selectedBrand?.target_audience && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Audience</div>
                    <div className="text-sm">{selectedBrand.target_audience}</div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-gray-600 mb-2">Topics</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedBrand?.topics?.map((t: string) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Platforms</div>
                  <div className="flex gap-2">
                    {selectedBrand?.platforms?.map((p: string) => (
                      <span key={p} className="text-2xl">
                        {p === 'instagram' && '📷'}
                        {p === 'twitter' && '𝕏'}
                        {p === 'linkedin' && '💼'}
                        {p === 'tiktok' && '🎵'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => (window.location.href = '/create-brand')}
                className="w-full mt-6 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-indigo-600 hover:text-indigo-600"
              >
                + Create New Brand
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="font-bold text-xl mb-4">Generate New Post</h2>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Platform
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: 'instagram', label: 'Instagram', icon: '📷' },
                      { value: 'twitter', label: 'Twitter', icon: '𝕏' },
                      { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
                      { value: 'tiktok', label: 'TikTok', icon: '🎵' },
                    ].map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setPlatform(p.value)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          platform === p.value
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{p.icon}</div>
                        <div className="text-xs font-medium">{p.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What do you want to post about?
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Time management tips for busy entrepreneurs"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Quick ideas:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrand?.topics?.slice(0, 5).map((t: string) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(`Share tips about ${t.toLowerCase()}`)}
                        className="px-3 py-1 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-full text-xs font-medium transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Generating...' : '✨ Generate Content'}
                </button>
              </form>
            </div>

            {/* Generated Content */}
            {generatedContent.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-bold text-xl">Generated Posts</h2>
                {generatedContent.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-600"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {item.platform === 'instagram' && '📷'}
                          {item.platform === 'twitter' && '𝕏'}
                          {item.platform === 'linkedin' && '💼'}
                          {item.platform === 'tiktok' && '🎵'}
                        </span>
                        <span className="font-semibold capitalize">
                          {item.platform}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {item.content}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.content)
                          alert('Copied!')
                        }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                      >
                        📋 Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}