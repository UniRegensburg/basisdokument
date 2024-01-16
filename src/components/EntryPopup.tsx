import cx from "classnames";
import { Eye, Warning } from "phosphor-react";
import { Button } from "./Button";
import { useCase, useEntries, useHeaderContext } from "../contexts";
import { getTheme } from "../themes/getTheme";
import { getEntryCode } from "../util/get-entry-code";
import { useEffect } from "react";

interface EntryPopupProps {
  isVisible: boolean;
  saveCurrentEntry: () => void;
}

export const EntryPopup: React.FC<EntryPopupProps> = ({
  isVisible,
  saveCurrentEntry,
}) => {
  const { entryIdOpen, setIsEntryPopupOpen } = useEntries();
  const { selectedTheme } = useHeaderContext();
  const { entries } = useCase();

  useEffect(() => {}, [entryIdOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="opacity-25 fixed inset-0 z-40 bg-black !m-0" />
      <div className="fixed inset-0 flex flex-col justify-center items-center z-50">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                p-8 bg-white rounded-lg content-center shadow-lg space-y-8 w-full max-w-[450px]">
          <div className="space-y-4">
            <div className="rounded-full h-20 w-20 flex items-center justify-center bg-lightRed p-4 m-auto">
              <Warning color="darkRed" size={64} />
            </div>
            <div className="text-center space-y-8">
              <div className="flex flex-col items-center justify-center space-y-8">
                <p className="text-center text-base">
                  {entryIdOpen === "newEntry"
                    ? "Sie erstellen bereits einen neuen Beitrag. Möchten Sie diesen zuerst speichern?"
                    : "Sie bearbeiten gerade bereits einen Beitrag. Möchten Sie diesen ansehen oder speichern?"}
                </p>
                <div
                  className={
                    entryIdOpen === "newEntry"
                      ? "grid grid-cols-2 gap-4"
                      : "grid grid-cols-3 gap-4"
                  }>
                  <Button
                    onClick={() => {
                      setIsEntryPopupOpen(false);
                    }}
                    bgColor="bg-lightRed hover:bg-darkRed"
                    textColor="font-bold text-darkRed hover:text-white">
                    Abbrechen
                  </Button>
                  {entryIdOpen !== ("newEntry" || null) && (
                    <a href={`#${getEntryCode(entries, entryIdOpen!)}`}>
                      <div className="grid align-items-center">
                        <Button
                          icon={
                            <Eye
                              size={20}
                              weight="bold"
                              className="inline"></Eye>
                          }
                          bgColor={cx({
                            "bg-darkGrey hover:bg-mediumGrey": !getEntryCode(
                              entries,
                              entryIdOpen!
                            ),
                            [`bg-${
                              getTheme(selectedTheme)?.secondaryPlaintiff
                            } text-${
                              getTheme(selectedTheme)?.primaryPlaintiff
                            } hover-bg-${
                              getTheme(selectedTheme)?.primaryPlaintiff
                            } hover-text-${
                              getTheme(selectedTheme)?.secondaryPlaintiff
                            }`]:
                              getEntryCode(entries, entryIdOpen!).charAt(0) ===
                              "K",
                            [`bg-${
                              getTheme(selectedTheme)?.secondaryDefendant
                            } text-${
                              getTheme(selectedTheme)?.primaryDefendant
                            } hover-bg-${
                              getTheme(selectedTheme)?.primaryDefendant
                            } hover-text-${
                              getTheme(selectedTheme)?.secondaryDefendant
                            }`]:
                              getEntryCode(entries, entryIdOpen!).charAt(0) ===
                              "B",
                          })}
                          alternativePadding="place-self-center"
                          onClick={() => {
                            setIsEntryPopupOpen(false);
                          }}>
                          {`${getEntryCode(entries, entryIdOpen!)}`}
                        </Button>
                      </div>
                    </a>
                  )}
                  <Button
                    bgColor="bg-lightGreen hover:bg-darkGreen"
                    textColor="text-darkGreen hover:text-white font-bold"
                    onClick={() => {
                      setIsEntryPopupOpen(false);
                      saveCurrentEntry();
                    }}>
                    Speichern
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
