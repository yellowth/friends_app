import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import Topbar from "@/components/Topbar";
import FriendInfo from "@/components/FriendInfo";
import { fetchFriendsByPage } from "../mockapi";
import Link from "next/link";
import styles from '@/styles/friends.module.css'
import Image from 'next/image';
import filter from "../public/filter.svg";
import filteractive from "../public/filteractive.svg";
import divider from "../public/divider.svg";
import close from "../public/close.svg";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Import custom arrow icons


const useOutsideClick = (ref, buttonRef, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
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
  const filterButtonRef = useRef();
  const [totalFriends, setTotalFriends] = useState(0);
  const [selectedFriend, setSelectedFriend] = useState(null);

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

  useOutsideClick(filterMenuRef, filterButtonRef, () => {
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

  const showFriendDetails = (friend) => {
    setSelectedFriend(friend);
  };

  const goBackToList = () => {
    setSelectedFriend(null);
  };


  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Layout>
      <Topbar title='Friends' />
      <div style={{ paddingLeft: '16%', paddingRight: '16%' }}>
        {!selectedFriend ? (
          <>
            <div style={{ marginTop: 75 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  ref={filterButtonRef}
                  className={styles.button}
                  onClick={toggleFilterMenu}
                >
                  {!showFilterMenu ? (
                    <Image src={filter} alt="FilterButton" />
                  ) : (
                    <Image src={filteractive} alt="FilterButton" />
                  )}
                </button>

                <Image src={divider} alt="FilterButton" style={{ margin: 5 }} />
                <button className={styles.clearAll} onClick={clearFiltersNow}>Clear all</button>
              </div>
              {showFilterMenu && (
                <div style={{ padding: '1rem' }}>
                  <div ref={filterMenuRef} className={styles.filterMenu}>
                    <div className={styles.filterHeader}>
                      <button className={styles.clearAll} onClick={clearFilters}>Clear all</button>
                      <h4>Filter</h4>
                      <Image src={close} alt="CloseButton" onClick={toggleFilterMenu} style={{ cursor: 'pointer' }} />
                    </div>
                    <div style={{ marginRight: '15px' }}>
                      <p style={{ marginLeft: '12px', marginTop: '20px', color: '#686868', fontSize: '14px' }}>Friend Status</p>
                    </div>
                    <div className={styles.checkboxContainer}>
                      <label htmlFor="closeFriends">Close Friends</label>
                      <input
                        type="checkbox"
                        id="closeFriends"
                        value="Close Friends"
                        checked={tempSelectedFilters.includes("Close Friends")}
                        onChange={handleFilterChange}
                      />
                    </div>
                    <div className={styles.checkboxContainer}>
                      <label htmlFor="superCloseFriends">Super Close Friends</label>
                      <input
                        type="checkbox"
                        id="superCloseFriends"
                        value="Super Close Friends"
                        checked={tempSelectedFilters.includes("Super Close Friends")}
                        onChange={handleFilterChange}
                      />
                    </div>

                    <button className={styles.applyButton} onClick={applyFilters}>Apply</button>
                  </div>
                </div>

              )}
            </div>
            {loading ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {Array.from({ length: 7 }, (_, i) => (
                  <li style={{ marginBottom: '1rem' }}>
                    <div
                      key={i}
                      className={`${styles.preFriendItem} ${styles.friendItemLoader}`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className={styles.shimmer} style={{ height: '20px', width: '50%', marginBottom: '1rem' }}></div>
                      <div className={styles.shimmer} style={{ height: '15px', width: '100%', marginBottom: '1rem' }}></div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {filteredFriends.map((friend) => (
                  <li key={friend.email} style={{ marginBottom: '1rem' }}>
                    <div className={styles.friendItem} onClick={() => showFriendDetails(friend)}>
                      <div className={styles.friendHeader}>
                        <h2>{friend.name}</h2>
                        {friend.friendStatus != null && (
                          <div className={styles.status}>
                            <p className={`${styles.status} ${friend.friendStatus === "Close Friends" ? styles.closeFriendsStatus : friend.friendStatus === "Super Close Friends" ? styles.superCloseFriendsStatus : ""}`}>
                              {friend.friendStatus}
                            </p>
                          </div>
                        )}

                      </div>
                      <div>
                        <p>{friend.email}&nbsp;&nbsp;•&nbsp;&nbsp;{friend.phoneNumber}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>)}
            <div>
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={styles.pageNavButton}
              >
                <FaArrowLeft />
              </button>
              {pageButtons.map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`${styles.pageButton} ${page === currentPage ? styles.currentPage : ""}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className={styles.pageNavButton}
              >
                <FaArrowRight />
              </button>
            </div>
          </>
        ) : (
          <div style={{ marginTop: 80 }}>
            <button onClick={goBackToList} className={styles.backbutton} ><FaArrowLeft /></button>
            <FriendInfo email={selectedFriend.email} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Friends;


