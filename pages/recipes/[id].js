import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import stylesRecipes from '../../styles/Recipe.module.css'

export default function Recipe({ recipe }) {
    useEffect(() => {
        const button = document.querySelector('div.module.module-buttons.tb_dwb0168.buttons-horizontal.solid.large.rounded.tf_textc')
        button.style.cssText += `
            background-color: rgba(242, 101, 34, 1);
            position: relative;
            display: inline-block;
            color: #fff2ea;
            border-radius: 8px;
            text-align: center;
            padding: 0.625rem 1.25rem;
        `
    }, [])

    const title = recipe.title.rendered

    return (
        <>
            <Head><title>{`${title} - The Zest Podcast`}</title></Head>
            <article className={stylesRecipes.recipe}>
                <div className={stylesRecipes.recipeImage}>
                    <Image 
                        src={recipe._embedded['wp:featuredmedia']['0'].source_url} 
                        fill
                        alt="Episode Image" />
                </div>
                <div
                className={`${stylesRecipes.recipeRemoveParagraphs} ${stylesRecipes.recipeRemoveSvg} ${stylesRecipes.recipeContent}`} 
                dangerouslySetInnerHTML={{__html: recipe.content.rendered}} />
                
            </article>
        </>
    )
}

export async function getStaticPaths() {
    const res  = await Promise.all([
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=216&categories=4&per_page=20&_embed'),
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=65&categories=4&per_page=20&_embed'),
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=54&categories=4&per_page=20&_embed'),
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=134&categories=4&per_page=20&_embed')
    ]) 
    let recipes = await Promise.all(res.map(r => r.json()))
    recipes = recipes.flat()

    const paths = recipes.map(recipe => ({
        params: { id: recipe.slug }
    }))

    return {
        paths, fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const res = await Promise.all([
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=216&categories=4&per_page=20&_embed'),
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=65&categories=4&per_page=20&_embed'),
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=54&categories=4&per_page=20&_embed'),
        fetch('https://thezestpodcast.com/wp-json/wp/v2/posts?tags=134&categories=4&per_page=20&_embed')
    ]) 
    let recipes = await Promise.all(res.map(r => r.json()))
    recipes = recipes.flat()

    const recipe = recipes.find(recipe => recipe.slug === params.id)

    return {
        props: {
            recipe
        },
        revalidate: 10
    }
}