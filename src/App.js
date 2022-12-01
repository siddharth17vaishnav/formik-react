import { Field, useFormik } from "formik";
import * as Yup from "yup";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import InsertLink from "@mui/icons-material/InsertLink";
import { useRef, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
function App() {
  const [selected, setSelected] = useState("options");

  const formikSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required"),
    option: Yup.string().oneOf(["red", "blue"]).required("requried"),
    course: Yup.string().required("Select Year"),
  });
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
      option: "",
      course: "",
    },
    validationSchema: formikSchema,
  });
  console.log(values);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    console.log(event.target.value);
    event.target.value = null;
  };

  const yearOptions = [{ label: 2022 }, { label: 2023 }];
  console.log(values);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={values.email}
          onChange={handleChange}
          id="email"
        />
        <p style={{ color: "red" }}>{errors?.email}</p>
        <TextField
              select
              id="course"
              label="Course Category"              
              margin="dense"
              variant="outlined"
              fullWidth
              value={values.course}
              onChange={handleChange}
            >
              {yearOptions.map(option => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>

        <p>{errors.options}</p>
        <button type="submit">submit</button>
      </form>
      <div>
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
        />
        <InsertLink onClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
