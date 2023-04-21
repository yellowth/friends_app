import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchFriendByEmail } from "../mockapi";

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
        <>
            {friend ? (
                <>
                    <h1>{friend.name}</h1>
                    <p>Email: {friend.email}</p>
                    <p>Phone: {friend.phoneNumber}</p>
                    {friend.friendStatus != null && (
                        <p>Friend Status: {friend.friendStatus}</p>)}
                    <p>Details: Lorem ipsum</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default FriendInfo;

