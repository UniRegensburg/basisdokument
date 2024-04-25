import { Plus } from "phosphor-react";
import { useState } from "react";
import { useEntries, useUser } from "../contexts";
import { UserRole } from "../types";
import { Button } from "./Button";
import { NewEntry } from "./entry";

// changes from PR#159 are disabled as not working properly (feat: add new entry between exisiting entries)

interface AddEntryButtonsProps {
  sectionId: string;
  // entryBelowId: string | undefined;
  // lastEntry: boolean;
  // userRole: UserRole.Plaintiff | UserRole.Defendant;
}

export const AddEntryButtons: React.FC<AddEntryButtonsProps> = ({
  sectionId,
  // entryBelowId,
  // lastEntry,
  // userRole,
}) => {
  const [isNewEntryVisible, setIsNewEntryVisible] = useState<boolean>(false);
  const [newEntryRole, setNewEntryRole] = useState<
    UserRole.Plaintiff | UserRole.Defendant
  >(UserRole.Plaintiff);
  const { user } = useUser();
  const { entryIdOpen, setEntryIdOpen, setIsEntryPopupOpen } = useEntries();

  const handleClick = (
    roleForNewEntry: UserRole.Plaintiff | UserRole.Defendant
  ) => {
    if (entryIdOpen !== null) {
      setIsEntryPopupOpen(true);
      return;
    }
    setNewEntryRole(roleForNewEntry);
    setIsNewEntryVisible(true);
    setEntryIdOpen("newEntry");
  };

  return (
    <div className="space-y-4 w-full flex flex-col">
      {isNewEntryVisible && (
        <NewEntry
          sectionId={sectionId}
          roleForNewEntry={newEntryRole} //userRole
          setIsNewEntryVisible={() => setIsNewEntryVisible(false)}
          // entryBelowId={entryBelowId}
          // lastEntry={lastEntry}
        />
      )}
      {/* <div>
        <Button
          size="sm"
          bgColor="bg-darkGrey hover:bg-darkGrey/60"
          textColor="text-white"
          onClick={() => handleClick()}
          icon={<Plus size={18} weight="bold" />}>
          Neuen Beitrag hinzufügen
        </Button> */}
      <div className="grid grid-cols-2 gap-6 mb-8 items-start w-full">
        <div>
          {(user?.role === UserRole.Plaintiff ||
            user?.role === UserRole.Judge) && (
            <Button
              size="sm"
              bgColor="bg-darkGrey hover:bg-darkGrey/60"
              textColor="text-white"
              onClick={() => handleClick(UserRole.Plaintiff)}
              icon={<Plus size={18} weight="bold" />}>
              Neuen Beitrag hinzufügen
            </Button>
          )}
        </div>
        <div>
          {(user?.role === UserRole.Defendant ||
            user?.role === UserRole.Judge) && (
            <Button
              size="sm"
              bgColor="bg-darkGrey hover:bg-darkGrey/60"
              textColor="text-white"
              onClick={() => handleClick(UserRole.Defendant)}
              icon={<Plus size={18} weight="bold" />}>
              Neuen Beitrag hinzufügen
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
