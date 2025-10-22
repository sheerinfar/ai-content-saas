import WaitlistForm from '../components/WaitlistForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">ContentAI</div>
        <div className="space-x-4">
          <button className="px-4 py-2 text-gray-700 hover:text-indigo-600">
            Login
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Create Stunning Content
          <br />
          <span className="text-indigo-600">With AI in Seconds</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Stop spending hours on social media content. Let AI generate 
          engaging posts that match your brand voice perfectly.
        </p>

        <div className="mb-12">
  <WaitlistForm />
</div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">10hrs</div>
            <div className="text-gray-600">Saved per week</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-gray-600">Happy creators</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">50K+</div>
            <div className="text-gray-600">Posts generated</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Create Your Brand</h3>
            <p className="text-gray-600">
              Tell us about your brand voice, audience, and topics. 
              Takes just 5 minutes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold mb-3">AI Generates Content</h3>
            <p className="text-gray-600">
              Our AI creates 5 unique post variations daily, 
              perfectly matching your style.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Review & Publish</h3>
            <p className="text-gray-600">
              Pick your favorites, edit if needed, and post. 
              The AI learns from your choices.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Save 10 Hours Per Week?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join hundreds of creators who've already transformed their workflow
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </div>
  )
}