import React from "react";
import { Link } from "react-router-dom";
import { Div } from "@apisandipas/bssckit";
import styled from "styled-components";
import useToggle from "utils/hooks/useToggle";

const Details = styled.div`
  max-height: ${props => (props.open ? "100%" : "0")};
  overflow: hidden;
  padding: ${props => (props.open ? "0.5rem 0" : "0")};
`;

function SidebarAccordian({ title, items, path }) {
  const [showDetails, toggleDetails] = useToggle(false);
  return (
    <>
      <Div onClick={toggleDetails}>{title}</Div>
      <Details open={showDetails}>
        <ul>
          {items.length > 0 &&
            items.map(item => {
              return (
                <li key={item.id}>
                  <Link to={`${path}${item.id}`}>{item.name}</Link>
                </li>
              );
            })}
        </ul>
      </Details>
    </>
  );
}

export default SidebarAccordian;
