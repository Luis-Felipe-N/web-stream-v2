import axios, { CancelTokenSource } from 'axios'

export async function getBaseUrl(
  link: string,
  signal: CancelTokenSource | false = false,
) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAINURL}/api/extractor`,
      {
        linkEmbed: link,
        userAgent: window.navigator.userAgent,
      },
    )
    
    const div = document.createElement('div')
    div.innerHTML = data
    const video = _getUrlBaseVideo(div)
    
    return video.play_url
  } catch (error) {}
}

function _getUrlBaseVideo(html: HTMLDivElement) {
  const videoConfig = html.querySelector('script')?.textContent
  if (videoConfig) {
    const indexStartStrem = videoConfig.replace('var VIDEO_CONFIG = ', '')

    const obj = JSON.parse(indexStartStrem)
    return obj.streams.reduce((max: any, video: any) => video.format_id > max.format_id ? video : max);
  }
}
