import styles from './Layout.module.css';
import NavBar from './NavBar';

const Layout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default Layout;
