import { IEntry, IEvidence } from "../types";

export const getEntryCode = (
  entries: IEntry[],
  entryId: string = ""
): string => {
  const entry = entries.find((e) => e.id === entryId);
  if (!entry) {
    throw new Error(`Entry ${entryId} not found`);
  }
  return entry.entryCode;
};

export const getEntryCodesForEvidence = (
  entries: IEntry[],
  evidence: IEvidence
): string[] | undefined => {
  const entriesWithEvidenceReference = entries
    // prefilter entries with no evidences
    .filter((entry) => entry.evidenceIds !== undefined)
    // filter entries with evidence
    .filter((entry) => entry.evidenceIds.some((evId) => evId === evidence.id));
  // return entry codes or empty array
  return entriesWithEvidenceReference.map((entry) =>
    getEntryCode(entries, entry.id)
  );
};
