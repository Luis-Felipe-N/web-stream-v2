import axios, { CancelTokenSource } from 'axios'
import cheerio from 'cheerio'

export interface IStreamsBlogger {
  play_url: string
  format: number
}

export async function getBaseUrl(
  link: string,
) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAINURL}/api/extractor`,
      {
        link: link,
      },
    )

    const { play_url } = _getUrlBaseVideo(data)
    return play_url
  } catch (error) { console.log({ error }) }
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