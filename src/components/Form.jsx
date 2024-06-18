import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import "../../src/assets/css/design.css";
// import { useNavigate } from "react-router-dom";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm({
    mode:'all'
  });
  const [registerError, setRegisterError] = useState("");
  // const navigate = useNavigate();
  // const password = watch("password", ""); // Watch the password input
const [gender,setGender]=useState("")
// const [mobile,setMobile]=useState("")
  const onSubmit = (data) => {
    const obj = {
      firstname: data.fname,
      lastname: data.lname,
      email: data.email,
      password: data.password,
      gender:gender,
      mobile:data.mobile,
      dob:data.dob,
      designation:data.designation,
      hobbies: data.hobbies
    };
    if (
      !data.fname ||
      !data.lname ||
      !data.email ||
      !data.password ||
      !data.confirmPassword||
      !gender || !data.mobile ||!data.dob ||!data.designation ||!data.hobbies
    ) {
      setRegisterError("Please enter all fields");
    } else if (data.password !== data.confirmPassword) {
      setRegisterError("Passwords do not match");
    } else {
      setRegisterError("");
      localStorage.setItem("RegisterFormData", JSON.stringify(obj));
      // navigate('/login')
    }
  };

  return (
    <>
      <div id="body">
        <div id="Div">
          <form onSubmit={handleSubmit(onSubmit)} id="formSubmit">
            <div style={
              {
                display: 'flex',
                flexDirection: 'column',
                
                // padding: '20px'
              }
            }>

              <TextField
                label="First Name"
                name="fname"
                type="text"
                placeholder="First Name"
                variant="standard"
                {...register("fname", {
                  required: "First Name is required",
                  minLength: {
                    value: 5,
                    message: "First name must be at least 5 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "First name must not exceed 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "First Name can contain only letters; Enter a valid name",
                  },
                })}
                // onBlur={() => trigger("fname")}
              />
              {errors.fname && (
                <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                  {errors.fname.message}
                </span>
              )}
              <TextField
                label="Last Name"
                name="lname"
                type="text"
                placeholder="Last Name"
                variant="standard"
                {...register("lname", {
                  required: "Last Name is required",
                  minLength: {
                    value: 5,
                    message: "Last name must be at least 5 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Last name must not exceed 20 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Last Name can contain only letters; Enter a valid name",
                  },
                })}
                // onBlur={() => trigger("lname")}
              />
              {errors.lname && (
                <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                  {errors.lname.message}
                </span>
              )}


              <div style={{
                // backgroundColor:'green'
                display: 'flex', flexDirection: 'column', justifyContent: 'center'
              }}>

                <TextField
                  label="Email"
                  // name='email'
                  type="text"
                  variant="standard"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]{1,3})+$/,
                      message: "Please enter a valid email (abc@example.com)",
                    },
                  })}
                  // onBlur={() => trigger("email")}
                />
                {errors.email && (
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {errors.email.message}
                  </span>
                )}
              </div>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{ flexDirection: 'row'}}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  {...register("gender", { required: "Please select gender" })}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  {...register("gender", { required: "Please select gender" })}
                />
              </RadioGroup>
              {errors.gender && (
                <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                  {errors.gender.message}
                </span>
              )}
              <TextField
                label="Date of Birth"
                type="date"
                variant="standard"
                {...register("dob", {
                  required: "Date of Birth is required",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const currentDate = new Date();
                    const minDate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());
                    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
                    return selectedDate >= minDate && selectedDate <= maxDate || "You must be at least 18 years old";
                  },
                })}
                // onBlur={() => trigger("dob")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors.dob && (
                <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                  {errors.dob.message}
                </span>
              )}
                  <TextField
                label="Mobile Number"
                name="mobile"
                type="tel"
                maxLength='10'
                variant="standard"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
                // onBlur={() => trigger("mobile")}
              />
              {errors.mobile && (
                <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                  {errors.mobile.message}
                </span>
              )}
                <FormLabel>Designation</FormLabel>
               <FormControl
                variant="standard"
                style={{ minWidth: 120 }}
              >
                <Select
                  // value={data.designation}
                  {...register("designation", {
                    required: "Please select a designation",
                    // validate: (value) =>
                    //   value !== "" || "Please select a designation",
                  })}
                >
                  <MenuItem value="">Select Designation</MenuItem>
                  <MenuItem value="developer">Developer</MenuItem>
                  <MenuItem value="designer">Designer</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              {errors.designation && (
                <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                  {errors.designation.message}
                </span>
              )}
                {/* <FormLabel>Hobbies</FormLabel> */}
                <FormGroup>
                <FormLabel>Hobbies</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("hobbies", { required: "Please select at least one hobby" })}
                      value="reading"
                    />
                  }
                  label="Reading"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("hobbies", { required: "Please select at least one hobby" })}
                      value="sports"
                    />
                  }
                  label="Sports"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("hobbies", { required: "Please select at least one hobby" })}
                      value="music"
                    />
                  }
                  label="Music"
                />
                {errors.hobbies && (
                  <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                    {errors.hobbies.message}
                  </span>
                )}
              </FormGroup>


              <TextField
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  maxLength: {
                    value: 15,
                    message: "Password must not exceed 15 characters",
                  },
                  validate: {
                    containsUppercase: (value) =>
                      /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                    containsLowercase: (value) =>
                      /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                    containsDigit: (value) =>
                      /\d/.test(value) || "Password must contain at least one digit",
                    containsSpecialChar: (value) =>
                      /[@.#$!%*?&]/.test(value) ||
                      "Password must contain at least one special character among @.#$!%*?&",
                  },
                })}
                type="password"
                label="Password"
                // name='password'
                variant="standard"
                // onBlur={() => trigger("password")}
              />
              {errors.password && (
                <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                  {errors.password.message}
                </span>
              )}
              <TextField
                type="password"
                // name='confirmPassword'
                label="Confirm Password"
                variant="standard"
                placeholder=" Confirm Password"
                {...register("confirmPassword", {
                  required: "Please enter the password again.",
                  // validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                  {errors.confirmPassword.message}
                </span>
              )}
              
              <Button id="submitBtn" variant="contained" type="submit">
                SUBMIT
              </Button>
              {registerError && (
                <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                  {registerError}
                </span>
              )}
            </div>


          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
