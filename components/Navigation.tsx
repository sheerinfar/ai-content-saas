'use client'

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-xl font-bold text-indigo-600">
            ✨ ContentAI
          </a>

          <div className="flex items-center gap-6">
            <a href="/" className="text-gray-700 hover:text-indigo-600 font-medium">
              Home
            </a>
            <a href="/create-brand" className="text-gray-700 hover:text-indigo-600 font-medium">
              Create Brand
            </a>
            <a href="/generate" className="text-gray-700 hover:text-indigo-600 font-medium">
              Generate
            </a>
            <a href="/create-brand" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}