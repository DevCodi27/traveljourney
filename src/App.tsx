import Header from "./components/Header";
import Login from "./components/Login";
import Form from "./components/Form";
import Entry from "./components/Entry";
import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import type { EntryProp } from "./Data/type";
import { ThemeContext } from "./components/ThemeContext";
import ProtectRoute from "./components/ProtextRoute";

function MyApp() {
  const initialEntries: EntryProp[] = [];
  const [entries, setEntries] = useState<EntryProp[]>(initialEntries);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleCloseForm() {
    setIsFormOpen(false);
  }

  function addEntries(newEntry: EntryProp) {
    setEntries((prev) => [...prev, { ...newEntry, id: prev.length + 1 }]);
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme; // dynamically apply light/dark
  }, [theme]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        
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
              <div className="add-button-container">
                <button
                  className="add-entry-btn"
                  onClick={() => setIsFormOpen(true)}
                >
                  +
                </button>
              </div>

              <footer>
                <Form
                  onAddEntry={addEntries}
                  onClose={handleCloseForm}
                  isOpen={isFormOpen}
                />
              </footer>
              
            </>
            </ProtectRoute>
          }
        />
       
       
      </Routes>
    </>
  );
}

export default MyApp;
