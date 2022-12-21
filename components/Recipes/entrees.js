import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

import styles from '../../styles/Home.module.css'

export default function Entrees({ entrees }) {
    return (
        <section className={`${styles.grid} ${styles.gridSection}`}>
            <h2 className={`${styles.title} ${styles.titleSection}`}>Entrees, Side Dishes, Sauces &amp; Spreads</h2>
            {entrees.map(entree => (
            <Link 
                  key={entree.id}
                  className={styles.card}
                  href="/recipes/[id]" 
                  as={`/recipes/${entree.slug}`}
              >
                <Image 
                    src={entree._embedded['wp:featuredmedia']['0'].source_url} 
                    alt="Latest Recipe" 
                    layout="responsive"
                    width={2048}
                    height={1366}
                />  
                <h2 dangerouslySetInnerHTML={{__html: entree.title.rendered}} />
                <p className={styles.publishedDate}>{moment(entree.date).format('MMMM D, YYYY')}</p>
            </Link>
          ))}
        </section>
    )
}