import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

import styles from '../../styles/Home.module.css'

export default function Favorites({ favorites }) {
    return (
        <section className={`${styles.grid} ${styles.gridSection}`}>
            <h2 className={`${styles.title} ${styles.titleSection}`}>Party Favorites</h2>
            {favorites.map(favorite => (
            <Link 
                  key={favorite.id}
                  className={styles.card}
                  href="/recipes/[id]" 
                  as={`/recipes/${favorite.slug}`}
              >
                <Image 
                    src={favorite._embedded['wp:featuredmedia']['0'].source_url} 
                    alt="Latest Recipe" 
                    layout="responsive"
                    width={2048}
                    height={1366}
                />  
                <h2 dangerouslySetInnerHTML={{__html: favorite.title.rendered}} />
                <p className={styles.publishedDate}>{moment(favorite.date).format('MMMM D, YYYY')}</p>
            </Link>
          ))}
        </section>
    )
}