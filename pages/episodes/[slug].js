import Head from 'next/head'
import Image from 'next/image'

import styles from '../../styles/Home.module.css'
import stylesEpisode from '../../styles/Episode.module.css'

async function getEpisodeCount() {
    try {
        const resMeta = await fetch('https://api-dev.wusf.digital/simplecast/podcast?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0')
        const meta = await resMeta.json()
        const { count } = meta
        console.log(count)
        return count
    } catch (err) {
        console.log(err)
    }
}

async function getAllEpisodes() {
    const count = await getEpisodeCount()
    const perPage = 100

    const urls = []

    for (let i = 0; i < Math.ceil(count / perPage); i++) {
        urls.push(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0&limit=${perPage}&offset=${i*perPage}`)
    }

    const allEpisodes = await Promise.all(urls.map(async url => {
        try {
            const res = await fetch(url)
            return res.json()
        } catch(err) {
            console.log(err)
        }
    }))

    return allEpisodes.flat()
}

export default function Episode({ episodeInfo }) {
    const title = episodeInfo.title
    return (
        <>
            <Head><title>{`${title} - The Zest Podcast`}</title></Head>
            <article className={`${styles.container__page} ${styles.container}`}>
                <h1 className={styles.title}>{episodeInfo.title}</h1>
                <div className={stylesEpisode.episodeImage}>
                    <Image 
                        src={episodeInfo.episodeImageUrl ?? episodeInfo.podcastImageUrl} 
                        fill
                        alt="Episode Image" />
                </div>
                <p className={styles.description}>{episodeInfo.description}</p>
                <audio 
                    className={stylesEpisode.episodePlayer} 
                    controls src={episodeInfo.audioUrl} />
                <p dangerouslySetInnerHTML={{__html: episodeInfo.descriptionLong}} />
            </article>
        </>
    )
}

export async function getStaticPaths() {
    const allEpisodes = await getAllEpisodes()

    const paths = allEpisodes.map(episode => ({
        params: { 
            slug: episode.slug
        }
    }))
    
    return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
    const allEpisodes = await getAllEpisodes()
    const episode = allEpisodes.find(episode => episode.slug === params.slug)
    
    let episodeInfo = await fetch(`https://api-dev.wusf.digital/simplecast/episode?id=${episode.id}`)
    episodeInfo = await episodeInfo.json()
    

    return {
        props: {
            episodeInfo
        },
        revalidate: 60,
    }
}