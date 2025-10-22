import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { brand, topic, platform } = await request.json()

    // Build a detailed prompt using brand info
    const systemPrompt = `You are a social media content creator for "${brand.brandName}".

Brand Voice: ${brand.brandVoice}
Target Audience: ${brand.targetAudience}
Topics: ${brand.topics.join(', ')}

Create content that:
- Matches the ${brand.brandVoice} tone perfectly
- Speaks directly to ${brand.targetAudience}
- Sounds authentic and personal, not generic AI
- Uses natural language this brand would actually use

Platform: ${platform.toUpperCase()}
${getPlatformGuidelines(platform)}`

    const userPrompt = `Create a ${platform} post about: ${topic}

Make it sound like it's coming from ${brand.brandName}, not a generic AI. Be authentic!`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.9, // Higher for more personality
      max_tokens: 500,
    })

    const content = completion.choices[0].message.content

    return NextResponse.json({
      success: true,
      content,
      brand: brand.brandName,
    })
  } catch (error: any) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate' },
      { status: 500 }
    )
  }
}

function getPlatformGuidelines(platform: string): string {
  const guidelines = {
    instagram: 'Instagram caption (150-300 chars). Include 2-3 emojis and 3-5 hashtags.',
    twitter: 'Twitter post (max 280 chars). Concise and punchy. 1-2 hashtags max.',
    linkedin: 'LinkedIn post (300-500 words). Professional but personable. Focus on insights and value.',
    tiktok: 'TikTok video script: Hook (3 sec), Main Content (20 sec), CTA (5 sec). Energetic and engaging!',
  }
  return guidelines[platform as keyof typeof guidelines] || guidelines.instagram
}