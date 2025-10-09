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
import Registration from "./components/Registration";
import { LoadingSpinner } from "./components/LoadingSpinner";
import axios from "axios";

function MyApp() {
  const initialEntries: EntryProp[] = [];
  const [entries, setEntries] = useState<EntryProp[]>(initialEntries);
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const role = Role();
  const Login = React.lazy(() => import("./components/Login"));
  
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
useEffect(()=>{
    const fetchEntries = async()=>{
      try{
        const response = await axios.get("http://localhost:5000/api/entries");
        const formattedEntries = response.data.map((entry: any) => ({
        id: entry.id,
        image: {
        src: entry.image_src,
          alt: entry.image_alt
        },
        country: entry.country,
        location: entry.location,
        place: entry.place,
        date: entry.date,
        details: entry.details
      }));
        setEntries(formattedEntries);
      }
      catch(error:any)
      {
        console.error("Error loading entries:",error)
      }
    }

    fetchEntries()
      
  },[]) 


  return (
    <>
      <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
        <Routes>
          <Route
          path="/register"
          element={
            <Registration/>
          }
          />
          <Route
            path="/login"
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
                      <Entry key={entry.id} entry={entry} />
                    ))}
                  </div>
                  {role === "admin" && (
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
