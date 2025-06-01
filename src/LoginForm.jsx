import React, { useEffect, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("lll");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);
  return (
    <>
      <div className="h-screen justify-center items-center flex">
        <div className="flex flex-col">
          <input
            type="email"
            value={email}
            className="border"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.password)}
            className="border"
          />
        </div>

        <button>Login</button>
      </div>
    </>
  );
}
