'use server'

export async function valideYoutubeVideoId(videoId: string) {
  const url = 'http://img.youtube.com/vi/' + videoId + '/mqdefault.jpg'
  const { status } = await fetch(url)
  if (status === 404) return false
  return true
}
