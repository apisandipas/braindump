import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Div, Ul, Li } from "@apisandipas/bssckit";

const NoteListWrapper = styled(Ul)`
  padding-left: 0;
  list-style-type: none;
`;

const NoteItem = styled(Li)`
  a,
  a:hover {
    color: var(--body-color);
    text-decoration: none;
    display: block;
    > div {
      padding: 1rem 2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  border-bottom: 1px solid #ccc;
  border-right: 1px solid ${props => (props.selected ? "transparent" : "#ccc;")};
  background: ${props =>
    props.selected ? "var(--body-background)" : "transparent"};
`;

function NoteListItems({ notes, isAllNotes, notebookId }) {
  const { noteId } = useParams();

  return (
    <NoteListWrapper>
      {notes?.length &&
        notes.length > 0 &&
        notes.map((note, index) => {
          const url = isAllNotes
            ? `/notebook/all/note/${note.id}`
            : `/notebook/${notebookId}/note/${note.id}`;
          return (
            <NoteItem key={note.title + index} selected={noteId === note.id}>
              <Link to={url}>
                <Div>{note.title}</Div>
              </Link>
            </NoteItem>
          );
        })}
    </NoteListWrapper>
  );
}

export default NoteListItems;
