import Link from 'next/link'
import moment from 'moment'

import styles from '../../styles/Home.module.css'

export default function Episode({ episode }) {
    return (
        <Link 
            key={episode.id}
            className={styles.card}
            href="/episodes/[id]" 
            as={`/episodes/${episode.slug}`}>
            <h2>{episode.title}</h2>
            <p>{moment(episode.publishedDate).format('MMMM D, YYYY')}</p>
        </Link>
    )
}