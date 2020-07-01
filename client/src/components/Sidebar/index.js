import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Div } from "@apisandipas/bssckit";
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
  }
`;

const SidebarContent = styled(Div)`
  height: calc(100vh - 50px);
`;

function Sidebar({
  tags,
  notebooks,
  isSidebarExpanded,
  toggleSidebarExpanded
}) {
  return (
    <SidebarWrapper expanded={isSidebarExpanded}>
      <SidebarContent>
        <SidebarAccountMenu />
        <NewNoteCTA />
        <Link to="/">All Notes</Link>
        <SidebarAccordian
          as={Link}
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
