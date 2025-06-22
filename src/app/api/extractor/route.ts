import { NextRequest } from 'next/server'
import { z } from 'zod'

const extractorFormSchema = z.object({
  link: z.string().url('Please provide a valid URL.')
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validationResult = extractorFormSchema.safeParse(body);
  if (!validationResult.success) {
    return new Response(JSON.stringify({ errors: validationResult.error.errors }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { link } = validationResult.data;

  const requestHeaders = new Headers(request.headers);

  requestHeaders.delete('host');
  requestHeaders.delete('connection');
  requestHeaders.delete('content-length');
  requestHeaders.delete('accept-encoding');
  requestHeaders.delete('cdn-loop');
  requestHeaders.delete('x-forwarded-for');
  requestHeaders.delete('x-forwarded-host');
  requestHeaders.delete('x-forwarded-proto');
  requestHeaders.delete('x-vercel-forwarded-for');
  requestHeaders.delete('x-vercel-id');
  requestHeaders.delete('sec-fetch-site');
  requestHeaders.delete('sec-fetch-mode');
  requestHeaders.delete('sec-fetch-dest');

  requestHeaders.set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8");


  const requestOptions = {
    method: 'GET',
    headers: requestHeaders,
  };

  try {
    const response = await fetch(link, requestOptions);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: `Failed to fetch external resource: ${response.status} ${response.statusText}` }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const extractor = await response.text();
    return new Response(extractor, {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error: any) {
    console.error("Error fetching external link:", error);
    return new Response(JSON.stringify({ error: 'Internal server error while fetching content.', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}