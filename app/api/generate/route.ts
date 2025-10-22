import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { prompt, platform } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const platformInstructions = {
      instagram: 'Create an engaging Instagram caption (150-300 characters). Include 2-3 relevant emojis and 3-5 hashtags at the end.',
      twitter: 'Create a Twitter/X post (max 280 characters). Be concise, engaging, and include 1-2 relevant hashtags.',
      linkedin: 'Create a professional LinkedIn post (300-500 words). Focus on insights and value. Use a professional tone.',
      tiktok: 'Create a TikTok video script with: Hook (first 3 seconds), Main Content, and Call-to-Action. Be energetic and engaging.',
    }

    const instruction = platformInstructions[platform as keyof typeof platformInstructions] || platformInstructions.instagram

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert social media content creator. ${instruction}`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    })

    const content = completion.choices[0].message.content

    return NextResponse.json({
      success: true,
      content,
      platform,
      tokensUsed: completion.usage?.total_tokens || 0,
    })
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    )
  }
}