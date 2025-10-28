import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET all articles
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const published = searchParams.get('published')

  let query = supabaseAdmin.from('articles').select('*')

  if (published !== null) {
    query = query.eq('published', published === 'true')
  }

  const { data, error } = await query.order('date', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST new article
export async function POST(request: Request) {
  try {
    const article = await request.json()

    const { data, error } = await supabaseAdmin
      .from('articles')
      .insert([article])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
