import Link from 'next/link'
import styles from '../../styles/Home.module.css'

import moment from 'moment'

export default function Episodes({ episodes }) {
    return (
        <section className={`${styles.container__page} ${styles.container}`}>
            <h2 className={styles.title}>Recent Episodes</h2>
            <div className={styles.grid}>
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
        </section>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0&limit=10`)
    const episodes = await res.json()

    return {
        props: {
            episodes
        }
    }
}