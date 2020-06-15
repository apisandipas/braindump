import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "utils/auth";

const INVALIDATE_TOKENS_MUTATION = gql`
  mutation logout {
    invalidateTokens
  }
`;

function Home() {
  const [invalidateTokens, { client }] = useMutation(
    INVALIDATE_TOKENS_MUTATION
  );
  const { logout } = useContext(AuthContext);

  const performLogout = async () => {
    await invalidateTokens();
    logout();
    client.resetStore();
  };

  return (
    <div>
      Home
      <ul>
        <li>
          <span onClick={performLogout}>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default Home;
