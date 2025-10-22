'use client'

import { useState } from 'react'

export default function TestAI() {
  const [prompt, setPrompt] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResponse('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, platform }),
      })

      const data = await res.json()

      if (data.error) {
        setError(data.error)
      } else {
        setResponse(data.content || '')
      }
    } catch (err: any) {
      setError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🤖 Test AI Content Generator
          </h1>
          <p className="text-gray-600">
            See the magic happen in real-time!
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Choose Platform:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['instagram', 'twitter', 'linkedin', 'tiktok'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      platform === p
                        ? 'bg-indigo-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What do you want to post about?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Write about the benefits of morning coffee and productivity"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-900 min-h-32"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
            >
              {loading ? 'Generating...' : '✨ Generate Content'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-red-600 font-medium">❌ {error}</p>
            </div>
          )}

          {response && (
            <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎉</span>
                <h3 className="text-lg font-bold text-gray-900">
                  Generated {platform.charAt(0).toUpperCase() + platform.slice(1)} Post:
                </h3>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {response}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(response)
                  alert('Copied to clipboard!')
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              >
                📋 Copy to Clipboard
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-gray-900 mb-3">💡 Try These Example Prompts:</h3>
          <div className="space-y-2">
            {[
              'Write about sustainable fashion and eco-friendly clothing',
              'Share tips for productivity and time management',
              'Post about the benefits of meditation and mindfulness',
            ].map((example, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(example)}
                className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-indigo-50 rounded-lg text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              >
                → {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}