import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

import styles from '../styles/Home.module.css'

export default function Recipes({ recipes }) {
    return (
        <section className={`${styles.grid}`}>
          <h1>Latest Recipes</h1>
          {recipes.map(recipe => (
            <Link 
                  key={recipe.id}
                  className={styles.card}
                  href="/recipes/[id]" 
                  as={`/recipes/${recipe.slug}`}
              >
                <Image 
                    src={recipe._embedded['wp:featuredmedia']['0'].source_url} 
                    alt="Latest Recipe" 
                    layout="responsive"
                    width={2048}
                    height={1366}
                />  
                <h2 dangerouslySetInnerHTML={{__html: recipe.title.rendered}} />
                <p className={styles.publishedDate}>{moment(recipe.date).format('MMMM D, YYYY')}</p>
            </Link>
          ))}
        </section>
    )
}