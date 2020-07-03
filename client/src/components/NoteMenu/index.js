import React, { useState } from "react";
import {
  Span,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownDivider
} from "@apisandipas/bssckit";
import styled from "styled-components";
import { KebobIcon } from "components/Icons";
import useToggle from "utils/hooks/useToggle";

const NoteMenuButton = styled(Span)`
  background: transparent;
  color: var(--nord3);
  border: 0;
  display: flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function NoteMenu() {
  const [menuOpen, toggleMenuOpen] = useToggle(false);
  return (
    <Dropdown>
      <NoteMenuButton ml4 border onClick={toggleMenuOpen}>
        <KebobIcon />
      </NoteMenuButton>
      <DropdownMenu right hidden={!menuOpen} toggle={toggleMenuOpen}>
        <DropdownItem>Delete Note</DropdownItem>
        <DropdownItem>Move to...</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default NoteMenu;
