import Head from 'next/head'
import Image from 'next/image'

import styles from '../../styles/Home.module.css'

export default function Episode({ episodeInfo }) {
    const title = episodeInfo.title
    return (
        <>
            <Head><title>{`${title} - The Zest Podcast`}</title></Head>
                <article className={`${styles.container__page} ${styles.container}`}>
                    <h1 className={styles.title}>{episodeInfo.title}</h1>
                    <div style={{ position: "relative", width: "50%", height: "1", paddingBottom: "50%", left: "50%", transform: "translateX(-50%)" }}>
                        <Image 
                            src={episodeInfo.episodeImageUrl ?? episodeInfo.podcastImageUrl} 
                            fill
                            alt="Episode Image" />
                    </div>
                    <p className={styles.description}>{episodeInfo.description}</p>
                    <audio style={{display: "block", margin: "auto"}} controls src={episodeInfo.audioUrl}></audio>
                    <p dangerouslySetInnerHTML={{__html: episodeInfo.descriptionLong}} />
                </article>
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0&limit=20')
    const episodes = await res.json()

    const paths = episodes.map(episode => ({
        params: { id: episode.slug }
    }))
    
    return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0&limit=20`)
    const episodes = await res.json()
    const episode = episodes.find(episode => episode.slug === params.id)

    let episodeInfo = await fetch(`https://api-dev.wusf.digital/simplecast/episode?id=${episode.id}`)
    episodeInfo = await episodeInfo.json()

    return {
        props: {
            episodeInfo
        },
        revalidate: 10,
    }
}