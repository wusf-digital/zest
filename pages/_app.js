import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import Layout from '../components/Layout'
import '../styles/globals.css'

import { Josefin_Sans } from '@next/font/google'

const josefin = Josefin_Sans({
  weight: '400',
  style: 'normal',
  display: 'swap',
})

function MyApp({ Component, pageProps }) {
  return (
    <div className={josefin.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

config.autoAddCss = false

export default MyApp
