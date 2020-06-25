import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useParams, useRouteMatch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Div } from "@apisandipas/bssckit";
import NoteDetails from "components/NoteDetails";
import NoteList from "components/NoteList";
import Sidebar from "components/Sidebar";

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: row;
`;

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
  const notebooksIndexMatch = useRouteMatch("/notebook", {
    isExact: true
  });
  const isNotebookIndex = notebooksIndexMatch?.isExact;

  const { data } = useQuery(TAGS_AND_NOTEBOOKS_QUERY);
  const { notebookId, noteId } = useParams();

  const allTags = data?.allTags || [];
  const allNotebooks = data?.allNotebooks || [];

  return (
    <AppWrapper>
      <Sidebar tags={allTags} notebooks={allNotebooks} />
      <Main>
        <Div>
          <NoteList
            isNotebookIndex={isNotebookIndex}
            notebookId={notebookId}
            noteId={noteId}
          />
        </Div>
        <Div>
          <NoteDetails
            isNotebookIndex={isNotebookIndex}
            notebookId={notebookId}
            noteId={noteId}
          />
        </Div>
      </Main>
    </AppWrapper>
  );
}

export default Home;
