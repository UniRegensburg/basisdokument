import cx from "classnames";
import { CornersIn, CornersOut, FloppyDisk, X } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { UserRole } from "../../types";
import { Button } from "../Button";
import { Action } from "./Action";
import { EntryHeader } from "./EntryHeader";

interface NewEntryProps {
  parentRole: "Kläger" | "Beklagter";
  setIsNewEntryVisible: (isVisible: boolean) => void;
}

export const NewEntry: React.FC<NewEntryProps> = ({
  parentRole,
  setIsNewEntryVisible,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isPlaintiff = parentRole === UserRole.Plaintiff;

  return (
    <div
      className={cx(
        "flex flex-col mt-4  transition-all rounded-lg overflow-hidden bg-white",
        {
          "w-1/2": !isExpanded,
          "w-full": isExpanded,
          "self-start": !isPlaintiff,
          "self-end": isPlaintiff,
        }
      )}
    >
      {/* NewEntry Header */}
      <EntryHeader
        className="rounded-b-none cursor-default"
        isPlaintiff={!isPlaintiff}
      >
        <span className="font-bold">Stefan Schneider</span>
      </EntryHeader>
      {/* Toolbar */}
      <div
        className={cx("border overflow-hidden rounded-b-lg", {
          "border-lightPurple": !isPlaintiff,
          "border-lightPetrol": isPlaintiff,
        })}
      >
        <div className="p-4 flex justify-end">
          <Action
            onClick={() => setIsExpanded(!isExpanded)}
            isPlaintiff={!isPlaintiff}
          >
            {isExpanded ? <CornersIn /> : <CornersOut />}
          </Action>
        </div>
        <textarea
          className={cx(
            "p-6 min-h-[140px] w-full border-y focus:outline-none",
            {
              "border-lightPurple": !isPlaintiff,
              "border-lightPetrol": isPlaintiff,
            }
          )}
          placeholder="Text eingeben"
        />
        <div className="flex justify-end gap-2 p-3 pt-2">
          <Button
            icon={<X size={20} />}
            onClick={() => setIsNewEntryVisible(false)}
            size="sm"
            bgColor="bg-lightRed"
            textColor="font-bold text-darkRed"
          >
            Abbrechen
          </Button>
          <Button
            icon={<FloppyDisk size={20} />}
            onClick={() => setIsNewEntryVisible(false)}
            size="sm"
            bgColor="bg-lightGreen"
            textColor="font-bold text-darkGreen"
          >
            Speichern
          </Button>
        </div>
      </div>
    </div>
  );
};
