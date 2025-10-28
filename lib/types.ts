// Database types for Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          date: string
          kicker: string
          title: string
          excerpt: string
          content: string
          meta: string | null
          image_url: string | null
          published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          slug: string
          date: string
          kicker: string
          title: string
          excerpt: string
          content: string
          meta?: string | null
          image_url?: string | null
          published?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          slug?: string
          date?: string
          kicker?: string
          title?: string
          excerpt?: string
          content?: string
          meta?: string | null
          image_url?: string | null
          published?: boolean
        }
      }
    }
  }
}

// Article type for use in components
export interface Article {
  id: string
  slug: string
  date: string
  kicker: string
  title: string
  excerpt: string
  content: string
  meta?: string | null
  image_url?: string | null
  published: boolean
  created_at: string
  updated_at: string
}
