import { useState } from 'react'

import styles from '../../styles/Switcher.module.css'

export default function Switcher({ meta }) {
    const [ page, setPage ] = useState(1)
    const perPage = 10
    const numberOfPages = Math.ceil(meta.count / perPage)
    console.log(numberOfPages)

    return (
        <ol className={styles.switcher}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ol>
    )
}