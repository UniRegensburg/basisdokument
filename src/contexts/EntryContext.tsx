import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import { getEntryById, useCase } from "./CaseContext";

interface IEntryContext {
  entryIdOpen: string | null;
  setEntryIdOpen: Dispatch<SetStateAction<string | null>>;
  isEntryPopupOpen: boolean;
  setIsEntryPopupOpen: Dispatch<SetStateAction<boolean>>;
  associatedSelection: string;
  setAssociatedSelection: Dispatch<SetStateAction<string>>;
  checkAssociatedText: (
    textToCheck: string,
    associatedEntry: string
  ) => boolean;
}

export const EntryContext = createContext<IEntryContext | null>(null);

interface EntryProviderProps {
  children: React.ReactNode;
}

export const EntryProvider: React.FC<EntryProviderProps> = ({ children }) => {
  const [entryIdOpen, setEntryIdOpen] = useState<string | null>(null);
  const [isEntryPopupOpen, setIsEntryPopupOpen] = useState<boolean>(false);
  const [associatedSelection, setAssociatedSelection] = useState<string>("");
  const { entries } = useCase();

  const checkAssociatedText = (
    textToCheck: string,
    associatedEntry: string
  ) => {
    let entryTextToCheck = getEntryById(entries, associatedEntry)?.text;
    if (entryTextToCheck?.includes(textToCheck)) {
      return true;
    } else {
      toast("Der markierte Text und die Bezugnahme stimmen nicht überein", {
        type: "error",
      });
      return false;
    }
  };

  return (
    <EntryContext.Provider
      value={{
        entryIdOpen,
        setEntryIdOpen,
        isEntryPopupOpen,
        setIsEntryPopupOpen,
        associatedSelection,
        setAssociatedSelection,
        checkAssociatedText,
      }}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntries = () => {
  const context = useContext(EntryContext);
  if (context === null) {
    throw new Error("useEntries must be used within an EntryProvider");
  }
  return context;
};
