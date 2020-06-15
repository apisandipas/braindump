import React from "react";
import useLogout from "utils/hooks/useLogout";

function Home() {
  const logout = useLogout();

  return (
    <div>
      Home
      <ul>
        <li>
          <span onClick={() => logout()}>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default Home;
