export const fetchAllFriends = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulated 1s delay
    const response = await fetch("/api/friends");
    const data = await response.json();
    return data;
};

export const fetchFriendsByPage = async (currentPage) => {
    const data = await fetchAllFriends();
    const pageSize = 7;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const slicedData = data.slice(startIndex, endIndex);
    return { slicedData, totalCount: data.length };
};

export const fetchFriendByEmail = async (email) => {
    const data = await fetchAllFriends();
    const friend = data.find((f) => f.email === email);

    return friend;
};
