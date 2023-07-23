import cx from "classnames";
import {
  CaretDown,
  CaretUp,
  DotsThree,
  Pencil,
  PencilSimple,
  Plus,
} from "phosphor-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useCase, useHeaderContext, useUser } from "../../contexts";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { getTheme } from "../../themes/getTheme";
import { UserRole } from "../../types";
import { Button } from "../Button";
import { Action } from "../entry";
import { ErrorPopup } from "../ErrorPopup";
import { Tooltip } from "../Tooltip";
import { MetaDataBody } from "./MetaDataBody";
import { MetaDataForm } from "./MetaDataForm";
import { OverviewBody } from "./OverviewBody";
import { OverviewForm } from "./OverviewForm";

interface MetaDataProps {
  owner: UserRole;
}

export const MetaData: React.FC<MetaDataProps> = ({ owner }) => {
  const [isMetaDataEditing, setIsMetaDataEditing] = useState<boolean>(false);
  const [isOverviewEditing, setIsOverviewEditing] = useState<boolean>(false);
  const [isMetaDataEditErrorVisible, setIsMetaDataEditErrorVisible] =
    useState<boolean>(false);
  const [isOverviewEditErrorVisible, setIsOverviewEditErrorVisible] =
    useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isBodyOpen, setIsBodyOpen] = useState<boolean>(true);
  const { user } = useUser();
  const { metaData, setMetaData, overview, setOverview } = useCase();
  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => {
    setIsMenuOpen(false);
  });

  const { selectedTheme } = useHeaderContext();

  const isPlaintiff = owner === UserRole.Plaintiff;
  const isJudge = user?.role === UserRole.Judge;
  const canEdit = isJudge || user?.role === owner;
  const contentMetaData = isPlaintiff
    ? metaData?.plaintiff
    : metaData?.defendant;
  const contentOverview = isPlaintiff
    ? overview?.plaintiff
    : overview?.defendant;

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMetaData = () => {
    setIsBodyOpen(!isBodyOpen);
    setIsMetaDataEditing(false);
  };

  const editMetaData = () => {
    setIsMetaDataEditing(!isMetaDataEditing);
    setIsBodyOpen(true);
    setIsMenuOpen(false);
  };

  const editOverview = () => {
    setIsOverviewEditing(!isMetaDataEditing);
    setIsBodyOpen(true);
    setIsMenuOpen(false);
  };

  const updateMetaData = (plainText: string, rawHtml: string) => {
    if (plainText.length === 0) {
      toast("Bitte geben Sie einen Text ein.", { type: "error" });
      return;
    }

    setMetaData((prevState) => {
      const newState = { ...prevState };
      if (isPlaintiff) {
        newState.plaintiff = rawHtml;
      } else {
        newState.defendant = rawHtml;
      }
      return newState;
    });
    setIsMetaDataEditing(false);
  };

  const updateOverview = (plainText: string, rawHtml: string) => {
    if (plainText.length === 0) {
      toast("Bitte geben Sie einen Text ein.", { type: "error" });
      return;
    }

    setOverview((prevState) => {
      const newState = { ...prevState };
      if (isPlaintiff) {
        newState.plaintiff = rawHtml;
      } else {
        newState.defendant = rawHtml;
      }
      return newState;
    });
    setIsOverviewEditing(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex gap-2">
        <Button
          position="end"
          bgColor={cx({
            [`bg-${getTheme(selectedTheme)?.secondaryPlaintiff} hover-bg-${
              getTheme(selectedTheme)?.primaryPlaintiff
            }`]: isPlaintiff,
            [`bg-${getTheme(selectedTheme)?.secondaryDefendant} hover-bg-${
              getTheme(selectedTheme)?.primaryDefendant
            }`]: !isPlaintiff,
          })}
          textColor={cx("font-bold text-sm uppercase tracking-wider", {
            [`text-${getTheme(selectedTheme)?.primaryPlaintiff} hover-text-${
              getTheme(selectedTheme)?.secondaryPlaintiff
            }`]: isPlaintiff,
            [`text-${getTheme(selectedTheme)?.primaryDefendant} hover-text-${
              getTheme(selectedTheme)?.secondaryDefendant
            }`]: !isPlaintiff,
          })}
          size="sm"
          onClick={toggleMetaData}
          icon={
            isBodyOpen ? (
              <CaretUp size={14} weight="bold" />
            ) : (
              <CaretDown size={14} weight="bold" />
            )
          }>
          {owner}
        </Button>
        {canEdit && (
          <div ref={menuRef} className="flex relative space-y-1 cursor-pointer">
            <Tooltip text="Mehr Optionen">
              <Action
                className={cx("relative", {
                  [`bg-${getTheme(selectedTheme)?.primaryPlaintiff} text-${
                    getTheme(selectedTheme)?.secondaryPlaintiff
                  }`]: isPlaintiff && isMenuOpen,
                  [`bg-${getTheme(selectedTheme)?.primaryDefendant} text-${
                    getTheme(selectedTheme)?.secondaryDefendant
                  }`]: !isPlaintiff && isMenuOpen,
                  [`hover-text-${getTheme(selectedTheme)?.secondaryPlaintiff}`]:
                    isPlaintiff,
                  [`hover-text-${getTheme(selectedTheme)?.secondaryDefendant}`]:
                    !isPlaintiff,
                })}
                onClick={toggleMenu}
                isPlaintiff={isPlaintiff}>
                <DotsThree size={20} />
              </Action>
            </Tooltip>
            {isMenuOpen ? (
              <ul className="absolute -left-8 top-full p-2 bg-white text-darkGrey rounded-xl min-w-[200px] shadow-lg z-50 text-sm">
                <>
                  <li
                    tabIndex={0}
                    onClick={editMetaData}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-offWhite focus:bg-offWhite focus:outline-none">
                    <PencilSimple size={20} />
                    Rubrum bearbeiten
                  </li>
                  <li
                    tabIndex={0}
                    onClick={editOverview}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-offWhite focus:bg-offWhite focus:outline-none">
                    <PencilSimple size={20} />
                    Überblick bearbeiten
                  </li>
                </>
              </ul>
            ) : null}
          </div>
        )}
      </div>
      {isBodyOpen && (
        <div className="flex flex-col text-sm overflow-hidden">
          {isMetaDataEditing ? (
            <MetaDataForm
              defaultContent={contentMetaData}
              onAbort={(plainText, rawHtml) => {
                setIsMetaDataEditErrorVisible(true);
              }}
              onSave={(plainText, rawHtml) => {
                updateMetaData(plainText, rawHtml);
              }}
            />
          ) : (
            // meta data
            <MetaDataBody
              isPlaintiff={isPlaintiff}
              selectedTheme={selectedTheme}>
              <div className="border-b-[1px] border-grey py-1 mb-2">
                <b>Rubrum</b>
              </div>
              {contentMetaData ? (
                <p dangerouslySetInnerHTML={{ __html: contentMetaData }} />
              ) : (
                <div
                  className={cx(
                    "flex flex-col rounded-lg shadow items-center justify-center py-4 w-full m-auto text-center space-y-3",
                    {
                      [`bg-${
                        getTheme(selectedTheme)?.secondaryPlaintiff
                      } text-${getTheme(selectedTheme)?.primaryPlaintiff}`]:
                        isPlaintiff,
                      [`bg-${
                        getTheme(selectedTheme)?.secondaryDefendant
                      } text-${getTheme(selectedTheme)?.primaryDefendant}`]:
                        !isPlaintiff,
                    }
                  )}>
                  <p className="text-sm">
                    Bisher wurde noch kein Rubrum hinterlegt.
                  </p>
                  {canEdit && (
                    <Button
                      size="sm"
                      bgColor={cx({
                        [`bg-${
                          getTheme(selectedTheme)?.primaryPlaintiff
                        } hover-bg-25-${
                          getTheme(selectedTheme)?.primaryPlaintiff
                        }`]: isPlaintiff,
                        [`bg-${
                          getTheme(selectedTheme)?.primaryDefendant
                        } hover-bg-25-${
                          getTheme(selectedTheme)?.primaryDefendant
                        }`]: !isPlaintiff,
                      })}
                      textColor={cx({
                        [`text-${
                          getTheme(selectedTheme)?.secondaryPlaintiff
                        } hover-text-${
                          getTheme(selectedTheme)?.primaryPlaintiff
                        }`]: isPlaintiff,
                        [`text-${
                          getTheme(selectedTheme)?.secondaryDefendant
                        } hover-text-${
                          getTheme(selectedTheme)?.primaryDefendant
                        }`]: !isPlaintiff,
                      })}
                      onClick={() => setIsMetaDataEditing(true)}
                      icon={<Plus size={18} />}>
                      Hinzufügen
                    </Button>
                  )}
                </div>
              )}
            </MetaDataBody>
          )}
          <ErrorPopup isVisible={isMetaDataEditErrorVisible}>
            <div className="flex flex-col items-center justify-center space-y-8">
              <p className="text-center text-base">
                Sind Sie sicher, dass Sie Ihre Änderungen verwerfen und somit{" "}
                <strong>nicht</strong> speichern möchten?
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  bgColor="bg-lightGrey"
                  textColor="text-mediumGrey font-bold"
                  onClick={() => {
                    setIsMetaDataEditErrorVisible(false);
                  }}>
                  Abbrechen
                </Button>
                <Button
                  bgColor="bg-lightRed"
                  textColor="text-darkRed font-bold"
                  onClick={() => {
                    setIsMetaDataEditErrorVisible(false);
                    setIsMetaDataEditing(false);
                  }}>
                  Verwerfen
                </Button>
              </div>
            </div>
          </ErrorPopup>
        </div>
      )}
      {isBodyOpen && (
        // overview
        <div className="flex flex-col text-sm overflow-hidden">
          {isOverviewEditing ? (
            <OverviewForm
              defaultContent={contentOverview}
              onAbort={(plainText, rawHtml) => {
                setIsOverviewEditErrorVisible(true);
              }}
              onSave={(plainText, rawHtml) => {
                updateOverview(plainText, rawHtml);
              }}
            />
          ) : (
            <OverviewBody
              isPlaintiff={isPlaintiff}
              selectedTheme={selectedTheme}>
              <div className="border-b-[1px] border-grey py-1 mb-2">
                <b>Überblick</b>
              </div>
              {contentOverview ? (
                <p dangerouslySetInnerHTML={{ __html: contentOverview }} />
              ) : (
                <div
                  className={cx(
                    "flex flex-col rounded-lg shadow items-center justify-center py-4 w-full m-auto text-center space-y-3",
                    {
                      [`bg-${
                        getTheme(selectedTheme)?.secondaryPlaintiff
                      } text-${getTheme(selectedTheme)?.primaryPlaintiff}`]:
                        isPlaintiff,
                      [`bg-${
                        getTheme(selectedTheme)?.secondaryDefendant
                      } text-${getTheme(selectedTheme)?.primaryDefendant}`]:
                        !isPlaintiff,
                    }
                  )}>
                  <p className="text-sm">
                    Bisher wurde noch kein Überblick hinterlegt.
                  </p>
                  {canEdit && (
                    <Button
                      size="sm"
                      bgColor={cx({
                        [`bg-${
                          getTheme(selectedTheme)?.primaryPlaintiff
                        } hover-bg-25-${
                          getTheme(selectedTheme)?.primaryPlaintiff
                        }`]: isPlaintiff,
                        [`bg-${
                          getTheme(selectedTheme)?.primaryDefendant
                        } hover-bg-25-${
                          getTheme(selectedTheme)?.primaryDefendant
                        }`]: !isPlaintiff,
                      })}
                      textColor={cx({
                        [`text-${
                          getTheme(selectedTheme)?.secondaryPlaintiff
                        } hover-text-${
                          getTheme(selectedTheme)?.primaryPlaintiff
                        }`]: isPlaintiff,
                        [`text-${
                          getTheme(selectedTheme)?.secondaryDefendant
                        } hover-text-${
                          getTheme(selectedTheme)?.primaryDefendant
                        }`]: !isPlaintiff,
                      })}
                      onClick={() => setIsOverviewEditing(true)}
                      icon={<Plus size={18} />}>
                      Hinzufügen
                    </Button>
                  )}
                </div>
              )}
            </OverviewBody>
          )}
          <ErrorPopup isVisible={isOverviewEditErrorVisible}>
            <div className="flex flex-col items-center justify-center space-y-8">
              <p className="text-center text-base">
                Sind Sie sicher, dass Sie Ihre Änderungen verwerfen und somit{" "}
                <strong>nicht</strong> speichern möchten?
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  bgColor="bg-lightGrey"
                  textColor="text-mediumGrey font-bold"
                  onClick={() => {
                    setIsOverviewEditErrorVisible(false);
                  }}>
                  Abbrechen
                </Button>
                <Button
                  bgColor="bg-lightRed"
                  textColor="text-darkRed font-bold"
                  onClick={() => {
                    setIsOverviewEditErrorVisible(false);
                    setIsOverviewEditing(false);
                  }}>
                  Verwerfen
                </Button>
              </div>
            </div>
          </ErrorPopup>
        </div>
      )}
    </div>
  );
};
