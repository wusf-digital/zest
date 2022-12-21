import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

import styles from '../../styles/Home.module.css'

export default function Desserts({ desserts }) {
    return (
        <section className={`${styles.grid} ${styles.gridSection}`}>
            <h2 className={`${styles.title} ${styles.titleSection}`}>Desserts</h2>
            {desserts.map(dessert => (
            <Link 
                  key={dessert.id}
                  className={styles.card}
                  href="/recipes/[id]" 
                  as={`/recipes/${dessert.slug}`}
              >
                <Image 
                    src={dessert._embedded['wp:featuredmedia']['0'].source_url} 
                    alt="Latest Recipe" 
                    layout="responsive"
                    width={2048}
                    height={1366}
                />  
                <h2 dangerouslySetInnerHTML={{__html: dessert.title.rendered}} />
                <p className={styles.publishedDate}>{moment(dessert.date).format('MMMM D, YYYY')}</p>
            </Link>
          ))}
        </section>
    )
}