import cx from "classnames";
import { CaretDown, CaretRight, PencilSimple, Plus } from "phosphor-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCase, useHeaderContext, useUser } from "../../contexts";
import { getTheme } from "../../themes/getTheme";
import { UserRole } from "../../types";
import { Button } from "../Button";
import { ErrorPopup } from "../popups/ErrorPopup";
import { Tooltip } from "../Tooltip";
import { MetaDataBody } from "./MetaDataBody";
import { MetaDataForm } from "./MetaDataForm";

interface MetaDataProps {
  owner: UserRole;
}

export const MetaData: React.FC<MetaDataProps> = ({ owner }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const { user } = useUser();
  const { metaData, setMetaData } = useCase();
  const { selectedTheme } = useHeaderContext();

  const isPlaintiff = owner === UserRole.Plaintiff;
  const isJudge = user?.role === UserRole.Judge;
  const canEdit = isJudge || user?.role === owner;
  const rubrumContent = isPlaintiff ? metaData?.plaintiff : metaData?.defendant;

  const toggleMetaData = () => {
    setIsOpen(!isOpen);
    setIsEditing(false);
  };

  const editRubrum = () => {
    setIsEditing(!isEditing);
    setIsOpen(true);
  };

  const updateRubrum = (plainText: string, rawHtml: string) => {
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
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer font-bold text-darkGrey"
          onClick={() => toggleMetaData()}>
          {isOpen ? <CaretDown></CaretDown> : <CaretRight></CaretRight>}
          <span>Rubrum</span>
        </div>
        {canEdit && rubrumContent && (
          <Tooltip text="Rubrum bearbeiten">
            <PencilSimple
              className="cursor-pointer opacity-50"
              onClick={() => editRubrum()}></PencilSimple>
          </Tooltip>
        )}
      </div>
      {isOpen && (
        <div
          className={cx(
            "flex flex-col rounded-lg shadow text-sm overflow-hidden",
            {
              [`bg-${getTheme(selectedTheme)?.secondaryPlaintiff} text-${
                getTheme(selectedTheme)?.primaryPlaintiff
              }`]: isPlaintiff,
              [`bg-${getTheme(selectedTheme)?.secondaryDefendant} text-${
                getTheme(selectedTheme)?.primaryDefendant
              }`]: !isPlaintiff,
            }
          )}>
          {isEditing ? (
            <MetaDataForm
              defaultContent={rubrumContent}
              onAbort={(plainText, rawHtml) => {
                setIsErrorVisible(true);
              }}
              onSave={(plainText, rawHtml) => {
                updateRubrum(plainText, rawHtml);
              }}
            />
          ) : (
            <MetaDataBody isPlaintiff={isPlaintiff}>
              {rubrumContent ? (
                <p dangerouslySetInnerHTML={{ __html: rubrumContent }} />
              ) : (
                <div className="flex flex-col items-center justify-center py-4 max-w-[200px] m-auto text-center space-y-3">
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
                      onClick={() => setIsEditing(true)}
                      icon={<Plus size={18} />}>
                      Hinzufügen
                    </Button>
                  )}
                </div>
              )}
            </MetaDataBody>
          )}
          <ErrorPopup isVisible={isErrorVisible}>
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
                    setIsErrorVisible(false);
                  }}>
                  Abbrechen
                </Button>
                <Button
                  bgColor="bg-lightRed"
                  textColor="text-darkRed font-bold"
                  onClick={() => {
                    setIsErrorVisible(false);
                    setIsEditing(false);
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
