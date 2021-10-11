import formJSON from "./formElement.json";
import { useState, useEffect } from "react";
import Element from "./components/Element";
import { FormContext } from "./FormContext";
import Collapsible from "./components/Accordion/Accordion";
import "./styles.css";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
function App() {
  const [elements, setElements] = useState(null);
  useEffect(() => {
    setElements(formJSON[0]);
  }, []);
  const { fields, page_label } = elements ?? {};
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(elements);
  };
  const handleChange = (id, event) => {
    const newElements = { ...elements };
    newElements.fields.forEach((field) => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          case "checkbox":
            field["field_value"] = event.target.checked;
            break;

          default:
            field["field_value"] = event.target.value;
            break;
        }
      }
      setElements(newElements);
    });
    console.log(elements);
  };
  return (
    <>
      <Collapsible label="Simple Search ( By default records from None , till None, will be searched )">
        <FormContext.Provider value={{ handleChange }}>
          <div className="App container">
            <h3>{page_label}</h3>
            <form>
              {fields
                ? fields.map((field, i) => <Element key={i} field={field} />)
                : null}
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </FormContext.Provider>
      </Collapsible>

      <Collapsible label="Second collapsible for position formatting">
        <div>
          {/* const dateValue: Date = new Date( new Date().getFullYear(), new
          Date().getMonth(), 14 ); const startDate: Date = new Date( new
          Date().getFullYear(), new Date().getMonth(), 10 ); const enddate: Date
          = new Date( new Date().getFullYear(), new Date().getMonth(), 20 );
          <DatePickerComponent
            placeholder="Enter Date"
            value={dateValue}
            min={startDate}
            max={enddate}
            format="dd-MMM-yy"
            // Uncomment below properties to show month picker. Note that, range restiction (min and max properties) should be removed for this case.
            // start="Year"
            // depth="Year"
          ></DatePickerComponent> */}
        </div>
      </Collapsible>

      <Collapsible label="Third collapsible for position formatting"></Collapsible>
    </>
  );
}

export default App;
