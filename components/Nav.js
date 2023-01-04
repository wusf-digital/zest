import { useState, useEffect,  } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faFacebookF,
    faInstagram,
    faTiktok
} from '@fortawesome/free-brands-svg-icons'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from '../styles/Nav.module.css'

export default function Nav() {

    const [ toggleMenu, setToggleMenu ] = useState(false)  

    const toggleNav = () => setToggleMenu(!toggleMenu)

    function useWindowSize() {
        const [ windowSize, setWindowSize ] = useState({
            width: undefined,
            height: undefined,
        })

        useEffect(() => {
            if (typeof window !== 'undefined') {

                function handleResize() {
                    setWindowSize({
                        width: window.innerWidth,
                        height: window.innerHeight,
                    })
                }
                
                // Add event listener
                window.addEventListener("resize", handleResize)
                
                // Call handler right away so state gets updated with initial window size
                handleResize()
                
                // Remove event listener on cleanup
                return () => window.removeEventListener("resize", handleResize)
            }
        }, [ ])
        return windowSize
    }

    const { width } = useWindowSize()

    return (
        <header>
            <nav className={styles.nav}>
                <Link href='/'>
                        <Image 
                            src="/the-zest-podcast.png" 
                            alt="The Zest Logo" 
                            width={150} 
                            height={38} />
                    </Link> 
                { (toggleMenu || width > 992) && (
                    <ul className={styles.navLinks}>
                        <li>
                            <ul className={styles.navLinks}>
                                <li><Link href="/" onClick={toggleNav}>Home</Link></li>
                                <li><Link href="/episodes" onClick={toggleNav}>Episodes</Link></li>
                                <li><Link href="/recipes" onClick={toggleNav}>Recipes</Link></li>
                                <li>More</li>
                            </ul>
                        </li>
                        <li>
                            <ul className={`${styles.navLinksSocial}`}>
                                <li>
                                    <a href="https://www.facebook.com/TheZestPodcast/" 
                                        target={'_blank'} onClick={toggleNav} rel='noreferrer'>
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/thezestpodcast/" 
                                        target={'_blank'} onClick={toggleNav} rel='noreferrer'>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.tiktok.com/@thezestpodcast" 
                                        target={'_blank'} onClick={toggleNav} rel='noreferrer'>
                                        <FontAwesomeIcon icon={faTiktok} />
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                )}

                <FontAwesomeIcon className={toggleMenu ? styles.barsNone : styles.bars} 
                    onClick={toggleNav} icon={faBars} size={'2x'} 
                />
                <FontAwesomeIcon className={toggleMenu ? styles.xMark : styles.xMarkNone} 
                    onClick={toggleNav} icon={faXmark} size={'2x'} 
                />
            </nav>
        </header>
    )
}