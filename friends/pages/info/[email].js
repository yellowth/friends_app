import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { fetchFriendByEmail } from "../../mockapi";

const FriendInfo = ({ friend }) => {
    return (
        <Layout>
            <h1>Friend Info</h1>
            <p>Name: {friend.name}</p>
            <p>Email: {friend.email}</p>
            <p>Phone: {friend.phoneNumber}</p>
            <p>Friend Status: {friend.friendStatus}</p>
            {/* Display more friend attributes here */}
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { email } = context.params;
    const friend = await fetchFriendByEmail(email);

    return {
        props: {
            friend,
        },
    };
}

export default FriendInfo;

