import axios from 'axios'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const extractorFormSchema = z.object({
  link: z.string()
})

const headers = new Headers();
headers.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8");
headers.append("Accept-Encoding", "gzip, deflate, br, zstd");
headers.append("Accept-Language", "en-US,en;q=0.5"); // Corrigido o q-value
headers.append("Cache-Control", "no-cache"); // Corrigido para no-cache
headers.append("Pragma", "no-cache"); // Adicionado
headers.append("Priority", "u=0, i"); // Adicionado (observar compatibilidade com sua biblioteca HTTP)
headers.append("Sec-Ch-Ua", '"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"'); // Corrigido
headers.append("Sec-Ch-Ua-Arch", '"x86"'); // Adicionado
headers.append("Sec-Ch-Ua-Bitness", '"64"'); // Adicionado
headers.append("Sec-Ch-Ua-Full-Version-List", '"Chromium";v="134.0.0.0", "Not:A-Brand";v="24.0.0.0", "Brave";v="134.0.0.0"'); // Adicionado
headers.append("Sec-Ch-Ua-Mobile", "?0");
headers.append("Sec-Ch-Ua-Model", '""'); // Mantido (as aspas duplas internas são importantes)
headers.append("Sec-Ch-Ua-Platform", '"Linux"'); // Corrigido (as aspas duplas internas são importantes)
headers.append("Sec-Ch-Ua-Platform-Version", '"6.8.0"'); // Corrigido
headers.append("Sec-Ch-Ua-Wow64", "?0"); // Adicionado
headers.append("Sec-Fetch-Dest", "document");
headers.append("Sec-Fetch-Mode", "navigate");
headers.append("Sec-Fetch-Site", "none");
headers.append("Sec-Fetch-User", "?1");
headers.append("Sec-Gpc", "1");
headers.append("Upgrade-Insecure-Requests", "1");
headers.append("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"); // Corrigido

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