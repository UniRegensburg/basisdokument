import { X } from "phosphor-react";
import { IEntry, UserRole } from "../types";
import { Entry } from "./entry";
import { useCase, useHeaderContext, useUser } from "../contexts";
import { useRef, useState } from "react";
import { useOutsideClick } from "../hooks/use-outside-click";
import { getTheme } from "../themes/getTheme";
import cx from "classnames";

type AssociationsPopupProps = {
  setIsAssociationsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  entry: IEntry;
  associatedEntry: IEntry;
};

export const AssociationsPopup: React.FC<AssociationsPopupProps> = ({
  setIsAssociationsPopupOpen,
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

  const popupRef = useRef(null);
  useOutsideClick(popupRef, () => setIsAssociationsPopupOpen(false));

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="my-6 mx-auto w-[80vw] max-h-[90vh] overflow-auto">
          {/*content*/}
          <div
            ref={popupRef}
            className="p-6 border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-lg mb-4">
              <span className="text-xl font-bold text-darkGrey">{`Beitrag ${entry.entryCode} bezieht sich auf Beitrag ${associatedEntry.entryCode}`}</span>
              <div
                onClick={() => {
                  setIsAssociationsPopupOpen(false);
                }}
                className="text-darkGrey bg-offWhite p-1 rounded-md hover:bg-lightGrey">
                <X size={24} />
              </div>
            </div>

            {/*body main*/}
            <div className="flex gap-2 w-full mb-8 justify-evenly">
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

            {/*body further*/}
            <span className="text-xl font-bold text-darkGrey">
              {leftEntry || middleEntries.length > 0 || rightEntries.length > 0
                ? "Weitere"
                : "Keine weiteren"}{" "}
              Bezugnahmen zu diesen Beiträgen
            </span>
            <div className="flex justify-evenly w-full gap-4">
              {leftEntry && (
                <div className="flex flex-col w-full">
                  <div className="p-2 rounded-lg bg-offWhite my-4 font-bold text-darkGrey">
                    <span
                      className={cx(
                        "rounded-full px-3 py-1 text-xs font-semibold mr-2",
                        {
                          [`bg-${
                            getTheme(selectedTheme)?.primaryPlaintiff
                          } text-${
                            getTheme(selectedTheme)?.secondaryPlaintiff
                          }`]: associatedEntry.role === UserRole.Plaintiff,
                          [`bg-${
                            getTheme(selectedTheme)?.primaryDefendant
                          } text-${
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
                  <div className="p-2 rounded-lg bg-offWhite my-4 font-bold text-darkGrey">
                    <span
                      className={cx(
                        "rounded-full px-3 py-1 text-xs font-semibold mr-2",
                        {
                          [`bg-${
                            getTheme(selectedTheme)?.primaryPlaintiff
                          } text-${
                            getTheme(selectedTheme)?.secondaryPlaintiff
                          }`]: associatedEntry.role === UserRole.Plaintiff,
                          [`bg-${
                            getTheme(selectedTheme)?.primaryDefendant
                          } text-${
                            getTheme(selectedTheme)?.secondaryDefendant
                          }`]: associatedEntry.role !== UserRole.Plaintiff,
                        }
                      )}>
                      {associatedEntry.entryCode}
                    </span>
                    wird außerdem zitiert in...
                  </div>

                  <div className="flex flex-col gap-5">
                    {middleEntries.map((ent) => {
                      return (
                        <Entry
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
                  <div className="p-2 rounded-lg bg-offWhite my-4 font-bold text-darkGrey">
                    <span
                      className={cx(
                        "rounded-full px-3 py-1 text-xs font-semibold mr-2",
                        {
                          [`bg-${
                            getTheme(selectedTheme)?.primaryPlaintiff
                          } text-${
                            getTheme(selectedTheme)?.secondaryPlaintiff
                          }`]: entry.role === UserRole.Plaintiff,
                          [`bg-${
                            getTheme(selectedTheme)?.primaryDefendant
                          } text-${
                            getTheme(selectedTheme)?.secondaryDefendant
                          }`]: entry.role !== UserRole.Plaintiff,
                        }
                      )}>
                      {entry.entryCode}
                    </span>
                    wird zitiert in...
                  </div>

                  <div className="flex flex-col gap-5">
                    {rightEntries.map((ent) => {
                      return (
                        <Entry
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
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
