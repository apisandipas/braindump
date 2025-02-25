import React from "react";
import { useSlate } from "slate-react";
import { Button } from "@apisandipas/bssckit";
import { Editor, Transforms } from "slate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Icon = ({ icon }) => {
  return <FontAwesomeIcon icon={icon} />;
};

export const BlockButton = ({ format, icon, ...props }) => {
  const editor = useSlate();
  return (
    <Button
      {...props}
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon icon={icon} />
    </Button>
  );
};

export const MarkButton = ({ format, icon, ...props }) => {
  const editor = useSlate();
  return (
    <Button
      {...props}
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon icon={icon} />
    </Button>
  );
};
