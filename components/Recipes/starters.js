import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

import styles from '../../styles/Home.module.css'

export default function Starters({ starters }) {
    return (
        <section className={`${styles.grid} ${styles.gridSection}`}>
            <h2 className={`${styles.title} ${styles.titleSection}`}>Starters, Salads, and Shareables</h2>
            {starters.map(starter => (
            <Link 
                  key={starter.id}
                  className={styles.card}
                  href="/recipes/[id]" 
                  as={`/recipes/${starter.slug}`}
              >
                <Image 
                    src={starter._embedded['wp:featuredmedia']['0'].source_url} 
                    alt="Latest Recipe" 
                    layout="responsive"
                    width={2048}
                    height={1366}
                />  
                <h2 dangerouslySetInnerHTML={{__html: starter.title.rendered}} />
                <p className={styles.publishedDate}>{moment(starter.date).format('MMMM D, YYYY')}</p>
            </Link>
          ))}
        </section>
    )
}