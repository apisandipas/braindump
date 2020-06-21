import React from "react";
import styled from "styled-components";
import { NewIcon } from "components/Icons";

const NewNoteIcon = styled(NewIcon)`
  color: var(--nord14);
  transition: transform ease-in 100ms;
`;

const CTAWrapper = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 18px;
  font-weight: 700;
  &:hover ${NewNoteIcon} {
    transform: scale(1.1);
  }
`;

function NewNoteCTA() {
  return (
    <CTAWrapper>
      <NewNoteIcon /> New Note
    </CTAWrapper>
  );
}

export default NewNoteCTA;
