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
                <li className={router.pathname === '/about' ? styles.active : ''}>
                    <Link href="/about">
                        Friends
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
