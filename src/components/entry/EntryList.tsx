import React from "react";
import { SetStateAction, useState } from "react";
import { useBookmarks, useCase } from "../../contexts";
import { useUser } from "../../contexts/UserContext";
import { useView } from "../../contexts/ViewContext";
import { IEntry, UserRole, ViewMode } from "../../types";
import { Entry, NewEntry } from "./";
// import { AddEntryButtons } from "../AddEntryButtons";

// changes from PR#159 are disabled as not working properly (feat: add new entry between exisiting entries)

interface EntryListProps {
  entriesList: IEntry[];
  sectionId: string;
}

export const EntryList: React.FC<EntryListProps> = ({
  entriesList,
  sectionId,
}) => {
  const { user } = useUser();
  const { currentVersion } = useCase();
  const { bookmarks } = useBookmarks();
  const { view } = useView();
  const { entries } = useCase();

  const [associatedsList, setAssociatedsList] = useState<
    {
      entry: IEntry;
      visibilitySetter: React.Dispatch<SetStateAction<boolean>>;
      associatedSelection: string;
    }[]
  >([]);

  const showNewEntry = (
    entry: IEntry,
    setIsNewEntryVisible: React.Dispatch<SetStateAction<boolean>>,
    associatedSelection: string
  ) => {
    if (!associatedsList.find((assoc) => assoc.entry.id === entry.id)) {
      setAssociatedsList((prevAssociateds) => [
        {
          entry: entry,
          visibilitySetter: setIsNewEntryVisible,
          associatedSelection: associatedSelection,
        },
        ...prevAssociateds,
      ]);
    }
  };

  const onNewEntryClosed = (id: string) => {
    setAssociatedsList((prevAssociateds) =>
      prevAssociateds.filter((assoc) => assoc.entry.id !== id)
    );
  };

  return (
    <>
      {view !== ViewMode.SideBySide ? (
        <div className="w-full">
          {entriesList.map((entry, index) => (
            <Entry
              key={entry.id}
              entry={entry}
              isOld={entry.version < currentVersion}
              viewedBy={user!.role}
              isBookmarked={
                bookmarks.find(
                  (bookmark) => bookmark.associatedEntry === entry.id
                )
                  ? true
                  : false
              }
            />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-between w-full h-fit">
            <div className="flex flex-col w-1/2 gap-5">
              {entries
                .filter(
                  (entr) =>
                    entr.sectionId === sectionId &&
                    entr.role === UserRole.Plaintiff
                )
                .map((plaintiffEntry) => (
                  // <React.Fragment key={plaintiffEntry.id}>
                  //   {(user?.role === UserRole.Plaintiff ||
                  //     user?.role === UserRole.Judge) && (
                  //     <AddEntryButtons
                  //       sectionId={plaintiffEntry.sectionId}
                  //       entryBelowId={plaintiffEntry.id}
                  //       lastEntry={false}
                  //       userRole={UserRole.Plaintiff}
                  //     />
                  //   )}
                  //   <Entry
                  //     key={plaintiffEntry.id}
                  //     entry={plaintiffEntry}
                  //     isOld={plaintiffEntry.version < currentVersion}
                  //     viewedBy={user!.role}
                  //     isBookmarked={
                  //       bookmarks.find(
                  //         (bookmark) =>
                  //           bookmark.associatedEntry === plaintiffEntry.id
                  //       )
                  //         ? true
                  //         : false
                  //     }
                  //     setAssociatedEntryInProgress={showNewEntry}
                  //   />
                  // </React.Fragment>

                  <Entry
                    key={plaintiffEntry.id}
                    entry={plaintiffEntry}
                    isOld={plaintiffEntry.version < currentVersion}
                    viewedBy={user!.role}
                    isBookmarked={
                      bookmarks.find(
                        (bookmark) =>
                          bookmark.associatedEntry === plaintiffEntry.id
                      )
                        ? true
                        : false
                    }
                    setAssociatedEntryInProgress={showNewEntry}
                  />
                ))}
              {/* {(user?.role === UserRole.Plaintiff ||
                user?.role === UserRole.Judge) && (
                <AddEntryButtons
                  sectionId={sectionId}
                  entryBelowId={undefined}
                  lastEntry={false}
                  userRole={UserRole.Plaintiff}
                />
              )} */}
            </div>
            <div className="flex flex-col w-1/2 gap-5">
              {entries
                .filter(
                  (entr) =>
                    entr.sectionId === sectionId &&
                    entr.role === UserRole.Defendant
                )
                .map((defendantEntry) => (
                  // <React.Fragment key={defendantEntry.id}>
                  //   {(user?.role === UserRole.Defendant ||
                  //     user?.role === UserRole.Judge) && (
                  //     <div className="pl-3">
                  //       <AddEntryButtons
                  //         sectionId={defendantEntry.sectionId}
                  //         entryBelowId={defendantEntry.id}
                  //         lastEntry={false}
                  //         userRole={UserRole.Defendant}
                  //       />
                  //     </div>
                  //   )}
                  //   <Entry
                  //     key={defendantEntry.id}
                  //     entry={defendantEntry}
                  //     isOld={defendantEntry.version < currentVersion}
                  //     viewedBy={user!.role}
                  //     isBookmarked={
                  //       bookmarks.find(
                  //         (bookmark) =>
                  //           bookmark.associatedEntry === defendantEntry.id
                  //       )
                  //         ? true
                  //         : false
                  //     }
                  //     setAssociatedEntryInProgress={showNewEntry}
                  //   />
                  // </React.Fragment>

                  <Entry
                    key={defendantEntry.id}
                    entry={defendantEntry}
                    isOld={defendantEntry.version < currentVersion}
                    viewedBy={user!.role}
                    isBookmarked={
                      bookmarks.find(
                        (bookmark) =>
                          bookmark.associatedEntry === defendantEntry.id
                      )
                        ? true
                        : false
                    }
                    setAssociatedEntryInProgress={showNewEntry}
                  />
                ))}
              {/* {(user?.role === UserRole.Defendant ||
                user?.role === UserRole.Judge) && (
                <div className="pl-3">
                  <AddEntryButtons
                    sectionId={sectionId}
                    entryBelowId={undefined}
                    lastEntry={true}
                    userRole={UserRole.Defendant}
                  />
                </div>
              )} */}
            </div>
          </div>

          {/* For new entries created via "Bezug nehmen" */}
          <div id={`${sectionId}-scroll`} className="align-content-end w-full">
            {associatedsList.map((elem) => (
              <NewEntry
                key={elem.entry.id}
                roleForNewEntry={
                  elem.entry.role === UserRole.Defendant
                    ? UserRole.Plaintiff
                    : UserRole.Defendant
                }
                sectionId={elem.entry.sectionId}
                associatedEntry={elem.entry.id}
                setIsNewEntryVisible={elem.visibilitySetter}
                onClose={onNewEntryClosed}
                associatedSelection={elem.associatedSelection}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
