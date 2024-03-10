import { Plus } from "phosphor-react";
import { useState } from "react";
import { useEntries } from "../contexts";
import { UserRole } from "../types";
import { Button } from "./Button";
import { NewEntry } from "./entry";

interface AddEntryButtonsProps {
  sectionId: string;
  entryBelowId: string | undefined;
  lastEntry: boolean;
  userRole: UserRole.Plaintiff | UserRole.Defendant;
}

export const AddEntryButtons: React.FC<AddEntryButtonsProps> = ({
  sectionId,
  entryBelowId,
  lastEntry,
  userRole,
}) => {
  const [isNewEntryVisible, setIsNewEntryVisible] = useState<boolean>(false);
  const { entryIdOpen, setEntryIdOpen, setIsEntryPopupOpen } = useEntries();

  const handleClick = () => {
    if (entryIdOpen !== null) {
      setIsEntryPopupOpen(true);
      return;
    }
    setIsNewEntryVisible(true);
    setEntryIdOpen("newEntry");
  };

  return (
    <div className="space-y-4 w-full flex flex-col">
      {isNewEntryVisible && (
        <NewEntry
          sectionId={sectionId}
          roleForNewEntry={userRole}
          setIsNewEntryVisible={() => setIsNewEntryVisible(false)}
          entryBelowId={entryBelowId}
          lastEntry={lastEntry}
        />
      )}
      <div>
        <Button
          size="sm"
          bgColor="bg-darkGrey hover:bg-darkGrey/60"
          textColor="text-white"
          onClick={() => handleClick()}
          icon={<Plus size={18} weight="bold" />}>
          Neuen Beitrag hinzufügen
        </Button>
      </div>
    </div>
  );
};
