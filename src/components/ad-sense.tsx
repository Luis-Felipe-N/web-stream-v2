import React from 'react'

type AdsenseTypes = {
  pId: string;
}

export default function AdSense({ pId }: AdsenseTypes) {
  return (
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4707731953261449" crossOrigin="anonymous"></script>
  )
}