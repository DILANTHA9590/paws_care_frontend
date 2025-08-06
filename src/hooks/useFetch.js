import axios from "axios";
import { useEffect, useState } from "react";

export const useFtech = (url) => {
  const [loaded, setLoaded] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookingData(res.data.bookings);
      })
      .catch((err) => {
        console.log("sss", err);
        toast.error("Please try again later");
        if (err.status) {
          setErr(err.status);
        } else {
          setErr("network");
        }
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [loaded]);

  return { bookingData, loaded, err, setLoaded };
};
