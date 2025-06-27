import React from "react";

export default function ShippingPage() {
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
