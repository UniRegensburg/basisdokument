import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IEntry, IEvidence, UserRole } from "../types";
import { getEntryCodesForEvidence } from "../util/get-entry-code";

interface IEvidenceContext {
  // evidenceList management
  evidenceList: IEvidence[];
  updateEvidenceList: (evidences: IEvidence[], entries: IEntry[]) => void;
  removeFromEvidenceList: (evidence: IEvidence) => void;
  removeEvidencesWithoutReferences: (entries: IEntry[]) => void;
  // evidenceAttachmentNum management plaintiff/defendant
  evidenceIdsPlaintiff: (string | undefined)[];
  setEvidenceIdsPlaintiff: Dispatch<SetStateAction<(string | undefined)[]>>;
  removeEvidenceIdPlaintiff: (evidenceId: string) => void;
  evidenceIdsDefendant: (string | undefined)[];
  setEvidenceIdsDefendant: Dispatch<SetStateAction<(string | undefined)[]>>;
  removeEvidenceIdDefendant: (evidenceId: string) => void;
  removeLast: (evidenceIds: (string | undefined)[]) => (string | undefined)[];
  // evidence data volume management plaintiff/defendant
  plaintiffFileVolume: number;
  setPlaintiffFileVolume: Dispatch<SetStateAction<number>>;
  defendantFileVolume: number;
  setDefendantFileVolume: Dispatch<SetStateAction<number>>;
  getFileSize: (file: string) => number;
  // attachments Rubren
  plaintiffAttachments: IEvidence[];
  setPlaintiffAttachments: Dispatch<SetStateAction<IEvidence[]>>;
  removePlaintiffAttachments: (attachments: IEvidence) => void;
  defendantAttachments: IEvidence[];
  setDefendantAttachments: Dispatch<SetStateAction<IEvidence[]>>;
  removeDefendantAttachments: (attachments: IEvidence) => void;
}

export const EvidenceContext = createContext<IEvidenceContext | null>(null);

interface EvidenceProviderProps {
  children: React.ReactNode;
}

export const EvidenceProvider: React.FC<EvidenceProviderProps> = ({
  children,
}) => {
  const [evidenceList, setEvidenceList] = useState<IEvidence[]>([]);
  const [evidenceIdsDefendant, setEvidenceIdsDefendant] = useState<
    (string | undefined)[]
  >([]);
  const [evidenceIdsPlaintiff, setEvidenceIdsPlaintiff] = useState<
    (string | undefined)[]
  >([]);
  const [plaintiffFileVolume, setPlaintiffFileVolume] = useState<number>(0);
  const [defendantFileVolume, setDefendantFileVolume] = useState<number>(0);
  const [plaintiffAttachments, setPlaintiffAttachments] = useState<IEvidence[]>(
    []
  );
  const [defendantAttachments, setDefendantAttachments] = useState<IEvidence[]>(
    []
  );

  useEffect(() => {}, [evidenceList]);

  const updateEvidenceList = (evidences: IEvidence[]) => {
    // if evidenceList is empty, set first evidences
    if (evidenceList.length <= 0) {
      setEvidenceList(evidences);
      return;
    }

    // new to-update list from current evidenceList
    let updatedEvidenceList: IEvidence[] = evidenceList;
    // for every evidence in evidences check if it/id is already in to-update list
    // if yes: overwrite with newer evidence version
    // if not: push to to-update list
    for (let i = 0; i < evidences.length; i++) {
      let checkForUpdate = updatedEvidenceList.findIndex(
        (ev) => ev.id === evidences[i].id
      );
      if (checkForUpdate !== -1) {
        updatedEvidenceList[checkForUpdate] = evidences[i];
      } else {
        updatedEvidenceList.push(evidences[i]);
      }
    }
    // set updated list as new evidenceList
    setEvidenceList(updatedEvidenceList);
  };

  const removeEvidencesWithoutReferences = (entries: IEntry[]) => {
    // this means that they are not longer referenced in any other entry
    // there is already a hint and must-approve for the user in EvidencePopup,
    // that this/these evidences will be deleted completely
    for (let k = 0; k < evidenceList.length; k++) {
      if (getEntryCodesForEvidence(entries, evidenceList[k])?.length === 0) {
        if (evidenceList[k].hasImageFile && evidenceList[k].imageFile) {
          if (evidenceList[k].role === UserRole.Plaintiff) {
            setPlaintiffFileVolume(
              plaintiffFileVolume - getFileSize(evidenceList[k].imageFile!)
            );
          } else {
            setDefendantFileVolume(
              defendantFileVolume - getFileSize(evidenceList[k].imageFile!)
            );
          }
        }
        removeFromEvidenceList(evidenceList[k]);
      }
    }
  };

  const removeFromEvidenceList = (evidence: IEvidence) => {
    // check if evidence has file to update data volume
    if (evidence.hasImageFile && evidence.imageFile) {
      let imgFileSize = getFileSize(evidence.imageFile);
      if (evidence.role === UserRole.Plaintiff) {
        setPlaintiffFileVolume(plaintiffFileVolume - imgFileSize);
      } else {
        setDefendantFileVolume(defendantFileVolume - imgFileSize);
      }
    }
    setEvidenceList(evidenceList.filter((ev) => ev.id !== evidence.id));
  };

  // get size of a file data string to calculate data volume
  // source for getting file size of base64: https://stackoverflow.com/questions/47852277/image-file-size-from-data-uri-in-javascript
  const getFileSize = (file: string) => {
    let shortBase64 = file!.length - (file!.indexOf(",") + 1);
    let padding =
      file!.charAt(file!.length - 2) === "="
        ? 2
        : file!.charAt(file!.length - 1) === "="
        ? 1
        : 0;
    return shortBase64 * 0.75 - padding;
  };

  const removeEvidenceIdDefendant = (evidenceId: string) => {
    setEvidenceIdsDefendant(
      evidenceIdsDefendant.map((evId) =>
        evId === evidenceId ? undefined : evId
      )
    );
    removeLast(evidenceIdsDefendant);
  };

  const removeEvidenceIdPlaintiff = (evidenceId: string) => {
    setEvidenceIdsPlaintiff(
      evidenceIdsPlaintiff.map((evId) =>
        evId === evidenceId ? undefined : evId
      )
    );
    removeLast(evidenceIdsPlaintiff);
  };

  const removeLast = (evidenceIds: (string | undefined)[]) => {
    if (evidenceIds[evidenceIds.length - 1] === undefined) {
      evidenceIds.pop();
    }
    return evidenceIds;
  };

  const removePlaintiffAttachments = (attachment: IEvidence) => {
    // check if attachment has file to update data volume
    if (attachment.hasImageFile && attachment.imageFile) {
      let imgFileSize = getFileSize(attachment.imageFile);
      setPlaintiffFileVolume(plaintiffFileVolume - imgFileSize);
      setPlaintiffAttachments(
        plaintiffAttachments.filter((att) => att.id !== attachment.id)
      );
    }
  };

  const removeDefendantAttachments = (attachment: IEvidence) => {
    // check if attachment has file to update data volume
    if (attachment.hasImageFile && attachment.imageFile) {
      let imgFileSize = getFileSize(attachment.imageFile);
      setDefendantFileVolume(defendantFileVolume - imgFileSize);
      setDefendantAttachments(
        defendantAttachments.filter((att) => att.id !== attachment.id)
      );
    }
  };

  return (
    <EvidenceContext.Provider
      value={{
        evidenceList,
        updateEvidenceList,
        removeFromEvidenceList,
        removeEvidencesWithoutReferences,
        evidenceIdsDefendant,
        setEvidenceIdsDefendant,
        removeEvidenceIdDefendant,
        evidenceIdsPlaintiff,
        setEvidenceIdsPlaintiff,
        removeEvidenceIdPlaintiff,
        removeLast,
        plaintiffFileVolume,
        setPlaintiffFileVolume,
        defendantFileVolume,
        setDefendantFileVolume,
        getFileSize,
        plaintiffAttachments,
        setPlaintiffAttachments,
        removePlaintiffAttachments,
        defendantAttachments,
        setDefendantAttachments,
        removeDefendantAttachments,
      }}>
      {children}
    </EvidenceContext.Provider>
  );
};

export const useEvidence = () => {
  const context = useContext(EvidenceContext);
  if (context === null) {
    throw new Error("useEvidence must be used within a EvidenceProvider");
  }
  return context;
};
