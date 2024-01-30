import { Plus } from "phosphor-react";
import { useState } from "react";
import { useEntries, useUser } from "../contexts";
import { UserRole } from "../types";
import { Button } from "./Button";
import { NewEntry } from "./entry";

interface AddEntryButtonsProps {
  sectionId: string;
  idFollowingEntry?: string;
}

export const AddEntryButtons: React.FC<AddEntryButtonsProps> = ({
  sectionId,
  idFollowingEntry,
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
          idFollowingEntry={idFollowingEntry}
          roleForNewEntry={newEntryRole}
          setIsNewEntryVisible={() => setIsNewEntryVisible(false)}
        />
      )}
      <div className="grid grid-cols-2 gap-6 mb-8 items-start w-full">
        <div>
          {(user?.role === UserRole.Plaintiff ||
            user?.role === UserRole.Judge) && (
            <Button
              size="sm"
              bgColor="bg-lightGrey hover:bg-lightGrey/50"
              textColor="text-darkGrey"
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
              bgColor="bg-lightGrey hover:bg-lightGrey/50"
              textColor="text-darkGrey"
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
