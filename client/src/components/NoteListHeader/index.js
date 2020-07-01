import React from "react";
import PropTypes from "prop-types";
import { Div, H5 } from "@apisandipas/bssckit";
import styled from "styled-components";

const HeaderWrapper = styled(Div)`
  color: var(--body-background);
  background: var(--nord9);
`;

function NoteListHeader({ notebookName, notesCount }) {
  return (
    <HeaderWrapper p6 borderBottom>
      <H5>{notebookName}</H5>
      <Div>{notesCount} Notes </Div>
    </HeaderWrapper>
  );
}

NoteListHeader.propTypes = {
  notebookName: PropTypes.string,
  notesCount: PropTypes.number
};

NoteListHeader.defaultProps = {
  notebookName: "All Notes",
  notesCount: 0
};

export default NoteListHeader;
