import Head from 'next/head'

import Episode from '../../components/Episodes/episode'
import Pagination from '../../components/Episodes/pagination'
import styles from '../../styles/Home.module.css'

export default function Episodes({ episodes, page, lastPage }) {
    return (
        <>
            <Head><title>Episodes - The Zest Podcast</title></Head>
            <section className={`${styles.container__page} ${styles.container}`}>
                <h1 className={styles.title}>Episodes</h1>
                <div className={`${styles.grid} ${styles.gridSection}`}>
                    {episodes.map((episode, idx) => <Episode key={idx} episode={episode} />)}
                </div>
                <Pagination page={page} lastPage={lastPage} />
            </section>
        </>
    )
}

export async function getServerSideProps({ query }) {
    // Set number of episodes allowed per page
    const perPage = 10

    // Set page number based on query parameter in the URL
    const page = Number(query.page || 0)

    // Calculate offset based on page number and number of episodes allowed per page
    const offset = Number(+query.page * perPage) || 0

    const [ resEpisodes, resMeta ] = await Promise.all([
        fetch(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0&limit=10&offset=${offset}`),
        fetch('https://api-dev.wusf.digital/simplecast/podcast?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0')
    ])

    const [ episodes, meta ] = await Promise.all([
        resEpisodes.json(), resMeta.json()
    ])

    // Calculate what the last page (oldest episodes) should be
    const lastPage = Number(Math.floor(meta.count / perPage))

    return {
        props: {
            episodes, page, lastPage
        }
    }
}