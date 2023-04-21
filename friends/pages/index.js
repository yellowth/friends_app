import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

import Layout from '../components/Layout';
import Topbar from '@/components/Topbar';
export default function Home() {
  return (
    <Layout>
      <Topbar title='Home'/>
      <span className={styles.welcometext}>
        Welcome to the Clerkie Challenge!
      </span>
    </Layout>
  );
}

