import React, { useEffect, useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { FormControl, Div, Button } from "@apisandipas/bssckit";
import styled from "styled-components";
import NoteMenu from "components/NoteMenu";

const TitleInput = styled(FormControl).attrs({
  plainText: true,
  inline: true
})`
  font-size: 18px;
  border: 1px solid var(--nord4) !important;
  margin-bottom: 1rem;
  // Make input full width, minus the width of buttons and margins
  width: calc(100% - 1rem - 100px - 1rem - 38px);
  &:focus {
    outline: none;
    background: #fff;
  }
`;

const SaveButton = styled(Button)`
  display: inline;
  width: 100px;
`;

function Editor({ content, title }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [bodyValue, setBodyValue] = useState(
    content ? JSON.parse(content) : []
  );
  const [titleValue, setTitleValue] = useState(title || "Untitled");
  const [hasChanges, setHasChanges] = useState(false);

  return (
    <>
      <Div mb4>
        <TitleInput
          value={titleValue}
          onChange={e => {
            setHasChanges(true);
            setTitleValue(e.target.value);
          }}
        />
        <SaveButton success ml4 disabled={!hasChanges}>
          Save
        </SaveButton>
        <NoteMenu />
      </Div>
      <Slate
        editor={editor}
        value={bodyValue}
        onChange={newValue => {
          setHasChanges(true);
          setBodyValue(newValue);
        }}
      >
        <Editable />
      </Slate>
    </>
  );
}

export default Editor;
