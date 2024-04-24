import axios from 'axios'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const extractorFormSchema = z.object({
  linkEmbed: z.string(),
  userAgent: z.string(),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  const { linkEmbed, userAgent } = extractorFormSchema.parse(body)

  const { data } = await axios.get(linkEmbed, {
    headers: { 'User-agent': userAgent },
  })

  return Response.json(data)
}
