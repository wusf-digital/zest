import Nav from './Nav'
import Footer from './Footer'
import styles from '../styles/Home.module.css'

export default function Layout({ children }) {
    return (
        <>
            <Nav />
            <main className={styles.main}>{children}</main>
            <Footer className={styles.footer} />
        </>
    )
}