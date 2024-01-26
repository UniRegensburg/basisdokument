import { IEntry, UserRole } from "../../types";
import { Entry } from "../entry";
import { useCase, useHeaderContext, useUser } from "../../contexts";
import { useState } from "react";
import { getTheme } from "../../themes/getTheme";
import cx from "classnames";

type AssociationsPopupProps = {
  setIsAssociationsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  entry: IEntry;
  associatedEntry: IEntry;
};

export const AssociationsPopup: React.FC<AssociationsPopupProps> = ({
  entry,
  associatedEntry,
}) => {
  const { user } = useUser();
  const { selectedTheme } = useHeaderContext();
  const { entries } = useCase();

  const [leftEntry] = useState<IEntry | undefined>(
    entries.find((ent) => ent.id === associatedEntry.associatedEntry)
  );
  const [middleEntries] = useState<IEntry[]>(
    entries.filter(
      (ent) => ent.associatedEntry === associatedEntry.id && ent.id !== entry.id
    )
  );
  const [rightEntries] = useState<IEntry[]>(
    entries.filter((ent) => ent.associatedEntry === entry.id)
  );

  return (
    <>
      <div className="flex gap-2 w-full mb-8 justify-evenly max-h-[28vh] overflow-auto shadow-inner p-2">
        <Entry
          shownInPopup={true}
          entry={associatedEntry}
          viewedBy={
            user?.role === UserRole.Plaintiff
              ? UserRole.Defendant
              : UserRole.Plaintiff
          }
        />
        <Entry
          shownInPopup={true}
          entry={entry}
          viewedBy={
            user?.role === UserRole.Plaintiff
              ? UserRole.Defendant
              : UserRole.Plaintiff
          }
        />
      </div>

      <span className="text-xl font-bold text-darkGrey">
        {leftEntry || middleEntries.length > 0 || rightEntries.length > 0
          ? "Weitere"
          : "Keine weiteren"}{" "}
        Bezugnahmen zu diesen Beiträgen
      </span>
      <div className="flex justify-evenly w-full gap-4 max-h-[28vh] overflow-auto">
        {leftEntry && (
          <div className="flex flex-col w-full">
            <div className="p-2 rounded-lg bg-offWhite my-4 font-bold text-darkGrey mr-3">
              <span
                className={cx(
                  "rounded-full px-3 py-1 text-xs font-semibold mr-2",
                  {
                    [`bg-${getTheme(selectedTheme)?.primaryPlaintiff} text-${
                      getTheme(selectedTheme)?.secondaryPlaintiff
                    }`]: associatedEntry.role === UserRole.Plaintiff,
                    [`bg-${getTheme(selectedTheme)?.primaryDefendant} text-${
                      getTheme(selectedTheme)?.secondaryDefendant
                    }`]: associatedEntry.role !== UserRole.Plaintiff,
                  }
                )}>
                {associatedEntry.entryCode}
              </span>
              bezieht sich auf...
            </div>

            <Entry
              entry={leftEntry!}
              shownInPopup={true}
              viewedBy={
                user?.role === UserRole.Plaintiff
                  ? UserRole.Defendant
                  : UserRole.Plaintiff
              }></Entry>
          </div>
        )}

        {middleEntries.length > 0 && (
          <div className="flex flex-col w-full">
            <div className="p-2 rounded-lg bg-offWhite my-4 font-bold text-darkGrey mr-3">
              <span
                className={cx(
                  "rounded-full px-3 py-1 text-xs font-semibold mr-2",
                  {
                    [`bg-${getTheme(selectedTheme)?.primaryPlaintiff} text-${
                      getTheme(selectedTheme)?.secondaryPlaintiff
                    }`]: associatedEntry.role === UserRole.Plaintiff,
                    [`bg-${getTheme(selectedTheme)?.primaryDefendant} text-${
                      getTheme(selectedTheme)?.secondaryDefendant
                    }`]: associatedEntry.role !== UserRole.Plaintiff,
                  }
                )}>
                {associatedEntry.entryCode}
              </span>
              wird außerdem zitiert in...
            </div>

            <div className="flex flex-col gap-5 pb-2 px-2">
              {middleEntries.map((ent) => {
                return (
                  <Entry
                    key={ent.id}
                    entry={ent}
                    shownInPopup={true}
                    viewedBy={
                      user?.role === UserRole.Plaintiff
                        ? UserRole.Defendant
                        : UserRole.Plaintiff
                    }></Entry>
                );
              })}
            </div>
          </div>
        )}

        {rightEntries.length > 0 && (
          <div className="flex flex-col w-full">
            <div className="p-2 rounded-lg bg-offWhite my-4 font-bold text-darkGrey mr-3">
              <span
                className={cx(
                  "rounded-full px-3 py-1 text-xs font-semibold mr-2",
                  {
                    [`bg-${getTheme(selectedTheme)?.primaryPlaintiff} text-${
                      getTheme(selectedTheme)?.secondaryPlaintiff
                    }`]: entry.role === UserRole.Plaintiff,
                    [`bg-${getTheme(selectedTheme)?.primaryDefendant} text-${
                      getTheme(selectedTheme)?.secondaryDefendant
                    }`]: entry.role !== UserRole.Plaintiff,
                  }
                )}>
                {entry.entryCode}
              </span>
              wird zitiert in...
            </div>

            <div className="flex flex-col gap-5 pb-2 px-2">
              {rightEntries.map((ent) => {
                return (
                  <Entry
                    key={ent.id}
                    entry={ent}
                    shownInPopup={true}
                    viewedBy={
                      user?.role === UserRole.Plaintiff
                        ? UserRole.Defendant
                        : UserRole.Plaintiff
                    }></Entry>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
