import Link from 'next/link'
import moment from 'moment'

import styles from '../../styles/Home.module.css'

export default function Episodes({ episodes }) {
    return (
        <section className={`${styles.grid}`}>
          <h1>Latest Episodes</h1>
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
    )
}