import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { getAllUsers } from '../api/auth'

const INITIAL_COUNT = 9;
const LOAD_MORE_COUNT = 6;

const Discover = () => {

  const [users, setUsers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers || []);
    };
    fetchUsers();
  }, []);

  const visibleUsers = users.slice(0, visibleCount);
  const hasMore = visibleCount < users.length;

  return (
    <div className="transition">
      <Navbar />
      <div className="discover">
        <p className="text-3xl font-extrabold mb-5">People you may know🕵🏻‍♂️</p>
        <div className="discover2">
          {visibleUsers.map((frnd, index) => (
            <div className="box" key={frnd._id || index}>
              <img
                src={`/assets/user${(index % 5) + 1}.jpeg`}
                className="disimg"
                alt={`User ${index + 1}`}
              />
              <div className="disname">
                <div>
                  <p className="font-bold">User {index + 1}</p>
                  <p className="text-lg">@user{index + 1}</p>
                </div>
                <button className="edit follow">Follow</button>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <p
            className="show-more-text"
            onClick={() => setVisibleCount(prev => prev + LOAD_MORE_COUNT)}
          >
            Show more →
          </p>
        )}
        {!hasMore && users.length > 0 && (
          <p className="show-more-text no-more">You've seen everyone 👋</p>
        )}
      </div>
    </div>
  )
}

export default Discover