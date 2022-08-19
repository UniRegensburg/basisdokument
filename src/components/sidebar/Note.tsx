import { DotsThree, Eye, PencilSimple, Trash } from "phosphor-react";
import { Button } from "../Button";
import cx from "classnames";
import React, { useState } from "react";

export interface NoteProps {
  id: string;
  title: string;
  content?: string;
  author: string;
  timestamp: Date;
  referenceTo?: string;
}

export const Note: React.FC<NoteProps> = (note: NoteProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const showReference = (e: React.MouseEvent) => {
    //TODO
  };

  const editNote = (e: React.MouseEvent) => {
    //TODO
  };

  const deleteNote = (e: React.MouseEvent) => {
    //TODO
  };

  return (
    <div>
      <div className="flex flex-col bg-offWhite mt-4 rounded-xl text-darkGrey text-xs font-medium">
        {note.referenceTo && (
          <div
            className="flex gap-1 mt-1.5 mr-1.5 px-1.5 py-0.5 self-end w-fit
              bg-darkGrey hover:bg-mediumGrey text-lightGrey text-[10px] font-semibold rounded-xl"
            onClick={showReference}
          >
            <Eye size={16} weight="bold" className="inline"></Eye>
            {`${note.referenceTo}`}
          </div>
        )}

        <div className={cx("mx-3", { "mt-3": !note.referenceTo })}>
          <div className="mb-2 text-sm font-bold">{note.title}</div>
          <div className="mb-2">{note.content}</div>

          <div className="flex justify-between items-center mb-3">
            <div className="">
              <div className="font-bold">{note.author}</div>
              <div className="opacity-40">
                {`${String(note.timestamp.getDate()).padStart(2, "0")}.
            ${String(note.timestamp.getMonth()).padStart(2, "0")}.
            ${note.timestamp.getFullYear()}`}
              </div>
            </div>

            <div
              className="self-end relative"
              onBlur={() => setIsMenuOpen(false)}
            >
              <Button
                key="createNote"
                bgColor={
                  isMenuOpen ? "bg-lightGrey" : "bg-offWhite hover:bg-lightGrey"
                }
                size="sm"
                textColor="text-darkGrey"
                hasText={false}
                alternativePadding="p-1"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
                icon={<DotsThree size={16} weight="bold" />}
              ></Button>{" "}
              {isMenuOpen ? (
                <ul className="absolute right-7 top-0 p-2 bg-lightGrey text-darkGrey rounded-xl w-[150px] shadow-lg z-50 font-medium">
                  <li
                    tabIndex={0}
                    onClick={editNote}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-offWhite focus:bg-offWhite focus:outline-none"
                  >
                    <PencilSimple size={16} />
                    Bearbeiten
                  </li>
                  <li
                    tabIndex={0}
                    onClick={deleteNote}
                    className="flex items-center gap-2 p-2 rounded-lg text-vibrantRed hover:bg-offWhite focus:bg-offWhite focus:outline-none"
                  >
                    <Trash size={16} />
                    Löschen
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
