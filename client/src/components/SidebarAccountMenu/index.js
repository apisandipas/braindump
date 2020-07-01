import React from "react";
import styled from "styled-components";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownDivider
} from "@apisandipas/bssckit";
import useLogout from "utils/hooks/useLogout";
import useUser from "utils/hooks/useUser";
import useToggle from "utils/hooks/useToggle";
import { ChevronDown, AccountIcon } from "components/Icons";

const AccountMenuWrapper = styled.div`
  padding: 1rem;
`;

const MenuClickTarget = styled.div`
  padding: 0.5rem 0;
`;

function SidebarAccountMenu() {
  const logout = useLogout();
  const [toggleOpen, setToggleOpen] = useToggle(false);
  const user = useUser();

  return (
    <AccountMenuWrapper>
      <Dropdown>
        <MenuClickTarget onClick={() => setToggleOpen()}>
          <AccountIcon /> {user.email} <ChevronDown end />{" "}
        </MenuClickTarget>
        <DropdownMenu hidden={!toggleOpen} toggle={() => setToggleOpen()}>
          <DropdownItem>Edit Account</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={logout}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </AccountMenuWrapper>
  );
}

export default SidebarAccountMenu;
