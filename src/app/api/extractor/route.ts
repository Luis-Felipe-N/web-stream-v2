import axios from 'axios'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const extractorFormSchema = z.object({
  link: z.string()
})

const headers = new Headers();
headers.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8");
headers.append("Accept-Encoding", "gzip, deflate, br, zstd");
headers.append("Accept-Language", "en-US,en;q=0.9");
headers.append("Cache-Control", "max-age=0");
headers.append("Sec-Ch-Ua", '"Brave";v="125", "Chromium";v="125", "Not.A/Brand";v="24"');
headers.append("Sec-Ch-Ua-Mobile", "?0");
headers.append("Sec-Ch-Ua-Model", "");
headers.append("Sec-Ch-Ua-Platform", "Linux");
headers.append("Sec-Ch-Ua-Platform-Version", "6.5.0");
headers.append("Sec-Fetch-Dest", "document");
headers.append("Sec-Fetch-Mode", "navigate");
headers.append("Sec-Fetch-Site", "none");
headers.append("Sec-Fetch-User", "?1");
headers.append("Sec-Gpc", "1");
headers.append("Upgrade-Insecure-Requests", "1");
headers.append("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36");

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { link } = extractorFormSchema.parse(body)
  const requestOptions = {
    method: 'GET',
    headers: headers,
  };

  const response = await fetch(link, requestOptions)
  const extractor = await response.text()
  return Response.json(extractor)
}