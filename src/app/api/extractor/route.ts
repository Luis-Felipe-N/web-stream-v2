import axios from 'axios'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const extractorFormSchema = z.object({
  link: z.string()
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { link } = extractorFormSchema.parse(body)

  const { data } = await axios.get(link, {
    headers: {
      'User-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    },
  })

  return Response.json(data)
}
