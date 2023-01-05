import Head from 'next/head'
import { useEffect } from 'react'

import styles from '../styles/Home.module.css'
import stylesHowTo from '../styles/HowTo.module.css'

export default function HowToListen({ howTo }) {
    useEffect(() => {
        
        const subscribeButtons = document.querySelectorAll('.row_inner.col_align_top.col-count-5.tf_box.tf_w.tf_rel')
        subscribeButtons.forEach(subscribeButton => {
            subscribeButton.style.cssText += `
                display: flex;
                justify-content: space-between;
                align-items: center;
                text-align: center;
                margin-block: 3rem;
                width: 100% !important;
            `
        })

        const extraSvgs = document.querySelectorAll('.tf_inline_b.tf_vmiddle > svg')
        extraSvgs.forEach(svg => {
            svg.style.cssText += `
                display: none;
            `
        })

        const subscribeButton = document.querySelectorAll('.module-buttons-item.tf_inline_b')
        subscribeButton.forEach(button => {
            button.style.cssText += `
                background-color: #F26522;
                padding: 1rem 2rem;
                border-radius: 10px;
                color: white;
            `
        })

        const downloadApp = document.querySelector('.image-wrap.tf_rel.tf_mw')
        downloadApp.style.cssText += `
            text-align: center;
        `

        const downloadAppResponsive = document.querySelector('.image-wrap.tf_rel.tf_mw img')
        downloadAppResponsive.style.cssText += `
            max-width: 100%;
            height: auto;
        `

    }, [])

    const title = howTo.title.rendered
    return (
        <>
            <Head><title>{`${title} - The Zest Podcast`}</title></Head>
            <main className={`${styles.container__page} ${styles.container}`}>
                <h1 className={styles.title}>{title}</h1>
                <div className={stylesHowTo.sectionHeading} dangerouslySetInnerHTML={{__html: howTo.content.rendered}}></div>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://thezestpodcast.com/wp-json/wp/v2/pages/753')
    const howTo = await res.json()

    return {
        props: {
            howTo
        },
        revalidate: 60
    }
}