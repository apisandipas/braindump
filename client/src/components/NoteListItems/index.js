import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import friendlyTime from "friendly-time";
import { Div, Ul, Li } from "@apisandipas/bssckit";

const NoteListWrapper = styled(Ul)`
  padding-left: 0;
  list-style-type: none;
  overflow-y: scroll;
  height: calc(100vh - 102px);
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

const UpdatedAt = styled(Div)`
  color: var(--nord3);
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

          const time = new Date(+note.updatedAt);
          const updatedAt = friendlyTime(time);

          return (
            <NoteItem key={note.title + index} selected={noteId === note.id}>
              <Link to={url}>
                <Div>
                  {note.title}
                  <UpdatedAt>{updatedAt}</UpdatedAt>
                </Div>
              </Link>
            </NoteItem>
          );
        })}
    </NoteListWrapper>
  );
}

export default NoteListItems;
