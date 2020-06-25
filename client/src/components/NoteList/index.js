import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Div, Ul, Li } from "@apisandipas/bssckit";
import gql from "graphql-tag";

const ALL_NOTES_QUERY = gql`
  query allNotes {
    allNotes {
      title
      body
      id
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
        notebookId
      }
    }
  }
`;

function NoteList({ isNotebookIndex, notebookId, noteId }) {
  const { data: allNotesData } = useQuery(ALL_NOTES_QUERY, {
    skip: notebookId
  });
  console.log("allNotesData", allNotesData);

  const { data: selectedNotebookData } = useQuery(
    SELECTED_NOTEBOOKED_NOTES_QUERY,
    {
      skip: !notebookId,
      variables: { notebookId }
    }
  );
  console.log("selectedNotebookData", selectedNotebookData);
  if (isNotebookIndex) {
    return <Div>Notebooks Index</Div>;
  } else if (!notebookId && !noteId) {
    const allNotes = allNotesData?.allNotes;
    return (
      <Div border borderError p4>
        All Notes note List
        <Ul>
          {allNotes?.length &&
            allNotes.length > 0 &&
            allNotes.map((note, index) => {
              return <Li key={note.title + index}>{note.title}</Li>;
            })}
        </Ul>
      </Div>
    );
  } else if (notebookId) {
    const selectedNotes = selectedNotebookData?.notesByNotebook?.notes;
    return (
      <Div border borderPrimary p4>
        Selected Notesbooks: {notebookId} Notelist
        <Ul>
          {selectedNotes?.length &&
            selectedNotes.length > 0 &&
            selectedNotes.map((note, index) => {
              return <Li key={note.title + index}>{note.title}</Li>;
            })}
        </Ul>
      </Div>
    );
  } else {
    return <Div />;
  }
}

export default React.memo(NoteList);
