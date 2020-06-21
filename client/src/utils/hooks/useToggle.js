import { useState } from "react";

function useToggle(initialValue) {
  const [isToggled, setIsToggled] = useState(initialValue);

  const toggleIsToggled = () => setIsToggled(!isToggled);

  return [isToggled, toggleIsToggled];
}

export default useToggle;
