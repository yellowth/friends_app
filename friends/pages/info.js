import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { fetchFriendByEmail } from "../mockapi";

const FriendInfo = () => {
    const router = useRouter();
    const { email } = router.query;
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
        <Layout>
            {friend ? (
                <>
                    <h1>{friend.name}</h1>
                    <p>Email: {friend.email}</p>
                    <p>Phone: {friend.phoneNumber}</p>
                    {friend.friendStatus != null && (
                        <p>Friend Status: {friend.friendStatus}</p>)}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Layout>
    );
};

export default FriendInfo;

