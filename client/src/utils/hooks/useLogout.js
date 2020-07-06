import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "utils/auth";
import { INVALIDATE_TOKENS_MUTATION } from "utils/queries";

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
