import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Form() {
  const classes = useStyles();
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneno: null,
    gender: null,
    hobbies: [],
    type: "",
  });
  const [error, setError] = useState({
    message: "",
    type: "",
    status: null,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("datafront===========", data);
    await axios
      .post("http://localhost:5000/api/user", data)
      .then((res) => setError(res))
      .catch((err) => {
        setError(err.response.data);
      });
  };
  console.log("error===============", error);
  const handleRadio = (e) => {
    if (e.target.checked === true) {
      setData({
        ...data,
        hobbies: [...data.hobbies, e.target.value],
      });
    } else {
      const index = data.hobbies.indexOf(e.target.value);
      data.hobbies.splice(index, 1);
    }
    console.log("data+++++++++", data);
  };
  return (
    <div>
      {error?.data?.type === "pass" ? alert(`${error.data.message}`) : null}
      <div className={classes.form}>
        <h2>Form</h2>
        <div>
          <form className={classes.root}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={data.name}
              onFocus={() => setError({ ...error, message: "" })}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            />
            {error.type === "name" ? (
              <Typography color="error" variant="body2">
                {error.message}
              </Typography>
            ) : null}

            <TextField
              id="Email"
              label="Email"
              variant="outlined"
              value={data.email}
              onFocus={() => setError({ ...error, message: "" })}
              onChange={(e) => {
                console.log(e);
                setData({ ...data, email: e.target.value });
              }}
            />
            {error.type === "email" ? (
              <Typography color="error" variant="body2">
                {error.message}
              </Typography>
            ) : null}
            <TextField
              id="Number"
              label="Phone no"
              type="number"
              variant="outlined"
              value={data.phoneno}
              onFocus={() => setError({ ...error, message: "" })}
              onChange={(e) => {
                setData({ ...data, phoneno: e.target.value });
              }}
            />
            {error.type === "phoneno" ? (
              <Typography color="error" variant="body2">
                {error.message}
              </Typography>
            ) : null}
            <FormControl
              component="fieldset"
              onChange={(e) => {
                setData({ ...data, gender: e.target.value });
              }}
            >
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender1">
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            {error.type === "gender" ? (
              <Typography color="error" variant="body2">
                {error.message}
              </Typography>
            ) : null}
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Hobbies</FormLabel>

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="reading"
                      onChange={handleRadio}
                      name="reading"
                    />
                  }
                  label="Reading"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="travelling"
                      onChange={handleRadio}
                      name="traveling"
                    />
                  }
                  label="Traveling"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="listening"
                      onChange={handleRadio}
                      name="listening"
                    />
                  }
                  label="Listening to music"
                />
              </FormGroup>
              <FormHelperText>can select multiple</FormHelperText>
            </FormControl>
            {error.type === "hobbies" ? (
              <Typography color="error" variant="body2">
                {error.message}
              </Typography>
            ) : null}

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
