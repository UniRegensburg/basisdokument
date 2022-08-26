import { CaretDown, CaretRight, Plus } from "phosphor-react";
import { useState } from "react";
import { useHints } from "../../contexts/HintContext";
import { Button } from "../Button";
import { JudgeHintPopup } from "../JudgeHintPopup";
import { Hint } from "./Hint";

//TODO: remove this, this is for testing
const isJudge = true;

export const SidebarHints = () => {
  const [hintsWithReferenceOpen, setHintsWithReferenceOpen] =
    useState<boolean>(true);
  const [hintsWithoutReferenceOpen, setHintsWithoutReferenceOpen] =
    useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);

  const { hints } = useHints();

  return (
    <div className="flex flex-col gap-3 flex-1 overflow-hidden">
      <div className="flex justify-between items-center pt-4 px-4">
        <div className="font-bold text-darkGrey text-lg">
          Hinweise (nach §139 ZPO)
        </div>
        {isJudge && (
          <Button
            key="createHint"
            onClick={() => setShowModal(true)}
            bgColor="bg-darkGrey hover:bg-mediumGrey"
            size="sm"
            textColor="text-white"
            hasText={false}
            alternativePadding="p-1"
            icon={<Plus size={18} weight="bold" />}
          ></Button>
        )}
      </div>
      {hints.length <= 0 && (
        <div className="mt-7 text-darkGrey opacity-40 text-center text-sm">
          {isJudge
            ? "Hinweise, die Sie zu Beiträgen verfassen, erscheinen in dieser Ansicht. Nur Sie können Hinweise verfassen."
            : "Hinweise nach §139 ZPO erscheinen in dieser Ansicht, sobald der Richter oder die Richterin welche verfasst hat."}
        </div>
      )}
      <div className="flex flex-col p-4 overflow-auto text-mediumGrey font-extrabold text-sm">
        <div
          className="cursor-pointer flex items-center"
          onClick={() =>
            setHintsWithoutReferenceOpen(!hintsWithoutReferenceOpen)
          }
        >
          {hintsWithoutReferenceOpen ? (
            <CaretDown size={14} className="inline mr-1" weight="bold" />
          ) : (
            <CaretRight size={14} className="inline mr-1" weight="bold" />
          )}
          OHNE BEZUG AUF BEITRAG
        </div>
        <div>
          {hintsWithoutReferenceOpen &&
            hints.map(
              (hint) =>
                !hint.associatedEntry && <Hint key={hint.id} hint={hint} />
            )}
        </div>
        <div
          className="cursor-pointer flex items-center mt-7"
          onClick={() => setHintsWithReferenceOpen(!hintsWithReferenceOpen)}
        >
          {hintsWithReferenceOpen ? (
            <CaretDown size={14} className="inline mr-1" weight="bold" />
          ) : (
            <CaretRight size={14} className="inline mr-1" weight="bold" />
          )}
          MIT BEZUG AUF BEITRAG
        </div>
        <div>
          {hintsWithReferenceOpen &&
            hints.map(
              (hint) =>
                hint.associatedEntry && <Hint key={hint.id} hint={hint} />
            )}
        </div>
      </div>
      {showModal ? (
        <JudgeHintPopup
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        />
      ) : null}
    </div>
  );
};