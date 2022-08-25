import cx from "classnames";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { CornersIn, CornersOut, FloppyDisk, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useCase, useHeaderContext } from "../../contexts";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";
import { Action } from "./Action";
import draftToHtml from "draftjs-to-html";

const toolbarOptions = {
  options: ["inline", "list"],
  inline: {
    className: ["!mb-0"],
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  list: {
    className: ["!mb-0"],
    options: ["unordered", "ordered"],
  },
};

interface EntryBodyProps {
  isPlaintiff: boolean;
  isExpanded: boolean;
  setIsExpanded: () => void;
  onAbort: () => void;
  onSave: (x: any) => void;
  defaultContent?: string;
}

export const EntryForm: React.FC<EntryBodyProps> = ({
  isPlaintiff,
  isExpanded,
  setIsExpanded,
  onAbort,
  onSave,
  defaultContent,
}) => {
  const [hidePlaceholder, setHidePlaceholder] = useState<boolean>(false);
  const [editorState, setEditorState] = useState(() => {
    const blocksFromHTML = convertFromHTML(defaultContent || "");
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    return EditorState.createWithContent(contentState);
  });

  const { showColumnView } = useHeaderContext();
  const { entries } = useCase();
  const suggestions = entries.map((entry) => ({
    text: entry.entryCode,
    value: entry.entryCode,
    url: `#${entry.entryCode}`,
  }));
  const contentState = editorState.getCurrentContent();

  useEffect(() => {
    setHidePlaceholder(
      () => contentState.getBlockMap().first().getType() !== "unstyled"
    );
  }, [contentState]);

  return (
    <div
      className={cx("border border-t-0 rounded-b-lg", {
        "border-lightPurple": isPlaintiff,
        "border-lightPetrol": !isPlaintiff,
        "RichEditor-hidePlaceholder": hidePlaceholder,
      })}
    >
      <Editor
        mention={{
          separator: " ",
          trigger: "#",
          suggestions,
        }}
        defaultEditorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName={cx("w-full focus:outline-none")}
        editorClassName="p-6 min-h-[160px] overflow-visible"
        placeholder="Text eingeben..."
        toolbarClassName={cx(
          "p-2 relative rounded-none border border-x-0 border-t-0 border-lightGrey leading-none"
        )}
        toolbar={toolbarOptions}
        toolbarCustomButtons={
          showColumnView
            ? [
                <span className="absolute right-2 top-1/2 -translate-y-1/2 leading-[0]">
                  <Tooltip
                    position="top"
                    text={isExpanded ? "Minimieren" : "Maximieren"}
                  >
                    <Action
                      className="text-base"
                      onClick={() => setIsExpanded()}
                      isPlaintiff={isPlaintiff}
                    >
                      {isExpanded ? <CornersIn /> : <CornersOut />}
                    </Action>
                  </Tooltip>
                </span>,
              ]
            : []
        }
      />
      <div className="flex justify-end gap-2 p-3 pt-2 border-t border-lightGrey">
        <Button
          icon={<X size={20} />}
          onClick={() => onAbort()}
          size="sm"
          bgColor="bg-lightRed"
          textColor="font-bold text-darkRed"
        >
          Abbrechen
        </Button>
        <Button
          icon={<FloppyDisk size={20} />}
          onClick={() => {
            const newHtml = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );

            onSave(newHtml);
          }}
          size="sm"
          bgColor="bg-lightGreen"
          textColor="font-bold text-darkGreen"
        >
          Speichern
        </Button>
      </div>
    </div>
  );
};