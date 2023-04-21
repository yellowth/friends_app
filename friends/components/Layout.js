import styles from '@/styles/Layout.module.css';
import Sidebar from './Sidebar';
import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            <Sidebar />
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default React.memo(Layout); 
