import Link from 'next/link';
import styles from '@/styles/NavBar.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import clerkie from "../public/clerkie.svg";
import homeIcon from "../public/homeIcon.svg";
import friendsIcon from "../public/friendsIcon.svg";

const Sidebar = () => {
    const router = useRouter();

    return (
        <nav className={styles.sidebar}>
            <div className={`${styles.mainlogo} mainlogo`}>
                <Image src={clerkie} alt="Logo" />
                <h1>Clerkie Challenge</h1>
            </div>

            <ul className={styles.navlist}>
                <li>
                    <div className={`${router.pathname === '/' ? styles.active : styles.inactive}`}>
                        <Image src={homeIcon} alt="Logo" />
                        <Link href="/" >
                            <span>Home</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className={`${router.pathname === '/friends' ||router.pathname === '/info' ? styles.active : styles.inactive}`}>
                        <Image src={friendsIcon} alt="Logo" />
                        <Link href="/friends" >
                            <span>Friends</span>
                        </Link>
                    </div>
                </li>
            </ul>
        </nav >
    );
};

export default Sidebar;
