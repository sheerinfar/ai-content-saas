'use client'

import { useState } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setEmail('')
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          You're on the list!
        </h3>
        <p className="text-green-700">
          We'll notify you when we launch. Check your email!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          required
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-900"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? 'Joining...' : 'Join Waitlist'}
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  )
}