// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest } from 'next'

export default async function POST(req: NextApiRequest) {
  const { linkEmbed, userAgent } = req.body.data

  const { data } = await axios.get(linkEmbed, {
    headers: { 'User-agent': userAgent },
  })

  return Response.json(data)
}
