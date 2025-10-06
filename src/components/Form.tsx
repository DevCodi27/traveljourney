import "./Form.css";
import type { EntryProp } from "../Data/type";
type EntryType = EntryProp;

type FormEntry = {
  onAddEntry: (entry: EntryType) => void;
  onClose: () => void;
  isOpen: boolean;
};

function Form({ onAddEntry, onClose, isOpen }: FormEntry) {
  function onChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Form Submitted");
    const formData = new FormData(event.currentTarget);
    const entry: EntryType = {
      image: {
        src: formData.get("src")?.toString() || "",
        alt: formData.get("alt")?.toString() || "",
      },
      country: formData.get("country")?.toString() || "",
      location: formData.get("location")?.toString() || "",
      place: formData.get("place")?.toString() || "",
      date: formData.get("date")?.toString() || "",
      details: formData.get("details")?.toString() || "",
    };
    onAddEntry(entry);
    event.currentTarget.reset();
    onClose();
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="popup-overlay" onClick={handleOverlayClick}>
        <div className="popup-content">
          <div className="popup-header">
            <h2>Add New Place</h2>
            <button className="close-btn" onClick={onClose}>
              X
            </button>
          </div>
          <fieldset>
            <form action="" onSubmit={onChange}>
              <div className="form-grid">
                <input
                  type="url"
                  id="image"
                  placeholder="Image Link"
                  name="src"
                />
                <input type="text" id="alt" placeholder="AltText" name="alt" />
                <input
                  type="text"
                  id="country"
                  placeholder="Country"
                  name="country"
                />
                <input
                  type="url"
                  id="locationLink"
                  placeholder="Location Link"
                  name="location"
                />
                <input
                  type="text"
                  id="place"
                  placeholder="Place"
                  name="place"
                />
                <input
                  type="text"
                  id="date"
                  placeholder="Date(From-To)"
                  name="date"
                />
                <textarea
                  id="details"
                  placeholder="Details of Place.."
                  name="details"
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit">Add</button>
              </div>
            </form>
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default Form;
