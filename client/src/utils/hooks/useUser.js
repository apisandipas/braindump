import { useState } from "react";
import decode from "jwt-decode";
import { getTokens } from "utils/auth";

function useUser() {
  const [user] = useState(decode(getTokens().token).user);
  return user;
}

export default useUser;
