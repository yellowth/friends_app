import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchFriendByEmail } from "../mockapi";
import styles from '@/styles/FriendInfo.module.css'

const FriendInfo = ({ email }) => {
    const router = useRouter();
    const [friend, setFriend] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (email) {
                const data = await fetchFriendByEmail(email);
                setFriend(data);
            }
        };

        fetchData();
    }, [email]);

    return (
        <div style={{ marginTop: 10 }}>
            {friend ? (
                <div className={styles.friendItem}>
                    <div className={styles.friendHeader}>
                        <h1>{friend.name}</h1>
                        {friend.friendStatus != null && (
                            <div className={styles.status}>
                                <p className={`${styles.status} ${friend.friendStatus === "Close Friends" ? styles.closeFriendsStatus : friend.friendStatus === "Super Close Friends" ? styles.superCloseFriendsStatus : ""}`}>
                                    {friend.friendStatus}
                                </p>
                            </div>
                        )}

                    </div>
                    <p>Email: {friend.email}</p>
                    <p>Phone: {friend.phoneNumber}</p>
                    <p>More Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            ) : (
                <div style={{ marginTop: 10 }}>
                    <div className={styles.friendItem}>
                        <div className={styles.shimmer} style={{ height: '2em', width: '70%', marginBottom: '0.5rem' }}></div>
                        <div className={styles.shimmer} style={{ height: '15px', width: '100%', marginBottom: '0.5rem' }}></div>
                        <div className={styles.shimmer} style={{ height: '15px', width: '100%', marginBottom: '0.5rem' }}></div>
                        <div className={styles.shimmer} style={{ height: '20px', width: '100%', marginBottom: '0.5rem' }}></div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default FriendInfo;

