
import "styles/globals.css"
import 'highlight.js/styles/docco.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (<>
  <Component {...pageProps} />
  <Analytics />
  </>)
}
