import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Div } from "@apisandipas/bssckit";
import styled from "styled-components";
import gql from "graphql-tag";
import NoteListHeader from "components/NoteListHeader";
import NoteListItems from "components/NoteListItems";

const NoteListWrapper = styled(Div)`
  width: 266px;
  background: var(--nord4);
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
      }
      notebook {
        id
        name
      }
    }
  }
`;

function NoteList({ isNotebookIndex, notebookId, noteId }) {
  const history = useHistory();

  const { data: allNotesData } = useQuery(ALL_NOTES_QUERY, {
    skip: notebookId && notebookId !== "all"
  });

  const allNotes = allNotesData?.allNotes;

  useEffect(() => {
    if (isNotebookIndex) {
      return;
    }
    if ((!notebookId || notebookId === "all") && allNotes?.length) {
      console.log("redirecting....");
      const firstNote = allNotes[0];
      history.push(`/notebook/all/note/${firstNote.id}`);
    }
  }, [allNotesData, allNotes, history, isNotebookIndex, notebookId]);

  const { data: selectedNotebookData } = useQuery(
    SELECTED_NOTEBOOKED_NOTES_QUERY,
    {
      skip: !notebookId || notebookId === "all",
      variables: { notebookId }
    }
  );

  const notes = selectedNotebookData?.notesByNotebook?.notes;

  useEffect(() => {
    // Forward to he first note in the notebook if no note id is supplied
    if (notebookId && !noteId && notes?.length) {
      const firstNote = notes[0];
      history.push(`/notebook/${notebookId}/note/${firstNote.id}`);
    }
  }, [selectedNotebookData, history, notebookId, noteId, notes]);

  if (isNotebookIndex) {
    return <NoteListWrapper>Notebooks Index</NoteListWrapper>;
  } else if (!notebookId || notebookId === "all") {
    return (
      <NoteListWrapper>
        <NoteListHeader notesCount={allNotes?.length} />
        <NoteListItems notes={allNotes} isAllNotes={true} />
      </NoteListWrapper>
    );
  } else if (notebookId) {
    const selectedNotes = selectedNotebookData?.notesByNotebook?.notes;
    const selectedNotebook = selectedNotebookData?.notesByNotebook?.notebook;
    return (
      <NoteListWrapper>
        <NoteListHeader
          notebookName={selectedNotebook?.name}
          notesCount={selectedNotes?.length}
        />
        <NoteListItems
          notes={selectedNotes}
          isAllNotes={false}
          notebookId={notebookId}
        />
      </NoteListWrapper>
    );
  } else {
    return null;
  }
}

export default React.memo(NoteList);
