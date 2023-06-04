import { CaretDown, CaretRight, Plus } from "phosphor-react";
import { useState } from "react";
import { useCase, useUser } from "../../contexts";
import { useHints } from "../../contexts/HintContext";
import { UserRole } from "../../types";
import { Button } from "../Button";
import { Hint } from "./Hint";
import { getEntryCodesForEvidence } from "../../util/get-entry-code";
import { getEvidences, getEvidencesForRole } from "../../util/get-evidences";
import { Evidence } from "./Evidence";

export const SidebarEvidences = () => {
  const [plaintiffEvidencesOpen, setPlaintiffEvidencesOpen] =
    useState<boolean>(true);
  const [defendantEvidencesOpen, setDefendantEvidencesOpen] =
    useState<boolean>(true);
  const { entries } = useCase();
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-3 flex-1 h-[calc(100vh_-_3.5rem)] overflow-auto">
      <div className="flex justify-between items-center pt-4 px-4">
        <div className="font-bold text-darkGrey text-lg">Beweise</div>
      </div>
      {getEvidences(entries, "", []).length <= 0 ? (
        <div className="mt-7 text-darkGrey opacity-40 text-center text-sm p-4">
          Im Beweisbereich bei einem Beitrag können Sie Beweise mit oder ohne
          Anlage hinzufügen. Alle Beweise des Basisdokuments erscheinen dann in
          dieser Ansicht.
        </div>
      ) : (
        <div className="flex flex-col p-4 text-mediumGrey font-extrabold text-sm h-fit">
          <div
            className="cursor-pointer flex items-center"
            onClick={() => setPlaintiffEvidencesOpen(!plaintiffEvidencesOpen)}>
            {plaintiffEvidencesOpen ? (
              <CaretDown size={14} className="inline mr-1" weight="bold" />
            ) : (
              <CaretRight size={14} className="inline mr-1" weight="bold" />
            )}
            ERSTELLT VON KLAGEPARTEI
          </div>
          <div>
            {plaintiffEvidencesOpen &&
              getEvidencesForRole(entries, UserRole.Plaintiff).map(
                (evidence) => <Evidence key={evidence.id} evidence={evidence} />
              )}
          </div>
          <div
            className="cursor-pointer flex items-center mt-7"
            onClick={() => setDefendantEvidencesOpen(!defendantEvidencesOpen)}>
            {defendantEvidencesOpen ? (
              <CaretDown size={14} className="inline mr-1" weight="bold" />
            ) : (
              <CaretRight size={14} className="inline mr-1" weight="bold" />
            )}
            ERSTELLT VON BEKLAGTENPARTEI
          </div>
          <div>
            {defendantEvidencesOpen &&
              getEvidencesForRole(entries, UserRole.Defendant).map(
                (evidence) => <Evidence key={evidence.id} evidence={evidence} />
              )}
          </div>
        </div>
      )}
    </div>
  );
};