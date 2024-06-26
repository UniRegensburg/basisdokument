import { X } from "phosphor-react";
import { usePatchnotes } from "../../contexts/PatchnotesContext";
import { useState } from "react";

export const PatchnotesPopup = () => {
  const { setShowPatchnotesPopup } = usePatchnotes();
  var [currentPatchnote, setCurrentPatchnote] = useState<string>("2.3.0");
  var [patchnoteContent, setPatchnoteContent] = useState<string>(
    `<h5 className="opacity-70">25. April 2024</h5>
         <h3>Basisdokument Version 2.3.0</h3>
         <div className="flex flex-col gap-2 mt-3">
           <div>
             <h4 className="font-semibold">Neue Funktionen:</h4>
             <ul>
              <li>Vollbild-Vorschau für PDF</li>
              <li>Übersichtliche Darstellung mehrfacher Bezugnahme</li>
              <li>Benachrichtigung bei Nutzung einer bereits existierenden Anlagennummer</li>
              <li>Popups teils verschiebbar</li>
              <li>Anhangsoption für das Rubrum</li>
              <li>Bezugnahme auf einzelne Textausschnitte</li>
             </ul>
           </div>
         </div>`
  );

  function switchPatchnoteContent(contentKey: string) {
    switch (true) {
      case /1.0.0/.test(contentKey):
        setPatchnoteContent(
          `<h5 className="opacity-70">20. Februar 2023</h5>
           <h3>Basisdokument Version 1.0.0</h3>
           <div className="flex flex-col gap-2 mt-2">
             <div>
               <h4 className="font-semibold">Neue Funktionen:</h4>
               <ul>
                 <li>Basisdokument erstellen</li>
                 <li>Basisdokument öffnen</li>
                 <li>Basisdokument herunterladen</li>
                 <li>Gliederungspunkte hinzufügen, umbenennen, löschen</li>
                 <li>Sortierung: Original/Privat</li>
                 <li>Versionierung</li>
                 <li>Beiträge hinzufügen, bearbeiten, löschen</li>
                 <li>Beiträge mit Bezug hinzufügen, bearbeiten, löschen</li>
                 <li>Darstellungen: Side-by-Side, Spalten, Zeilen</li>
                 <li>Strittigkeitsansicht für Richter</li>
                 <li>Hinweise erstellen, bearbeiten, löschen</li>
                 <li>Notizen erstellen, bearbeiten, löschen</li>
                 <li>Lesezeichen erstellen, bearbeiten, löschen</li>
                 <li>Markierungen: Farben auswählen und benennen</li>
                 <li>Markierungen: Im Fließtext markieren und Markierungen löschen</li>
                 <li>Markierungen: Nach Markierungen filtern</li>
                 <li>Suchfunktion</li>
                 <li>Hilfe/Onboarding</li>
                 <li>Erscheinungsbild anpassen</li>
               </ul>
             </div>
           </div>`
        );
        setCurrentPatchnote("1.0.0");
        break;
      case /1.0.1/.test(contentKey):
        setPatchnoteContent(
          `<h5 className="opacity-70">25. Februar 2023</h5>
            <h3>Basisdokument Version 1.0.1</h3>
            <div className="flex flex-col gap-2 mt-2">
              <div>
                <h4 className="font-semibold">Änderungen:</h4>
                <ul>
                  <li>Speicherung der Daten als txt statt json</li>
                  <li>Hinweis für Versionierung umformuliert</li>
                </ul>
              </div>
            </div>`
        );
        setCurrentPatchnote("1.0.1");
        break;
      case /1.0.2/.test(contentKey):
        setPatchnoteContent(
          `<h5 className="opacity-70">02. März 2023</h5>
            <h3>Basisdokument Version 1.0.2</h3>
            <div className="flex flex-col gap-2 mt-2">
              <div>
                <h4 className="font-semibold">Änderungen:</h4>
                <ul>
                  <li>Angepasste Benennung der Exportdateien</li>
                </ul>
              </div>
            </div>`
        );
        setCurrentPatchnote("1.0.2");
        break;
      case /2.0.0/.test(contentKey):
        setPatchnoteContent(
          `<h5 className="opacity-70">05. Mai 2023</h5>
           <h3>Basisdokument Version 2.0.0</h3>
           <div className="flex flex-col gap-2 mt-3">
             <div>
               <h4 className="font-semibold">Neue Funktionen:</h4>
               <ul>
                <li>Verbessertes PDF</li>
                <li>Gliederungs-Sidebar</li>
                <li>Mandantenansicht</li>
                <li>Standardüberschriften</li>
                <li>Bezugnehmende Beiträge in einem Popup</li>
                <li>Markierungstools in einem Menü</li>
               </ul>
             </div>
           </div>`
        );
        setCurrentPatchnote("2.0.0");
        break;
      case /2.0.1/.test(contentKey):
        setPatchnoteContent(
          `<h5 className="opacity-70">09. Mai 2023</h5>
           <h3>Basisdokument Version 2.0.1</h3>
           <div className="flex flex-col gap-2 mt-3">
             <div>
               <h4 className="font-semibold">Neue Funktionen:</h4>
               <ul>
                <li>Aktualisiertes Onboarding mit allen neuen Funktionen</li>
                <li>Neues Basisdokument <a href="https://www.uni-regensburg.de/forschung/reallabor-informationen/wiki/index.html" target="_blank">Wiki</a> mit allen Funktionen</li>
               </ul>
             </div>
           </div>`
        );
        setCurrentPatchnote("2.0.1");
        break;
      case /2.1.0/.test(contentKey):
        setPatchnoteContent(
          `<h5 className="opacity-70">14. Juli 2023</h5>
           <h3>Basisdokument Version 2.1.0</h3>
           <div className="flex flex-col gap-2 mt-3">
             <div>
               <h4 className="font-semibold">Neue Funktionen:</h4>
               <ul>
                <li>Eigener Bereich für Beweise</li>
                <li>Erweiterte Exportfunktionen</li>
                <li>Link zu eigener Mandanten-Domain</li>
               </ul>
             </div>
             <div>
               <h4 className="font-semibold">Funktionen in Arbeit:</h4>
               <ul>
                <li>Übersichtliche Darstellung von bezugnehmenden Beiträgen</li>
               </ul>
             </div>
           </div>`
        );
        setCurrentPatchnote("2.1.0");
        break;
      case /2.2.0/.test(contentKey):
        setPatchnoteContent(
          `<h5 className="opacity-70">23. November 2023</h5>
             <h3>Basisdokument Version 2.2.0</h3>
             <div className="flex flex-col gap-2 mt-3">
               <div>
                 <h4 className="font-semibold">Neue Funktionen:</h4>
                 <ul>
                  <li>PDF/TIFF-Dateien zu Beweisen hinzufügen</li>
                  <li>Fortschrittsanzeigen für das Dateivolumen der Anlagen</li>
                  <li>Beweise "unter Verwahrung gegen die Beweislast"</li>
                  <li>Beweise können in der Beweis-Sidebar gefiltert werden</li>
                  <li>Gliederungs-Sidebar erweitert um Beiträge</li>
                  <li>Neue Exportfunktionen: Erweiterte Signatur, Beweisliste</li>
                  <li>Hilfefunktion zusätzlich auf Startseite</li>
                  <li>Keine Aufzählung mehr bei einzelnen Beweisen</li>
                  <li>Darstellungs-Abstände angepasst</li>
                 </ul>
               </div>
               <div>
                 <h4 className="font-semibold">Funktionen in Arbeit:</h4>
                 <ul>
                  <li>Vorschau von TIFF-Dateien in allen Browsern</li>
                  <li>Übersichtliche Darstellung von bezugnehmenden Beiträgen</li>
                 </ul>
               </div>
             </div>`
        );
        setCurrentPatchnote("2.2.0");
        break;
      case /2.3.0/.test(contentKey):
        setPatchnoteContent(
          `<h5 className="opacity-70">25. April 2024</h5>
             <h3>Basisdokument Version 2.3.0</h3>
             <div className="flex flex-col gap-2 mt-3">
               <div>
                 <h4 className="font-semibold">Neue Funktionen:</h4>
                 <ul>
                  <li>Vollbild-Vorschau für PDF</li>
                  <li>Übersichtliche Darstellung mehrfacher Bezugnahme</li>
                  <li>Benachrichtigung bei Nutzung einer bereits existierenden Anlagennummer</li>
                  <li>Popups sind verschiebbar</li>
                  <li>Anhangsoption für das Rubrum</li>
                  <li>Bezugnahme auf einzelne Textausschnitte</li>
                 </ul>
               </div>
             </div>`
        );
        setCurrentPatchnote("2.3.0");
        break;
    }
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="my-6 mx-auto">
          {/*content*/}
          <div className="h-[80vh] w-[60vw] p-6 space-y-4 border-0 rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-lg ">
              <h3 className="text-xl font-bold text-darkGrey">Patchnotes</h3>
              <div>
                <button
                  onClick={() => {
                    setShowPatchnotesPopup(false);
                  }}
                  className="text-darkGrey bg-offWhite p-1 rounded-md hover:bg-lightGrey">
                  <X size={24} />
                </button>
              </div>
            </div>
            {/*body*/}
            <div className="flex flex-row border space-y-2 rounded-md overflow-y-auto">
              {/*tabs*/}
              <div className="flex flex-col">
                <div
                  className={`w-40 flex-grow h-full grid place-items-center p-2 border-b hover:bg-gray-200 cursor-pointer ${
                    currentPatchnote === "2.3.0" ? "" : "border-r opacity-30"
                  }`}
                  onClick={() => {
                    switchPatchnoteContent("2.3.0");
                  }}>
                  <div className="flex flex-col">
                    <div className="font-semibold self-center">
                      Version 2.3.0
                    </div>
                    <div className="opacity-75">25. April 2024</div>
                  </div>
                </div>
                <div
                  className={`w-40 flex-grow h-full grid place-items-center p-2 border-b hover:bg-gray-200 cursor-pointer ${
                    currentPatchnote === "2.2.0" ? "" : "border-r opacity-30"
                  }`}
                  onClick={() => {
                    switchPatchnoteContent("2.2.0");
                  }}>
                  <div className="flex flex-col">
                    <div className="font-semibold self-center">
                      Version 2.2.0
                    </div>
                    <div className="opacity-75">23. November 2023</div>
                  </div>
                </div>
                <div
                  className={`w-40 flex-grow h-full grid place-items-center p-2 border-b hover:bg-gray-200 cursor-pointer ${
                    currentPatchnote === "2.1.0" ? "" : "border-r opacity-30"
                  }`}
                  onClick={() => {
                    switchPatchnoteContent("2.1.0");
                  }}>
                  <div className="flex flex-col">
                    <div className="font-semibold self-center">
                      Version 2.1.0
                    </div>
                    <div className="opacity-75">14. Juli 2023</div>
                  </div>
                </div>
                <div
                  className={`w-40 flex-grow h-full grid place-items-center p-2 border-b hover:bg-gray-200 cursor-pointer ${
                    currentPatchnote === "2.0.1" ? "" : "border-r opacity-30"
                  }`}
                  onClick={() => {
                    switchPatchnoteContent("2.0.1");
                  }}>
                  <div className="flex flex-col">
                    <div className="font-semibold self-center">
                      Version 2.0.1
                    </div>
                    <div className="opacity-75">09. Mai 2023</div>
                  </div>
                </div>
                <div
                  className={`w-40 flex-grow h-full grid place-items-center p-2 hover:bg-gray-200 cursor-pointer ${
                    currentPatchnote === "2.0.0" ? "" : "border-r opacity-30"
                  }`}
                  onClick={() => {
                    switchPatchnoteContent("2.0.0");
                  }}>
                  <div className="flex flex-col">
                    <div className="font-semibold self-center">
                      Version 2.0.0
                    </div>
                    <div className="opacity-75">05. Mai 2023</div>
                  </div>
                </div>
                <div
                  className={`w-40 flex-grow h-full grid place-items-center p-2 border-t hover:bg-gray-200 cursor-pointer ${
                    currentPatchnote === "1.0.2" ? "" : "border-r opacity-30"
                  }`}
                  onClick={() => {
                    switchPatchnoteContent("1.0.2");
                  }}>
                  <div className="flex flex-col">
                    <div className="font-semibold self-center">
                      Version 1.0.2
                    </div>
                    <div className="opacity-75">02. März 2023</div>
                  </div>
                </div>
                <div
                  className={`w-40 flex-grow h-full grid place-items-center p-2 border-t hover:bg-gray-200 cursor-pointer ${
                    currentPatchnote === "1.0.1" ? "" : "border-r opacity-30"
                  }`}
                  onClick={() => {
                    switchPatchnoteContent("1.0.1");
                  }}>
                  <div className="flex flex-col">
                    <div className="font-semibold self-center">
                      Version 1.0.1
                    </div>
                    <div className="opacity-75">25. Februar 2023</div>
                  </div>
                </div>
                <div
                  className={`w-40 flex-grow h-full grid place-items-center p-2 border-t hover:bg-gray-200 cursor-pointer ${
                    currentPatchnote === "1.0.0" ? "" : "border-r opacity-30"
                  }`}
                  onClick={() => {
                    switchPatchnoteContent("1.0.0");
                  }}>
                  <div className="flex flex-col">
                    <div className="font-semibold self-center">
                      Version 1.0.0
                    </div>
                    <div className="opacity-75">20. Februar 2023</div>
                  </div>
                </div>
              </div>
              {/*content*/}
              <div
                className="flex flex-col pl-6 h-[70vh] w-[60vw] overflow-auto"
                dangerouslySetInnerHTML={{ __html: patchnoteContent }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
