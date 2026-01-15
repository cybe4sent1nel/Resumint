import { NextResponse } from 'next/server'
import { serve } from 'inngest/next'
import { inngest, inngestFunctions } from '@/lib/inngest/functions'

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: inngestFunctions,
})
