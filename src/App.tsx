import { useEffect, useState } from "react";
import { CustomToastContainer } from "./components/CustomToastContainer";
import "react-toastify/dist/ReactToastify.css";
import {
  BookmarkProvider,
  CaseProvider,
  EntryProvider,
  ExportProvider,
  HeaderProvider,
  HintProvider,
  ImprintProvider,
  NoteProvider,
  PatchnotesProvider,
  SectionProvider,
  UserProvider,
  EvidenceProvider,
  OnboardingProvider,
  SidebarProvider,
  ViewProvider,
} from "./contexts";
import { Auth } from "./pages/Auth";
import { Main } from "./pages/Main";

const registerKeyListener = (e: KeyboardEvent) => {
  if (e.key === "r" && e.metaKey) {
    e.preventDefault();
  }
};

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("keydown", registerKeyListener);
    return () => {
      window.removeEventListener("keydown", registerKeyListener);
    };
  }, []);

  return (
    <div className="App h-screen overflow-hidden">
      <OnboardingProvider>
        <UserProvider>
          <SectionProvider>
            <EvidenceProvider>
              <HeaderProvider>
                <CaseProvider>
                  <ViewProvider>
                    <EntryProvider>
                      <SidebarProvider>
                        <NoteProvider>
                          <HintProvider>
                            <BookmarkProvider>
                              <ExportProvider>
                                <PatchnotesProvider>
                                  <ImprintProvider>
                                    {isAuthenticated ? (
                                      <Main />
                                    ) : (
                                      <Auth
                                        setIsAuthenticated={setIsAuthenticated}
                                      />
                                    )}
                                  </ImprintProvider>
                                </PatchnotesProvider>
                              </ExportProvider>
                            </BookmarkProvider>
                          </HintProvider>
                        </NoteProvider>
                      </SidebarProvider>
                    </EntryProvider>
                  </ViewProvider>
                </CaseProvider>
              </HeaderProvider>
            </EvidenceProvider>
          </SectionProvider>
        </UserProvider>
      </OnboardingProvider>
      <CustomToastContainer />
    </div>
  );
};
