import React, { useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useParams, useRouteMatch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import useToggle from "utils/hooks/useToggle";
import NoteDetails from "components/NoteDetails";
import NoteList from "components/NoteList";
import Sidebar from "components/Sidebar";

const Main = styled.main`
  display: flex;
  flex-direction: row;
`;

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
  ${Main} {
    width: calc(
      100% - ${props => (props.isSidebarExpanded ? "240px" : "60px")}
    );
  }
`;

const SIDEBAR_EXPANDED_OPTION = "noteapp-sidebar-expanded";

const TAGS_AND_NOTEBOOKS_QUERY = gql`
  query getNotebooksAndTags {
    allNotebooks {
      id
      name
    }
    allTags {
      id
      name
    }
  }
`;

function Home() {
  const [isSidebarExpanded, toggleSidebarExpanded] = useToggle(
    localStorage.getItem(SIDEBAR_EXPANDED_OPTION) === "true"
  );

  useEffect(() => {
    localStorage.setItem(SIDEBAR_EXPANDED_OPTION, isSidebarExpanded);
  }, [isSidebarExpanded]);

  const notebooksIndexMatch = useRouteMatch("/notebook", {
    isExact: true
  });
  const isNotebookIndex = notebooksIndexMatch?.isExact;

  const { data } = useQuery(TAGS_AND_NOTEBOOKS_QUERY);
  const { notebookId, noteId } = useParams();

  const allTags = data?.allTags || [];
  const allNotebooks = data?.allNotebooks || [];

  return (
    <AppWrapper isSidebarExpanded={isSidebarExpanded}>
      <Sidebar
        tags={allTags}
        notebooks={allNotebooks}
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebarExpanded={toggleSidebarExpanded}
      />
      <Main>
        <NoteList
          isNotebookIndex={isNotebookIndex}
          notebookId={notebookId}
          noteId={noteId}
        />
        <NoteDetails
          isNotebookIndex={isNotebookIndex}
          notebookId={notebookId}
          noteId={noteId}
        />
      </Main>
    </AppWrapper>
  );
}

export default Home;
