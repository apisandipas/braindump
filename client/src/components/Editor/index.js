import React, { useCallback, useState, useMemo } from "react";
import { createEditor } from "slate";
import gql from "graphql-tag";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import {
  faBold,
  faItalic,
  faUnderline,
  faCode,
  faQuoteRight,
  faListUl,
  faListOl
} from "@fortawesome/free-solid-svg-icons";
import friendlyTime from "friendly-time";
import { useMutation } from "@apollo/react-hooks";
import {
  FormControl,
  Div,
  Span,
  Button,
  ButtonGroup,
  ButtonToolbar
} from "@apisandipas/bssckit";
import styled from "styled-components";
import NoteMenu from "components/NoteMenu";
import { NotebookIcon } from "components/Icons";
import { withMarkdownShortcuts } from "utils/markdown";
import { MarkButton, BlockButton } from "utils/richText";
import { SAVE_CHANGES_MUTATION } from "utils/queries";

const TitleInput = styled(FormControl).attrs({
  plainText: true,
  inline: true
})`
  font-size: 18px;
  border: 1px solid var(--nord4) !important;
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

const ContentHeader = styled(Div)`
  display: flex;
  align-items: center;
  padding: 1rem 1rem 0;
`;

const ContentMeta = styled(Div)`
  display: flex;
  padding: 1rem 1rem 0;
`;

const LastEdit = styled(Span)``;

const NotebookName = styled(Div)`
  margin-left: auto;
`;

const ContentWrapper = styled(Div)`
  // Take up full height, minus the content header
  height: calc(100vh - 74px - 37px);
  overflow-y: auto;
  padding: 2rem 1rem;
`;

const RichTextToolbar = styled(Div)`
  padding: 1rem 1rem 0;
`;

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    case "heading-five":
      return <h5 {...attributes}>{children}</h5>;
    case "heading-six":
      return <h6 {...attributes}>{children}</h6>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

function RichTextEditor({ note }) {
  const { id, title, body, updatedAt, notebook } = note;
  const [saveChanges] = useMutation(SAVE_CHANGES_MUTATION);
  const editor = useMemo(
    () => withMarkdownShortcuts(withReact(withHistory(createEditor()))),
    []
  );
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const [bodyValue, setBodyValue] = useState(body ? JSON.parse(body) : []);
  const [titleValue, setTitleValue] = useState(title || "Untitled");
  const [hasChanges, setHasChanges] = useState(false);

  async function persistChanges() {
    try {
      await saveChanges({
        variables: {
          id,
          title: titleValue,
          body: JSON.stringify(bodyValue)
        }
      });
      setHasChanges(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <ContentHeader>
        <TitleInput
          value={titleValue}
          onChange={e => {
            setHasChanges(true);
            setTitleValue(e.target.value);
          }}
        />
        <SaveButton success ml4 disabled={!hasChanges} onClick={persistChanges}>
          Save
        </SaveButton>
        <NoteMenu />
      </ContentHeader>
      <ContentMeta>
        <LastEdit>Last edited: {friendlyTime(new Date(+updatedAt))}</LastEdit>
        {notebook && (
          <NotebookName>
            <NotebookIcon />
            {notebook.name}
          </NotebookName>
        )}
      </ContentMeta>
      <Slate
        editor={editor}
        value={bodyValue}
        onChange={newValue => {
          setHasChanges(true);
          setBodyValue(newValue);
        }}
      >
        <RichTextToolbar>
          <ButtonToolbar>
            <ButtonGroup mr2>
              <MarkButton format="bold" icon={faBold} dark />
              <MarkButton format="italic" icon={faItalic} dark />
              <MarkButton format="underline" icon={faUnderline} dark />
              <MarkButton format="code" icon={faCode} dark />
            </ButtonGroup>
            <ButtonGroup>
              <BlockButton format="block-quote" icon={faQuoteRight} dark />
              <BlockButton format="numbered-list" icon={faListOl} dark />
              <BlockButton format="bulleted-list" icon={faListUl} dark />
            </ButtonGroup>
          </ButtonToolbar>
        </RichTextToolbar>
        <ContentWrapper>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Take some notes!"
          />
        </ContentWrapper>
      </Slate>
    </>
  );
}

export default RichTextEditor;
