import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { fetchFriendsByPage } from "../mockapi";
import Link from "next/link";

const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
};

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const filterMenuRef = useRef();
  const [totalFriends, setTotalFriends] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { slicedData, totalCount } = await fetchFriendsByPage(currentPage); // Pass the currentPage to fetch the correct friends
      setFriends(slicedData);
      setTotalFriends(totalCount);
      setLoading(false);
    };

    fetchData();
  }, [currentPage]);

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  useOutsideClick(filterMenuRef, () => {
    setShowFilterMenu(false);
  });

  const handleFilterChange = (e) => {
    if (e.target.checked) {
      setTempSelectedFilters([...tempSelectedFilters, e.target.value]);
    } else {
      setTempSelectedFilters(tempSelectedFilters.filter((f) => f !== e.target.value));
    }
  };

  const clearFilters = () => {
    setTempSelectedFilters([]);
  };

  const clearFiltersNow = () => {
    setSelectedFilters([]);
    setShowFilterMenu(false);
  };

  const applyFilters = () => {
    setSelectedFilters(tempSelectedFilters);
    setShowFilterMenu(false);
  };

  const filteredFriends = friends.filter((friend) => {
    if (selectedFilters.length === 0) {
      return true;
    }
    return selectedFilters.includes(friend.friendStatus);
  });

  const totalPages = Math.ceil(totalFriends / 7); // Calculate the total number of pages
  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1); // Generate an array of page numbers
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <h1>Friends</h1>
      <div>
        <button onClick={toggleFilterMenu}>Filter</button>
        <button onClick={clearFiltersNow}>Clear all</button>
        {showFilterMenu && (
          <div ref={filterMenuRef}>
            <div>
              <input
                type="checkbox"
                id="closeFriends"
                value="Close Friends"
                checked={tempSelectedFilters.includes("Close Friends")}
                onChange={handleFilterChange}
              />
              <label htmlFor="closeFriends">Close Friends</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="superCloseFriends"
                value="Super Close Friends"
                checked={tempSelectedFilters.includes("Super Close Friends")}
                onChange={handleFilterChange}
              />
              <label htmlFor="superCloseFriends">Super Close Friends</label>
            </div>
            <button onClick={clearFilters}>Clear all</button>
            <button onClick={applyFilters}>Apply</button>
          </div>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredFriends.map((friend) => (
            <li key={friend.email}>
              <Link href={`/info?email=${friend.email}`}>
                <h2>{friend.name}</h2>
              </Link>
              <p>Email: {friend.email}</p>
              <p>Phone: {friend.phoneNumber}</p>
              {friend.friendStatus != null && (
                <p>Friend Status: {friend.friendStatus}</p>)}
            </li>
          ))}
        </ul>)}
      <div>
        {pageButtons.map((page) => (
          <button key={page} onClick={() => goToPage(page)}>{page}</button>
        ))}
      </div>
    </Layout>
  );
};

export default Friends;


