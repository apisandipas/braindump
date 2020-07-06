import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { Div } from "@apisandipas/bssckit";
import Editor from "components/Editor";
import { NOTE_QUERY } from "utils/queries";

const NoteDetailsWrapper = styled(Div)`
  width: calc(100% - 266px);
`;

function NoteDetails({ isNotebookIndex, noteId }) {
  const { data } = useQuery(NOTE_QUERY, {
    variables: { id: noteId },
    skip: isNotebookIndex || !noteId
  });

  // Hide on notebook index view
  if (isNotebookIndex) return null;

  const note = data?.getNote;

  if (!noteId || !note) {
    //return first note
    return;
  }

  return (
    <NoteDetailsWrapper p4>
      <Editor
        note={note}
        title={note.title}
        content={note.body}
        key={note.id}
      />
    </NoteDetailsWrapper>
  );
}

export default React.memo(NoteDetails);
