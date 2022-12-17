import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faFacebookF,
    faInstagram,
    faTiktok
 } from '@fortawesome/free-brands-svg-icons'

import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__info}>
                <ul className={styles.footer__info_social}>
                    <li>
                        <a href="https://www.facebook.com/TheZestPodcast/" target={'_blank'}>
                            <FontAwesomeIcon icon={faFacebookF} size="2x" />
                        </a>   
                    </li>
                    <li>
                        <a href="https://www.instagram.com/thezestpodcast/" target={'_blank'}>
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.tiktok.com/@thezestpodcast" target={'_blank'}>
                            <FontAwesomeIcon icon={faTiktok} size="2x" />
                        </a>
                    </li>
                </ul>
                <a href="https://www.facebook.com/TheZestPodcast/" target={'_blank'}>
                    <p>Join Other Foodies &amp; Podcast Listeners on Facebook</p>
                </a>
                <a href="https://thezestpodcast.com/how-to-listen-to-a-podcast/">
                    <p>Subscribe to The Zest</p>
                </a>
            </div>
            <a className={styles.longesttable} href="https://wusflongestable.org/" target={'_blank'}>
                <Image src="/LT-logo-alt-black-1.png" alt="The Longest Table" width={156} height={139} />
            </a>
            <a className={styles.npr} href="https://npr.org" target={'_blank'}>
                <Image src="/NPR-Network-Logo-300-×-200-px.png" alt="NPR" width={300} height={200} />
            </a>
            <a className={styles.wusf} href="https://wusf.org" target={'_blank'}>
                <Image src="/WUSF-stacked-black.png" alt="WUSF Public Media" width={140} height={139} />
            </a>
            <p className={styles.copyright}>
                &copy;{new Date().getFullYear()} All Rights Reserved WUSF Public Media
            </p>
        </footer>
    )
}