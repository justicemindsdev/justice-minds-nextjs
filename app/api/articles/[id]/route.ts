import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET single article by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json(data)
}

// PUT update article
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json()

    const { data, error } = await supabaseAdmin
      .from('articles')
      .update(updates)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

// DELETE article
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabaseAdmin
    .from('articles')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Article deleted successfully' })
}
