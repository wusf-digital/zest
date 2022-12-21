import Link from "next/link"

import Starters from "../../components/Recipes/starters"
import Entrees from "../../components/Recipes/entrees"
import styles from '../../styles/Home.module.css'
import Desserts from "../../components/Recipes/desserts"
import Favorites from "../../components/Recipes/favorites"

export default function Recipes({ starters, entrees, desserts, favorites }) {
    return (
        <section className={`${styles.container__page} ${styles.container}`}>
            <h1 className={styles.title}>Recipes</h1>
            <Starters starters={starters} />
            <Entrees entrees={entrees} />
            <Desserts desserts={desserts} />
            <Favorites favorites={favorites} />
        </section>
    )
}

export async function getServerSideProps() {
    const [
        startersRes, entreesRes, dessertsRes, favoritesRes
    ] = await Promise.all([
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=216&categories=4&per_page=20&_embed'),
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=65&categories=4&per_page=20&_embed'),
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=54&categories=4&per_page=20&_embed'),
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=134&categories=4&per_page=20&_embed')
    ]) 
    const [
        starters, entrees, desserts, favorites
    ] = await Promise.all([
        startersRes.json(), entreesRes.json(), dessertsRes.json(), favoritesRes.json()
    ])

    return {
        props: {
            starters, entrees, desserts, favorites
        }
    }
}