import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import Sidebar from "components/Sidebar";

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
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

//<NotebookList notebooks={data?.allNoteboks || []} />
function Home() {
  const { data } = useQuery(TAGS_AND_NOTEBOOKS_QUERY);
  const { notebookId, noteId } = useParams();

  console.log(data);
  console.log("notebookId", notebookId);
  console.log("noteId", noteId);
  return (
    <AppWrapper>
      <Sidebar
        tags={data?.allTags || []}
        notebooks={data?.allNotebooks || []}
      />
    </AppWrapper>
  );
}

export default Home;
