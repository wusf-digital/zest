import Head from 'next/head'
import { useEffect } from 'react'

import styles from '../styles/Home.module.css'
import stylesAbout from '../styles/About.module.css'

export default function About({ about }) {
    useEffect(() => {
        const imgHidden = document.querySelector('.image-wrap')
        imgHidden.style.cssText += `
            display: none;
        `

        const fullWidths = document.querySelectorAll('.tf_box')
        fullWidths.forEach(fullWidth => {
            fullWidth.style.cssText += `
                width: 100% !important;
            `
        })

        const hostPictures = document.querySelectorAll('.tb_text_wrap > p > img')
        hostPictures.forEach(hostPicture => {
            hostPicture.style.cssText += `
            float: left;
            margin-inline-end: 1rem;
        `
        })
        
    }, [])

    const title = about.title.rendered
    return (
        <>
            <Head><title>{`${title} - The Zest Podcast`}</title></Head>
            <main className={`${styles.container__page} ${styles.container}`}>
                <h1 className={styles.title}>{title}</h1>
                <div className={stylesAbout.hostname} dangerouslySetInnerHTML={{__html: about.content.rendered}}></div>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://thezestpodcast.com/wp-json/wp/v2/pages/507')
    const about = await res.json()

    return {
        props: {
            about
        },
        revalidate: 60
    }
}