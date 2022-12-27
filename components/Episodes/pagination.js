import Link from 'next/link'

import styles from '../../styles/Pagination.module.css'

export default function Pagination({ page, lastPage }) {
    return (
        <nav>
            <ul className={styles.pagination}>
                <li className={page === 0 ? styles.disabled : null}>
                    <Link href={`/episodes`}>Newest</Link>
                </li>
                <li className={page === 0 ? styles.disabled : null}>
                    <Link href={`?page=${page - 1}`}>&larr;</Link>
                </li>
                <li className={page === lastPage ? styles.disabled: null}>
                    <Link href={`?page=${page + 1}`}>&rarr;</Link>
                </li>
                <li className={page === lastPage ? styles.disabled : null}>
                    <Link href={`?page=${lastPage}`}>Oldest</Link>
                </li>
            </ul> 
        </nav>
    )
}