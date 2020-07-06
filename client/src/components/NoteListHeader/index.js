import React from "react";
import PropTypes from "prop-types";
import { Div, H5 } from "@apisandipas/bssckit";
import styled from "styled-components";

const HeaderWrapper = styled(Div)`
  color: var(--body-color);
  background: var(--nord5);
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  h5 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function NoteListHeader({ notebookName, notesCount }) {
  return (
    <HeaderWrapper p6>
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
