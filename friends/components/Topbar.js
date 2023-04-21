import styles from '@/styles/Topbar.module.css';

function Topbar({ title }) {
    return (
        <div className={styles.topBar}>
            <h2 className={styles.header}>{title}</h2>
        </div>
    );
};

export default Topbar;
