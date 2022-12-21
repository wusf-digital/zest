import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'

import Switcher from '../../components/Episodes/switcher'
import styles from '../../styles/Home.module.css'

export default function Episodes({ episodes, meta }) {
    return (
        <>
            <Head><title>Episodes - The Zest Podcast</title></Head>
            <section className={`${styles.container__page} ${styles.container}`}>
                <h1 className={styles.title}>Episodes</h1>
                <div className={`${styles.grid} ${styles.gridSection}`}>
                    {episodes.map(episode => (
                        <Link 
                            key={episode.id}
                            className={styles.card}
                            href="/episodes/[id]" 
                            as={`/episodes/${episode.slug}`}>
                            <h2>{episode.title} &rarr;</h2>
                            <p style={{margin: '1rem'}}>{moment(episode.publishedDate).format('MMMM D, YYYY')}</p>
                        </Link>
                    ))}
                </div>
                <Switcher meta={meta} />
            </section>
        </>
    )
}

export async function getServerSideProps() {
    const [ resEpisodes, resMeta ] = await Promise.all([
        fetch('https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0&limit=6'),
        fetch('https://api-dev.wusf.digital/simplecast/podcast?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0')
    ])
    const [ episodes, meta ] = await Promise.all([
        resEpisodes.json(), resMeta.json()
    ])

    return {
        props: {
            episodes, meta
        }
    }
}