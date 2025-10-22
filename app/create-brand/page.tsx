'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function CreateBrand() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    profileType: 'personal',
    brandName: '',
    description: '',
    targetAudience: '',
    brandVoice: 'casual',
    topics: [] as string[],
    platforms: [] as string[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        alert('Please log in first!')
        router.push('/login')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('brands')
        .insert([{
          user_id: user.id,
          profile_type: formData.profileType,
          brand_name: formData.brandName,
          description: formData.description,
          target_audience: formData.targetAudience,
          brand_voice: formData.brandVoice,
          topics: formData.topics,
          platforms: formData.platforms,
        }])
        .select()

      if (error) throw error

      alert('Brand created! 🎉')
      router.push('/generate')
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className={`flex-1 h-2 rounded-full mx-1 ${num <= step ? 'bg-indigo-600' : 'bg-gray-200'}`} />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">Step {step} of 4</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tell us about your brand</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">What type of profile is this?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'personal', label: 'Personal Brand', icon: '👤' },
                      { value: 'business', label: 'Business', icon: '🏢' },
                      { value: 'agency', label: 'Agency/Multiple Brands', icon: '🎯' },
                    ].map((type) => (
                      <button key={type.value} type="button" onClick={() => setFormData({ ...formData, profileType: type.value })}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${formData.profileType === type.value ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="text-sm font-semibold">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Brand Name *</label>
                  <input type="text" required value={formData.brandName} onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none" placeholder="e.g., Sarah's Sustainable Style" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">What do you do?</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none" placeholder="I help women build sustainable wardrobes..." />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Who's your audience?</label>
                  <input type="text" value={formData.targetAudience} onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none" placeholder="e.g., Women 25-40 interested in sustainable fashion" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose your brand voice</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'casual', label: 'Casual & Friendly', desc: 'Conversational, like talking to a friend' },
                    { value: 'professional', label: 'Professional', desc: 'Polished and business-focused' },
                    { value: 'humorous', label: 'Humorous & Playful', desc: 'Witty, fun, and entertaining' },
                    { value: 'inspirational', label: 'Inspirational', desc: 'Motivating and uplifting' },
                  ].map((voice) => (
                    <button key={voice.value} type="button" onClick={() => setFormData({ ...formData, brandVoice: voice.value })}
                      className={`p-6 rounded-lg border-2 text-left transition-all ${formData.brandVoice === voice.value ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                      <div className="font-bold text-gray-900 mb-1">{voice.label}</div>
                      <div className="text-sm text-gray-600">{voice.desc}</div>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select your platforms</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Instagram', 'Twitter', 'LinkedIn', 'TikTok'].map((platform) => (
                      <button key={platform} type="button"
                        onClick={() => {
                          const platforms = formData.platforms.includes(platform.toLowerCase())
                            ? formData.platforms.filter((p) => p !== platform.toLowerCase())
                            : [...formData.platforms, platform.toLowerCase()]
                          setFormData({ ...formData, platforms })
                        }}
                        className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${formData.platforms.includes(platform.toLowerCase()) ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-300 hover:border-gray-400'}`}>
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What topics do you post about?</h2>
                <p className="text-gray-600 mb-4">Select topics you commonly create content about</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Fashion', 'Sustainability', 'Lifestyle', 'Business', 'Entrepreneurship', 'Startups', 'Finance', 'Investing', 'Real Estate', 'Productivity', 'Leadership', 'Sales', 'Marketing', 'Social Media', 'Content Creation', 'Health', 'Fitness', 'Wellness', 'Mental Health', 'Nutrition', 'Food', 'Cooking', 'Travel', 'Technology', 'AI & Machine Learning', 'Web Development', 'Design', 'Photography', 'Personal Growth', 'Motivation', 'Self Improvement', 'Education', 'Parenting', 'Relationships', 'Politics', 'News & Current Events', 'Environment', 'Science', 'Sports', 'Gaming', 'Entertainment', 'Music', 'Art', 'Books'].map((topic) => (
                    <button key={topic} type="button"
                      onClick={() => {
                        const topics = formData.topics.includes(topic) ? formData.topics.filter((t) => t !== topic) : [...formData.topics, topic]
                        setFormData({ ...formData, topics })
                      }}
                      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${formData.topics.includes(topic) ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-300 hover:border-gray-400'}`}>
                      {topic}
                    </button>
                  ))}
                </div>
                <div className="text-center text-gray-500 text-sm">Selected: {formData.topics.length} topics</div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect your social media</h2>
                <p className="text-gray-600 mb-6">Connect your accounts so our AI can learn from your existing posts</p>
                <div className="space-y-4">
                  {[
                    { name: 'Instagram', icon: '📷', bg: 'from-purple-500 to-pink-500' },
                    { name: 'Twitter / X', icon: '𝕏', bg: 'black' },
                    { name: 'LinkedIn', icon: '💼', bg: 'blue-600' },
                    { name: 'TikTok', icon: '🎵', bg: 'black' },
                  ].map((social) => (
                    <div key={social.name} className="border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${social.bg} rounded-xl flex items-center justify-center text-white text-2xl`}>{social.icon}</div>
                          <div>
                            <div className="font-bold text-gray-900">{social.name}</div>
                            <div className="text-sm text-gray-600">Import your recent posts</div>
                          </div>
                        </div>
                        <button type="button" onClick={() => alert('Coming soon!')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">Connect</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <div>
                      <div className="font-semibold text-blue-900 mb-1">Don't have posts yet? No problem!</div>
                      <div className="text-sm text-blue-800">You can skip this step and start generating content right away.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400">Back</button>
              )}
              {step < 4 ? (
                <button type="button" onClick={() => setStep(step + 1)} className="ml-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">Continue</button>
              ) : (
                <button type="submit" disabled={loading} className="ml-auto px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">
                  {loading ? 'Creating...' : 'Create Brand Profile ✨'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}