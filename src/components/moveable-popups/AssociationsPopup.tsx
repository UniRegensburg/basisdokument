import { useUser } from "../../contexts";
import { IEntry, UserRole } from "../../types";
import { Entry } from "../entry";

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

  return (
    <>
      <div className="flex gap-2 w-full">
        <Entry
          shownInPopup={true}
          entry={associatedEntry}
          viewedBy={
            user?.role === UserRole.Plaintiff
              ? UserRole.Defendant
              : UserRole.Plaintiff
          }></Entry>
        <Entry
          shownInPopup={true}
          entry={entry}
          viewedBy={
            user?.role === UserRole.Plaintiff
              ? UserRole.Defendant
              : UserRole.Plaintiff
          }></Entry>
      </div>
      {/* <div className="space-y-4"></div> */}
    </>
  );
};
