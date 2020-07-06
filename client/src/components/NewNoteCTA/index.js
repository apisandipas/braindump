import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { useParams, useHistory } from "react-router-dom";
import { NewIcon } from "components/Icons";
import {
  NEW_NOTE_MUTATION,
  ALL_NOTES_QUERY,
  SELECTED_NOTEBOOK_NOTES_QUERY
} from "utils/queries";

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

function NewNoteCTA() {
  const [createNote] = useMutation(NEW_NOTE_MUTATION);
  const { notebookId } = useParams();
  const history = useHistory();

  const refetchQueries =
    notebookId === "all"
      ? [{ query: ALL_NOTES_QUERY }]
      : [{ query: SELECTED_NOTEBOOK_NOTES_QUERY, variables: { notebookId } }];

  async function createNewNote() {
    try {
      const response = await createNote({
        variables: {
          title: "Untitled",
          body: JSON.stringify([
            {
              type: "paragraph",
              children: [{ text: "" }]
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
