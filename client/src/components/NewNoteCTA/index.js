import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useParams, useHistory } from "react-router-dom";
import { NewIcon } from "components/Icons";

const NewNoteIcon = styled(NewIcon)`
  color: var(--nord14);
  transition: transform ease-in 100ms;
`;

const CTAWrapper = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 18px;
  font-weight: 700;
  &:hover ${NewNoteIcon} {
    transform: scale(1.1);
  }
`;

const NEW_NOTE_MUTATION = gql`
  mutation newNote($title: String!, $body: String, $notebookId: ID) {
    createNote(
      values: { title: $title, body: $body, notebookId: $notebookId }
    ) {
      ok
      note {
        id
        title
        body
      }
    }
  }
`;

const ALL_NOTES_QUERY = gql`
  query allNotes {
    allNotes {
      title
      body
      id
      updatedAt
    }
  }
`;

const SELECTED_NOTEBOOKED_NOTES_QUERY = gql`
  query notesByNotebookId($notebookId: ID!) {
    notesByNotebook(notebookId: $notebookId) {
      ok
      notes {
        id
        title
        body
        updatedAt
      }
      notebook {
        id
        name
      }
    }
  }
`;

function NewNoteCTA() {
  const [createNote] = useMutation(NEW_NOTE_MUTATION);
  const { notebookId } = useParams();
  const history = useHistory();

  const refetchQueries =
    notebookId === "all"
      ? [{ query: ALL_NOTES_QUERY }]
      : [{ query: SELECTED_NOTEBOOKED_NOTES_QUERY, variables: { notebookId } }];

  async function createNewNote() {
    try {
      const response = await createNote({
        variables: {
          title: "Untitled",
          body: JSON.stringify([
            {
              type: "paragraph",
              children: [{ text: "Get started..." }]
            }
          ]),
          notebookId
        },
        refetchQueries
      });
      if (response.data?.createNote?.ok) {
        history.push(
          `/notebook/${notebookId}/note/${response.data?.createNote?.note?.id}`
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <CTAWrapper onClick={createNewNote}>
      <NewNoteIcon /> New Note
    </CTAWrapper>
  );
}

export default NewNoteCTA;
