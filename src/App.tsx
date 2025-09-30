import Header from "./components/Header";
import Entry from "./components/Entry";
import Form from "./components/Form";
import { Suspense, useContext, useEffect, useState, type JSX } from "react";
import { Routes, Route } from "react-router-dom";
import type { EntryProp } from "./Data/type";
import { ThemeContext } from "./components/ThemeContext";
import ProtectRoute from "./components/ProtextRoute";
// import Login from "./components/Login";
import React from "react";
import ErrorBoundary from "./error/Error";
// import React from "react";

function MyApp() {
  const initialEntries: EntryProp[] = [];
  const [entries, setEntries] = useState<EntryProp[]>(initialEntries);
  // const [isFormOpen, setIsFormOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

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

  // function handleCloseForm() {
  //   setIsFormOpen(false);
  // }

  function addEntries(newEntry: EntryProp) {
    setEntries((prev) => [...prev, { ...newEntry, id: prev.length + 1 }]);
  }

  const Login = React.lazy(() => import("./components/Login"));

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
                  <Header />
                  <div className={`entries-container `}>
                    {entries.map((entry) => (
                      <Entry entry={entry} />
                    ))}
                  </div>
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
