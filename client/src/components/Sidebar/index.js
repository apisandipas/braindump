import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Div } from "@apisandipas/bssckit";
import { NoteIcon, NotebookIcon, TagsIcon } from "components/Icons";
import SidebarAccountMenu from "components/SidebarAccountMenu";
import NewNoteCTA from "components/NewNoteCTA";
import SidebarAccordian from "components/SidebarAccordian";

const SidebarWrapper = styled(Div)`
  width: ${props => (props.expanded ? "240px" : "60px")};
  background: var(--nord1);
  display: flex;
  flex-direction: column;
  transition: width ease-out 250ms;
  color: var(--nord4);

  a {
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
`;

const SidebarContent = styled(Div)`
  height: calc(100vh - 50px);
`;

const AllNotesLink = styled(Link)`
  padding: 0.5rem 0 0.5rem 2.66rem;
  display: block;
  background: ${props => (props.selected ? "var(--nord3)" : "transparent")};
  &:hover {
    background: ${props => (props.selected ? "var(--nord3)" : "var(--nord2)")};
  }
`;

function Sidebar({
  tags,
  notebooks,
  isSidebarExpanded,
  notebookId,
  toggleSidebarExpanded,
  isNotebookIndex
}) {
  return (
    <SidebarWrapper expanded={isSidebarExpanded}>
      <SidebarContent>
        <SidebarAccountMenu />
        <NewNoteCTA />
        <Div>
          <AllNotesLink to="/" selected={notebookId && notebookId === "all"}>
            <NoteIcon />
            All Notes
          </AllNotesLink>
          <SidebarAccordian
            isNotebookIndex={isNotebookIndex}
            notebookId={notebookId}
            as={Link}
            title="Notebooks"
            items={notebooks}
            path={"/notebook/"}
            icon={NotebookIcon}
          />
          <SidebarAccordian
            title="Tags"
            icon={TagsIcon}
            items={tags}
            path={"/?tags="}
          />
        </Div>
      </SidebarContent>
      {/* <Button onClick={toggleSidebarExpanded}>Toggle</Button>*/}
    </SidebarWrapper>
  );
}

Sidebar.defaultProps = {
  expanded: true
};

Sidebar.propTypes = {
  expanded: PropTypes.bool
};

export default Sidebar;
