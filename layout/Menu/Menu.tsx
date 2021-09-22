import styles from './Menu.module.css'
import LogoIcon from './Logo.svg'
import TimeIcon from './Time.svg'
import {Button} from "../../components";
import Link from 'next/link'


export const Menu = (): JSX.Element => {
    return (
        <>
            <div className={styles.wrapperMenu}>
                <div className={styles.logo}>
                    <LogoIcon />
                </div>
                <Link href='/trips/Trips'>
                    <div className={styles.button}>
                        <Button appearance="hover" />
                    </div>
                </Link>

            </div>
            <div className={styles.time}>
                <TimeIcon className={styles.timeIcon} />
                <Link href='/'>
                    <button className={styles.yourTrip}>Your trips</button>
                </Link>
            </div>
        </>

    )
}



