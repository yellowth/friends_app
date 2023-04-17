import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Welcome to the Home Page</h1>
      </div>
    </Layout>
  );
}

