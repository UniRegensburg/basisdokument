import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useCase, useHeaderContext, useSection, useUser } from "../contexts";
import { Sorting, UserRole } from "../types";
import { getOriginalSortingPosition } from "../util/get-original-sorting-position";
import { getRequestedSorting } from "../util/get-requested-sorting";
import { AddSection } from "./AddSection";
import { AddEntryButtons } from "./AddEntryButtons";
import { EntryList } from "./entry";
import { JudgeDiscussion } from "./JudgeDiscussion";
import { MetaData } from "./metadata/MetaData";
import { SectionHeader } from "./section-header/SectionHeader";
import { MetaDataHeader } from "./metadata/MetaDataHeader";
import { useState } from "react";
import { useEvidence } from "../contexts/EvidenceContext";

export const Discussion = () => {
  const [isBodyOpenPlaintiff, setIsBodyOpenPlaintiff] = useState<boolean>(true);
  const [isBodyOpenDefendant, setIsBodyOpenDefendant] = useState<boolean>(true);

  const { groupedEntries } = useCase();
  const { sectionList, individualSorting } = useSection();
  const { user } = useUser();
  const { plaintiffAttachments, defendantAttachments } = useEvidence();

  const {
    selectedSorting,
    selectedVersion,
    versionHistory,
    highlightElementsWithSpecificVersion,
    showEntrySorting,
  } = useHeaderContext();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-offWhite h-full overflow-y-scroll py-8 px-4 space-y-4 scroll-smooth">
        <div className="max-w-[1500px] m-auto">
          {highlightElementsWithSpecificVersion ? (
            <div className="flex justify-center items-center z-[30]">
              <div className="fixed flex justify-center items-center">
                <div className="flex flex-row items-center justify-center gap-4 bg-blue-600 text-white p-2 px-3 rounded-md">
                  <div>
                    <div className="w-4 h-4 border-blue-200 border-2 rounded-full"></div>
                  </div>
                  <span>
                    Beiträge, die in{" "}
                    <b>
                      Version {selectedVersion + 1} (
                      {versionHistory[selectedVersion].author})
                    </b>{" "}
                    hinzugefügt wurden, werden mit einem blauen Rahmen
                    hervorgehoben.
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-6 ml-[40px]">
            <MetaDataHeader
              owner={UserRole.Plaintiff}
              isBodyOpen={isBodyOpenPlaintiff}
              setIsBodyOpen={setIsBodyOpenPlaintiff}
            />
            <MetaDataHeader
              owner={UserRole.Defendant}
              isBodyOpen={isBodyOpenDefendant}
              setIsBodyOpen={setIsBodyOpenDefendant}
            />
          </div>
          <div className="grid grid-cols-2 gap-6 ml-[40px] mt-4">
            {isBodyOpenPlaintiff ? (
              <MetaData
                owner={UserRole.Plaintiff}
                attachments={plaintiffAttachments}
              />
            ) : (
              <div></div>
            )}
            {isBodyOpenDefendant && (
              <MetaData
                owner={UserRole.Defendant}
                attachments={defendantAttachments}
              />
            )}
          </div>
          {selectedSorting === Sorting.Privat && showEntrySorting ? (
            <JudgeDiscussion />
          ) : (
            <>
              {getRequestedSorting(
                sectionList,
                individualSorting,
                selectedSorting
              ).map((section, index) => {
                const sectionEntries = groupedEntries[section.id];

                return (
                  <div key={section.id}>
                    {user?.role !== UserRole.Client && (
                      <AddSection sectionIdAfter={section.id} />
                    )}
                    <div key={section.id}>
                      <SectionHeader
                        sectionId={getOriginalSortingPosition(
                          sectionList,
                          section.id
                        )}
                        section={section}
                        position={index}
                      />
                      <div className="space-y-4 ml-[40px]">
                        <EntryList
                          entriesList={sectionEntries?.parent || []}
                          sectionId={section.id}
                        />
                        {user?.role !== UserRole.Client && (
                          <AddEntryButtons sectionId={section.id} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {user?.role !== UserRole.Client && <AddSection />}
        </div>
      </div>
    </DndProvider>
  );
};
