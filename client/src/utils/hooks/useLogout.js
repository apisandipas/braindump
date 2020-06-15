import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "utils/auth";

const INVALIDATE_TOKENS_MUTATION = gql`
  mutation logout {
    invalidateTokens
  }
`;

function useLogout() {
  const [invalidateTokens, { client }] = useMutation(
    INVALIDATE_TOKENS_MUTATION
  );
  const { logout } = useContext(AuthContext);

  const performLogout = async () => {
    await invalidateTokens();
    logout();
    client.resetStore();
  };

  return performLogout;
}

export default useLogout;
