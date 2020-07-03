import React from "react";
import { Link } from "react-router-dom";
import { Div, Span, Ul, Li } from "@apisandipas/bssckit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import useToggle from "utils/hooks/useToggle";

const SidebarItem = styled(Div)`
  padding: 0.5rem 0 0.5rem 1.33rem;
  background: ${props => (props.selected ? "var(--nord3)" : "transparent")};
  &:hover {
    background: ${props => (props.selected ? "var(--nord3)" : "var(--nord2)")};
  }
`;

const DynamicCaret = styled(({ showDetails, ...props }) => (
  <FontAwesomeIcon {...props} />
)).attrs({
  icon: faChevronRight
})`
  transform: ${props => (props.showDetails ? "rotate(90deg)" : "none")};
  transition: transform 100ms linear;
  margin-right: 0.75rem;
  cursor: pointer;
`;

const Details = styled.div`
  max-height: ${props => (props.open ? "100%" : "0")};
  overflow: hidden;
`;

const SidebarItemUl = styled(Ul)`
  list-style-type: none;
`;

const SidebarItemLi = styled(Li)`
  a {
    padding: 0.5rem 1.33rem 0.5rem 2.66rem;
    background: ${props => (props.selected ? "var(--nord3)" : "transparent")};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function SidebarAccordian({
  title,
  items,
  path,
  isNotebookIndex,
  notebookId,
  icon: Icon,
  as: Component = Span
}) {
  const [showDetails, toggleDetails] = useToggle(false);
  const isSelected = title === "Notebooks" && isNotebookIndex;
  return (
    <>
      <SidebarItem selected={isSelected}>
        <DynamicCaret showDetails={showDetails} onClick={toggleDetails} />
        {Icon && <Icon />}
        <Component to={path}>{title}</Component>
      </SidebarItem>
      <Details open={showDetails}>
        <SidebarItemUl mb0 px0>
          {items.length > 0 &&
            items.map(item => {
              const isItemSelected = notebookId && notebookId === item.id;
              return (
                <SidebarItemLi key={item.id} selected={isItemSelected}>
                  <Link to={`${path}${item.id}`} style={{ display: "block" }}>
                    {item.name}
                  </Link>
                </SidebarItemLi>
              );
            })}
        </SidebarItemUl>
      </Details>
    </>
  );
}

export default SidebarAccordian;
