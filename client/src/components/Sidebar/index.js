import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Div } from "@apisandipas/bssckit";
import useToggle from "utils/hooks/useToggle";
import SidebarAccountMenu from "../SidebarAccountMenu";
import NewNoteCTA from "../NewNoteCTA";
import SidebarAccordian from "components/SidebarAccordian";

const SidebarWrapper = styled.div`
  width: ${props => (props.expanded ? "240px" : "60px")};
  background: var(--nord1);
  display: flex;
  flex-direction: column;
  transition: width ease-out 250ms;
  color: var(--nord4);

  a {
    color: #fff;
  }
`;

const SidebarContent = styled.div`
  height: calc(100vh - 50px);
`;

const Details = styled.div`
  max-height: ${props => (props.open ? "100%" : "0")};
  overflow: hidden;
  padding: ${props => (props.open ? "0.5rem 0" : "0")};
`;

const SIDEBAR_EXPANDED_OPTION = "noteapp-sidebar-expanded";

function Sidebar({ tags, notebooks }) {
  const [isSidebarExpanded, toggleSidebarExpanded] = useToggle(
    localStorage.getItem(SIDEBAR_EXPANDED_OPTION) === "true"
  );

  useEffect(() => {
    localStorage.setItem(SIDEBAR_EXPANDED_OPTION, isSidebarExpanded);
  }, [isSidebarExpanded]);

  const [showDetails, toggleDetails] = useToggle(false);

  return (
    <SidebarWrapper expanded={isSidebarExpanded}>
      <SidebarContent>
        <SidebarAccountMenu />
        <NewNoteCTA />
        <Link to="/">All Notes</Link>
        <SidebarAccordian
          title="Notebooks"
          items={notebooks}
          path={"/notebook/"}
        />
        <SidebarAccordian title="Tags" items={tags} path={"/?tags="} />
      </SidebarContent>
      <Button onClick={toggleSidebarExpanded}>Toggle</Button>
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
