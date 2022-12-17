import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

import styles from '../styles/Home.module.css'

export default function Home({ episodes }) {

  return (
    <>
      <Head>
        <title>The Zest</title>
      </Head>
      <Image 
        src="/The-Zest-Podcast-Homepage-10.png" 
        alt="The Zest Season 6" 
        layout="responsive"
        width={2048}
        height={1366}
      />
      <div className={styles.container}>
        <div className={styles.gridFeatured}>
          <Link 
            className={styles.latestEpisode}
            href="/episodes/[id]" 
            as={`/episodes/${episodes[0].slug}`}
          >
            <h2 className={styles.title}>{episodes[0].title}</h2>
            <Image
              src={episodes[0].episodeImageUrl ?? 'https://image.simplecastcdn.com/images/be36e542-b186-4b9b-a6bb-6896fd6492ae/3fb9b4ca-4a2e-4503-add5-a5daab870de1/the-zest-npr-network-1.jpg'} 
              alt="Podcast Episode Image"
              width={350}
              height={350}
            />
          </Link>
          <iframe
            
            src="https://embed.podcasts.apple.com/us/podcast/the-zest/id1458162352?itsct=podcast_box_player&amp;itscg=30200&amp;ls=1&amp;theme=auto"
            height="450px"
            frameBorder="0"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            allow="autoplay *; encrypted-media *; clipboard-write"
            style={{width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '10px', transform: 'translateZ(0px)', animation: '2s ease 0s 6 normal none running loading-indicator', backgroundColor: 'rgb(228, 228, 228)'}}>
          </iframe>
        </div>
        <aside className={styles.underwriting}>
          <Image
            src="/seitenbacher_ad_horiz-960w.png"
            alt="Underwriting"
            width={780}
            height={160}
          />
        </aside>
        <section className={`${styles.grid} ${styles.episodes}`}>
          <h2>Latest Episodes</h2>
          {episodes.map(episode => (
              <Link 
                  key={episode.id}
                  className={styles.card}
                  href="/episodes/[id]" 
                  as={`/episodes/${episode.slug}`}
              >
                  <h2>{episode.title}</h2>
                  <p className={styles.publishedDate}>{moment(episode.publishedDate).format('MMMM D, YYYY')}</p>
              </Link>
          ))}
        </section>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0&limit=6`)
  const episodes = await res.json()

  return {
      props: {
          episodes
      }
  }
}