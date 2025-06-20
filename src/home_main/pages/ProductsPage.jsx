import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [product, setProduct] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getproduct`, {
        params: {
          search: "Maxi",
          maxPrice: "",
          minPrice: "",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      <div>Product Page</div>
    </>
  );
}
