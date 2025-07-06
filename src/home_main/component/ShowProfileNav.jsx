import React, { useContext } from "react";
import { Link } from "react-router";
import { TokenContext } from "../../utills/context/countContext";

function logOut(e) {
  localStorage.clear();
}
// localStorage.clear();
export default function ShowProfileNav() {
  const { setToken } = useContext(TokenContext);
  return (
    <div className="absolute  left-0 mx-auto p-4  text-lg text-left z-50 bg-white/30 backdrop-blur-md   flex flex-col w-48">
      <Link to="/userprofile" className="hover:backdrop-blur-2xl">
        Profile
      </Link>
      <Link className="hover:backdrop-blur-2xl" to="/myorders">
        My Orders
      </Link>
      <Link className="hover:backdrop-blur-2xl" to={"/mypets"}>
        My Pets
      </Link>
      <Link className="hover:backdrop-blur-2xl" to={"/mybookings"}>
        My Bookings
      </Link>
      <Link
        className="hover:backdrop-blur-2xl"
        onClick={() => {
          setToken(null);
          logOut();
        }}
      >
        Log Out
      </Link>
    </div>
  );
}
