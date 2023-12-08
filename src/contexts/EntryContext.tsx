import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IEntryContext {
  entryIdOpen: string | null;
  setEntryIdOpen: Dispatch<SetStateAction<string | null>>;
  isEntryPopupOpen: boolean;
  setIsEntryPopupOpen: Dispatch<SetStateAction<boolean>>;
}

export const EntryContext = createContext<IEntryContext | null>(null);

interface EntryProviderProps {
  children: React.ReactNode;
}

export const EntryProvider: React.FC<EntryProviderProps> = ({ children }) => {
  const [entryIdOpen, setEntryIdOpen] = useState<string | null>(null);
  const [isEntryPopupOpen, setIsEntryPopupOpen] = useState<boolean>(false);

  return (
    <EntryContext.Provider
      value={{
        entryIdOpen,
        setEntryIdOpen,
        isEntryPopupOpen,
        setIsEntryPopupOpen,
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
