import cx from "classnames";
import { ArrowBendDownRight, PencilSimple } from "phosphor-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  useCase,
  useEntries,
  useHeaderContext,
  useSection,
} from "../../contexts";
import { useUser } from "../../contexts/UserContext";
import { useView } from "../../contexts/ViewContext";
import { getTheme } from "../../themes/getTheme";
import {
  IEntry,
  IEvidence,
  IndividualEntrySortingEntry,
  UserRole,
  ViewMode,
} from "../../types";
import { getEntryCode } from "../../util/get-entry-code";
import { getOriginalSortingPosition } from "../../util/get-original-sorting-position";
import { Button } from "../Button";
import { ErrorPopup } from "../popups/ErrorPopup";
import { Tooltip } from "../Tooltip";
import { EntryForm } from "./EntryForm";
import { EntryHeader } from "./EntryHeader";
import { getEvidenceIds } from "../../util/get-evidences";
import { useEvidence } from "../../contexts/EvidenceContext";

interface NewEntryProps {
  roleForNewEntry: UserRole.Plaintiff | UserRole.Defendant;
  setIsNewEntryVisible: Dispatch<SetStateAction<boolean>>;
  sectionId: string;
  associatedEntry?: string;
  onClose?: (id: string) => void;
  associatedSelection?: string;
  entryBelowId?: string;
  lastEntry?: boolean;
}

export const NewEntry: React.FC<NewEntryProps> = ({
  roleForNewEntry,
  setIsNewEntryVisible,
  sectionId,
  associatedEntry,
  onClose,
  associatedSelection,
  entryBelowId,
  lastEntry,
}) => {
  const { selectedTheme } = useHeaderContext();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const [authorName, setAuthorName] = useState<string>("");
  const { user } = useUser();
  const { view } = useView();
  const { currentVersion, entries, setEntries, setIndividualEntrySorting } =
    useCase();
  const { sectionList } = useSection();
  const { updateEvidenceList, setPlaintiffFileVolume, setDefendantFileVolume } =
    useEvidence();
  const { setEntryIdOpen, checkAssociatedText } = useEntries();

  const isPlaintiff = roleForNewEntry === UserRole.Plaintiff;
  const entryCodePrefix = isPlaintiff ? "K" : "B";
  const sectionNumber = getOriginalSortingPosition(sectionList, sectionId);

  const createEntry = (
    plainText: string,
    rawHtml: string,
    evidences: IEvidence[],
    caveatOfProof: boolean,
    associatedSelection?: string
  ) => {
    if (plainText.length === 0) {
      toast("Bitte geben sie einen Text ein.", { type: "error" });
      return;
    }

    const setNewEntryCodes = (sectionId: string, fromId: string) => {
      setEntries(
        entries.map((entr) => {
          if (sectionId === entr.sectionId) {
            let splitId = entr.entryCode.split("-");
            if (parseInt(splitId[2]) >= parseInt(fromId)) {
              const newNum = parseInt(splitId[2]) + 1;
              entr.entryCode =
                splitId[0] + "-" + splitId[1] + "-" + newNum.toString();
            }
          }
          return entr;
        })
      );
    };

    const getNewBetweenEntryCount = (idBelow: string) => {
      let newEntryCode;
      let beforeEntryCode = getEntryCode(entries, idBelow);
      let idSplits = beforeEntryCode.split("-");
      if (lastEntry) {
        newEntryCode =
          entries.filter((entry) => entry.sectionId === sectionId).length + 1;
      } else {
        setNewEntryCodes(sectionId, idSplits[2]);
        newEntryCode = idSplits[2];
      }
      return newEntryCode;
    };

    const newEntryCount: string | number = entryBelowId
      ? getNewBetweenEntryCount(entryBelowId)
      : entries.filter((entry) => entry.sectionId === sectionId).length + 1;

    const newEvidenceIds = getEvidenceIds(evidences);

    const entry: IEntry = {
      id: uuidv4(),
      caveatOfProof: caveatOfProof,
      entryCode: `${entryCodePrefix}-${sectionNumber}-${newEntryCount}`,
      author: authorName || user!.name,
      role: roleForNewEntry,
      sectionId,
      text: rawHtml,
      version: currentVersion,
      evidenceIds: newEvidenceIds,
    };

    updateEvidenceList(evidences, entries);

    if (associatedEntry) {
      entry.associatedEntry = associatedEntry;
      if (
        associatedSelection !== "" &&
        checkAssociatedText(associatedSelection!, associatedEntry)
      ) {
        entry.associatedEntryText = associatedSelection;
      }
    }

    const individualEntrySortingEntry: IndividualEntrySortingEntry = {
      rowId: uuidv4(),
      columns: [[], []],
    };
    const columnIndex = isPlaintiff ? 0 : 1;
    individualEntrySortingEntry.columns[columnIndex].push(entry.id);

    // TODO: where to add new entries?

    // if (associatedEntry) {
    //   const indexOdd = entries
    //     .filter((en) => en.role !== roleForNewEntry)
    //     .findIndex((en) => en.id === associatedEntry);

    //   const entryToOrderIn = entries.filter(
    //     (en) => en.role === roleForNewEntry
    //   )[indexOdd];

    //   const index =
    //     roleForNewEntry === UserRole.Plaintiff
    //       ? entries.indexOf(entryToOrderIn) + 1
    //       : entries.indexOf(entryToOrderIn);
    //   setEntries((prevEntries) => [
    //     ...prevEntries.slice(0, index),
    //     entry,
    //     ...prevEntries.slice(index),
    //   ]);
    // } else {
    //   setEntries((prevEntries) => [...prevEntries, entry]);
    // }

    if (!lastEntry) {
      setEntries((prevEntries) => {
        const newSplit = [...prevEntries];
        const newInsertIndex = newSplit.findIndex((e) => e.id === entryBelowId);
        newSplit.splice(newInsertIndex, 0, entry);
        return newSplit;
      });
    } else {
      setEntries((prevEntries) => [...prevEntries, entry]);
    }
    // END OF TODO

    setIndividualEntrySorting((prevEntrySorting) => {
      const newEntrySorting = { ...prevEntrySorting };
      newEntrySorting[sectionId]?.push(individualEntrySortingEntry);
      return newEntrySorting;
    });

    setIsNewEntryVisible(false);
    setIsExpanded(false);
    setEntryIdOpen(null);
    if (associatedEntry && onClose) onClose(associatedEntry);
  };

  const closeNewEntryForm = (plainText: string, _: string) => {
    if (plainText.length !== 0) {
      setIsErrorVisible(true);
      return;
    }
    setIsNewEntryVisible(false);
    setIsExpanded(false);
    setEntryIdOpen(null);
    if (associatedEntry && onClose) onClose(associatedEntry);
  };

  useEffect(() => {
    setAuthorName(user!.name);
  }, [user]);

  return (
    <>
      <div
        className={cx("flex flex-col mt-4 transition-all rounded-lg ", {
          "w-[calc(50%_-_12px)]": !isExpanded && view !== ViewMode.SideBySide,
          "w-full": isExpanded || view !== ViewMode.SideBySide,
          "self-start": isPlaintiff,
          "self-end": !isPlaintiff,
        })}>
        {associatedEntry && (
          <a
            href={`#${getEntryCode(entries, associatedEntry)}`}
            className={cx(
              "flex flex-row gap-1 self-center text-xs font-normal rounded-t-md p-1 w-fit h-50 -mt-50 hover:text-white",
              {
                [`mr-0 ml-auto bg-${
                  getTheme(selectedTheme)?.primaryPlaintiff
                } text-${getTheme(selectedTheme)?.secondaryPlaintiff}`]:
                  roleForNewEntry === UserRole.Defendant,
                [`ml-0 mr-auto bg-${
                  getTheme(selectedTheme)?.primaryDefendant
                } text-${getTheme(selectedTheme)?.secondaryDefendant}`]:
                  roleForNewEntry === UserRole.Plaintiff,
              }
            )}
            onClick={(e) => e.stopPropagation()}>
            <ArrowBendDownRight size={14}></ArrowBendDownRight>
            {`Bezieht sich auf ${getEntryCode(entries, associatedEntry)}`}
          </a>
        )}
        <div
          className={cx("", {
            [`pr-1 rounded-l-xl rounded-br-lg bg-${
              getTheme(selectedTheme)?.primaryPlaintiff
            }`]: roleForNewEntry === UserRole.Defendant && associatedEntry,
            [`pl-1 rounded-r-xl rounded-bl-lg bg-${
              getTheme(selectedTheme)?.primaryDefendant
            }`]: roleForNewEntry === UserRole.Plaintiff && associatedEntry,
          })}>
          {/* NewEntry Header */}
          <EntryHeader
            className="rounded-b-none cursor-default shadow"
            isPlaintiff={isPlaintiff}>
            <EditText
              inputClassName={cx(
                "font-bold h-[28px] p-0 my-0 focus:outline-none bg-transparent",
                {
                  [`border-${getTheme(selectedTheme)?.primaryPlaintiff}`]:
                    isPlaintiff,
                  [`border-${getTheme(selectedTheme)?.primaryDefendant}`]:
                    !isPlaintiff,
                }
              )}
              className={cx("font-bold p-0 my-0 flex items-center mr-2", {
                [`text-${getTheme(selectedTheme)?.primaryPlaintiff}`]:
                  isPlaintiff,
                [`text-${getTheme(selectedTheme)?.primaryDefendant}`]:
                  !isPlaintiff,
              })}
              value={authorName}
              onChange={(e) => {
                setAuthorName(e.target.value);
              }}
              showEditButton
              editButtonContent={
                <Tooltip asChild text="Name bearbeiten">
                  <PencilSimple />
                </Tooltip>
              }
              editButtonProps={{
                className: cx("bg-transparent flex items-center"),
              }}
            />
          </EntryHeader>
          {/* Associated Selection */}
          {associatedSelection && (
            <div
              className={cx("p-3 border border-t-0 bg-white text-zinc-600", {
                [`border-${getTheme(selectedTheme)?.secondaryPlaintiff}`]:
                  isPlaintiff,
                [`border-${getTheme(selectedTheme)?.secondaryDefendant}`]:
                  !isPlaintiff,
              })}>
              {"\u00bb" + associatedSelection + "\u00ab"}
            </div>
          )}
          {/* Toolbar */}
          <EntryForm
            caveatOfProof={false}
            isPlaintiff={isPlaintiff}
            isExpanded={isExpanded}
            setIsExpanded={() => {
              setIsExpanded(!isExpanded);
            }}
            onAbort={(plainText, rawHtml) => {
              closeNewEntryForm(plainText, rawHtml);
              setEntryIdOpen(null);
            }}
            onSave={(
              plainText,
              rawHtml,
              evidences,
              caveatOfProof,
              plaintiffFileVolume,
              defendantFileVolume
            ) => {
              createEntry(
                plainText,
                rawHtml,
                evidences,
                caveatOfProof,
                associatedSelection
              );
              setPlaintiffFileVolume(plaintiffFileVolume);
              setDefendantFileVolume(defendantFileVolume);
            }}
            evidences={[]}
          />
        </div>
      </div>
      <ErrorPopup isVisible={isErrorVisible}>
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-center text-base">
            Sind Sie sicher, dass Sie den Eintrag verwerfen und somit{" "}
            <strong>nicht</strong> speichern möchten?
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              bgColor="bg-lightGrey"
              textColor="text-mediumGrey font-bold"
              onClick={() => {
                setIsErrorVisible(false);
              }}>
              Abbrechen
            </Button>
            <Button
              bgColor="bg-lightRed"
              textColor="text-darkRed font-bold"
              onClick={() => {
                setIsErrorVisible(false);
                setIsNewEntryVisible(false);
                setEntryIdOpen(null);
              }}>
              Verwerfen
            </Button>
          </div>
        </div>
      </ErrorPopup>
    </>
  );
};
