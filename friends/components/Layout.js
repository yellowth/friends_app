import styles from '@/styles/Layout.module.css';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div>
            <Sidebar />
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default Layout;
