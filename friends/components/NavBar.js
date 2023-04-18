import Link from 'next/link';
import styles from './NavBar.module.css';
import { useRouter } from 'next/router';

const NavBar = () => {
    const router = useRouter();

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={router.pathname === '/' ? styles.active : ''}>
                    <Link href="/" >
                        Home
                    </Link>
                </li>
                <li className={router.pathname === '/friends' ? styles.active : ''}>
                    <Link href="/friends">
                        Friends
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
