import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faUserCircle,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { ifProp } from "styled-tools";

const Icon = styled(({ end, ...props }) => <FontAwesomeIcon {...props} />)`
  ${ifProp(
    { end: true },
    css`
      margin-left: 0.5em;
    `,
    css`
      margin-right: 0.5rem;
    `
  )}
`;

export const ChevronDown = styled(Icon).attrs({
  icon: faChevronDown
})``;

export const AccountIcon = styled(Icon).attrs({
  icon: faUserCircle
})``;

export const NewIcon = styled(Icon).attrs({
  icon: faPlusCircle,
  title: "New"
})``;
