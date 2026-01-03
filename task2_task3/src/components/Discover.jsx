import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Cookies from "js-cookie";


const Discover = () => {

const [users, setUsers] = useState([]);
useEffect(() => {
  const fetchUsers = async () => {
    const token = Cookies.get("token");

    const res = await fetch(
      "https://task4-authdb.onrender.com/auth/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
const data = await res.json();
    setUsers(data.users);
console.log("API response:", data);
};
fetchUsers();
}, []);

const disPeople=users

  return (
    <div className="transition">
      <Navbar/>
      <div className="discover">
<p className="text-3xl font-extrabold mb-5">People you may know🕵🏻‍♂️</p>
<div className="discover2">
{disPeople.map((frnd,index)=>{
  return(
    <div className="box"> 
  <img src={`/assets/user${(index % 5) + 1}.jpeg`}
  className="disimg"/>

  <div className="disname"> 
    <div>
    <p className="font-bold">{frnd.name}</p>
    <p className="text-lg">@{frnd.name}</p>
    </div>
    <button className="edit follow">Follow</button>
  </div>
  </div>
  )

})}
</div>


      </div>
    </div>
  )
}

export default Discover