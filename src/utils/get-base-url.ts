'use server'

import { api } from '@/data/api'
import cheerio from 'cheerio'

export async function getBaseUrl(link: string) {
  try {
    const response = await api(
      `${process.env.NEXT_PUBLIC_API_DOMAINURL}/api/extractor`,
      {
        method: 'post',
        body: JSON.stringify({
          link: link,
        }),
        next: {
          revalidate: 60 * 60 * 24 * 7,
        },
      }
    )

    const data = await response.json()

    const video = _getUrlBaseVideo(data)

    return video.play_url
  } catch (error) { console.log(error) }
}

function _getUrlBaseVideo(html: string) {
  const $ = cheerio.load(html);
  const scriptContent = $('script[type="text/javascript"]').html();

  if (scriptContent) {
    const indexStartStrem = scriptContent.replace('var VIDEO_CONFIG = ', '')

    const obj = JSON.parse(indexStartStrem)
    return obj.streams.reduce((max: any, video: any) => video.format_id > max.format_id ? video : max);
  } else {
    console.error('VIDEO_CONFIG não encontrado no script.');
  }
}
