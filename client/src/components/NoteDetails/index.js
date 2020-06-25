import React from "react";
import { Div } from "@apisandipas/bssckit";

function NoteDetails({ isNotebookIndex, noteId }) {
  if (isNotebookIndex) return null;

  if (!noteId) {
    //return first note
    return;
  }

  return (
    <Div border borderPrimary p4>
      {noteId}
    </Div>
  );
}

export default React.memo(NoteDetails);
