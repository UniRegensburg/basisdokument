import { Discussion } from "../components/Discussion";
import { Header } from "../components/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Onboarding } from "../components/popups/Onboarding";
import { useBeforeunload } from "react-beforeunload";
import {
  useBookmarks,
  useCase,
  useExport,
  useHeaderContext,
  useHints,
  useNotes,
  useSection,
} from "../contexts";
import { useEvidence } from "../contexts/EvidenceContext";
import { PopupContainer } from "../components/moveable-popups/PopupContainer";
import { ExportPopup } from "../components/moveable-popups/ExportPopup";
import { NotePopup } from "../components/moveable-popups/NotePopup";
import { JudgeHintPopup } from "../components/moveable-popups/JudgeHintPopup";

export const Main: React.FC = () => {
  useBeforeunload(
    () =>
      "Änderungen am Basisdokument können verloren gehen. Bitte speichern Sie das Basisdokument, bevor Sie den Browser-Tab schließen."
  );
  const {
    showJudgeHintPopup,
    setShowJudgeHintPopup,
    hints,
    editMode: hintEditMode,
  } = useHints();
  const {
    showNotePopup,
    setShowNotePopup,
    notes,
    editMode: noteEditMode,
  } = useNotes();
  const { isExportPopupOpen, setIsExportPopupOpen } = useExport();
  const {
    caseId,
    currentVersion,
    metaData,
    fileId,
    entries,
    highlightedEntries,
  } = useCase();
  const { sectionList, individualSorting } = useSection();
  const {
    evidenceList,
    evidenceIdsPlaintiff,
    evidenceIdsDefendant,
    plaintiffFileVolume,
    defendantFileVolume,
  } = useEvidence();
  const { versionHistory, colorSelection } = useHeaderContext();
  const { bookmarks } = useBookmarks();

  return (
    <div className="flex w-full h-full">
      <Onboarding />
      {showJudgeHintPopup ? (
        <PopupContainer
          title={`${
            hintEditMode ? "Hinweis bearbeiten" : "Neuen Hinweis hinzufügen"
          }`}
          isVisible={showJudgeHintPopup}
          setIsVisible={setShowJudgeHintPopup}
          children={<JudgeHintPopup />}
          width={50}
          height={75}></PopupContainer>
      ) : null}
      {showNotePopup ? (
        <PopupContainer
          title={`${
            noteEditMode ? "Notiz bearbeiten" : "Neue Notiz hinzufügen"
          }`}
          width={50}
          height={75}
          isVisible={showNotePopup}
          setIsVisible={setShowNotePopup}
          children={<NotePopup />}></PopupContainer>
      ) : null}
      {isExportPopupOpen ? (
        <PopupContainer
          title={"Basisdokument herunterladen"}
          isVisible={isExportPopupOpen}
          setIsVisible={setIsExportPopupOpen}
          width={60}
          height={65}
          children={
            <ExportPopup
              fileId={fileId}
              caseId={caseId}
              currentVersion={currentVersion}
              versionHistory={versionHistory}
              metaData={metaData}
              entries={entries}
              sectionList={sectionList}
              evidenceList={evidenceList}
              evidenceIdsPlaintiff={evidenceIdsPlaintiff}
              evidenceIdsDefendant={evidenceIdsDefendant}
              plaintiffFileVolume={plaintiffFileVolume}
              defendantFileVolume={defendantFileVolume}
              hints={hints}
              highlightedEntries={highlightedEntries}
              colorSelection={colorSelection}
              notes={notes}
              bookmarks={bookmarks}
              individualSorting={individualSorting}></ExportPopup>
          }></PopupContainer>
      ) : null}
      <main className="w-full flex flex-col">
        <Header />
        <Discussion />
      </main>
      <Sidebar />
    </div>
  );
};
