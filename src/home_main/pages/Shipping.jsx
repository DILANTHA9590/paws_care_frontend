import React from "react";
import { useLocation } from "react-router";

export default function Shipping() {
  const location = useLocation();
  const data = location.state;

  console.log(data);

  return (
    <>
      <div>
        <h1>{data.discount}</h1>
        <h1>{data.total}</h1>
      </div>
    </>
  );
}
