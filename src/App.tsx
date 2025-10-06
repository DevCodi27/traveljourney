import Header from "./components/Header";
import Entry from "./components/Entry";
import Form from "./components/Form";
import { Suspense, useEffect, useState, useTransition, type JSX } from "react";
import { Routes, Route } from "react-router-dom";
import type { EntryProp } from "./Data/type";
import ProtectRoute from "./components/ProtextRoute";
import React from "react";
import ErrorBoundary from "./error/Error";
import { useTheme } from "./CustomHooks/CustomTheme";
import { Role } from "./CustomHooks/LocationHook";

function MyApp() {
  const initialEntries: EntryProp[] = [];
  const [entries, setEntries] = useState<EntryProp[]>(initialEntries);
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const role = Role();
  const Login = React.lazy(() => import("./components/Login"));
  const LoadingSpinner = () => (
    <div
      style={{ textAlign: "center", marginTop: "50px" }}
      className="spinner-contiainer"
    >
      <div className="spinner" style={{ fontSize: "20px" }}></div>
    </div>
  );
  type FormControllerProps = {
    render: (
      openForm: () => void,
      closeForm: () => void,
      isOpen: boolean
    ) => JSX.Element;
  };
  const FormController: React.FC<FormControllerProps> = ({ render }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);
    return render(openForm, closeForm, isOpen);
  };

  function addEntries(newEntry: EntryProp) {
    startTransition(() => {
      setEntries((prev) => [...prev, { ...newEntry, id: prev.length + 1 }]);
    });
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectRoute>
                <>
                  {isPending && <p>Loading...</p>}
                  <Header />
                  <div className={`entries-container `}>
                    {entries.map((entry) => (
                      <Entry entry={entry} />
                    ))}
                  </div>
                  {role === 1 && (
                    <FormController
                      render={(openForm, closeForm, isOpen) => (
                        <>
                          <div className="add-button-container">
                            <button
                              className="add-entry-btn"
                              onClick={openForm}
                            >
                              +
                            </button>
                          </div>

                          <footer>
                            <Form
                              onAddEntry={addEntries}
                              onClose={closeForm}
                              isOpen={isOpen}
                            />
                          </footer>
                        </>
                      )}
                    />
                  )}
                </>
              </ProtectRoute>
            }
          />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
