import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "../../src/assets/css/design.css";
// import { useNavigate } from "react-router-dom";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      gender: "male",
    },
  });
  const [registerError, setRegisterError] = useState("");
  // const navigate = useNavigate();
  // const password = watch("password", ""); // Watch the password input
  const onSubmit = async(data) => {
    const obj = {
      firstname: data.fname,
      lastname: data.lname,
      email: data.email,
      password: data.password,
      gender: data.gender,
      mobile: data.mobile,
      dob: data.dob,
      designation: data.designation,
      hobbies: data.hobbies,
    };
    localStorage.setItem("RegisterFormData", JSON.stringify(obj));
    const response = await fetch("http://localhost:3030/register",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const formData = await response.json();
    if(data.status===404){
      setRegisterError("Student already exists!!")
    }
    else{
      // navigate("/home")
    }
  }
// async function registerHandle(e){
// e.preventDefault();
// if (
//   !data.fname ||
//   !data.lname ||
//   !data.email ||
//   !data.password ||
//   !data.confirmPassword ||
//   !data.gender ||
//   !data.mobile ||
//   !data.dob ||
//   !data.designation ||
//   !data.hobbies
// ) {
//   setRegisterError("Please enter all fields");
// } else if (data.password !== data.confirmPassword) {
//   setRegisterError("Passwords do not match");
// } else {
//   setRegisterError("");
 
//   // navigate('/login')
// }
      
//     }
    
  

  return (
    <>
      <div id="body">
        <h1>Registration Form</h1>
        {/* <div id="Div"> */}
        <form onSubmit={handleSubmit(onSubmit)} id="formSubmit">
          <div
            style={{
              // border:'5px solid yellow',
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
              marginLeft: "250px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
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
                    message: "First Name can contain only letters",
                  },
                })}
                // onBlur={() => trigger("fname")}
              />
              {errors.fname && (
                <span
                  style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                >
                  {errors.fname.message}
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "450px",
              }}
            >
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
                    message:
                      "Last Name can contain only letters ",
                  },
                })}
              />
              {errors.lname && (
                <span
                  style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                >
                  {errors.lname.message}
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",

                flexDirection: "column",
                marginTop: "10px",
                marginLeft: "250px",
                width: "40%",
              }}
            >
              <div style={{}}>
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
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginRight: "380px",
                marginTop: "21px",
                width: "30%",
              }}
            >
              <FormLabel style={{ marginTop: "5px", marginRight: "20px" }}>
                Gender
              </FormLabel>
              <FormControl>
                <div
                  style={{
                    display: "flex",
                    marginTop: "6px",
                  }}
                >
                  <div className="radio">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      {...register("gender", {})}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="radio">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      {...register("gender", {
                        required: "Please select gender",
                      })}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  {errors.gender && (
                    <span
                      style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                    >
                      {errors.gender.message}
                    </span>
                  )}
                </div>
              </FormControl>
              {/* </FormControl> */}
              {errors.gender && (
                <span
                  style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                >
                  {errors.gender.message}
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                // border:'2px solid red',
                marginLeft: "250px",
                marginTop: "10px",
                width: "13%",
              }}
            >
              <TextField
                label="Date of Birth"
                type="date"
                variant="standard"
                {...register("dob", {
                  required: "Date of Birth is required",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const currentDate = new Date();
                    const minDate = new Date(
                      currentDate.getFullYear() - 100,
                      currentDate.getMonth(),
                      currentDate.getDate()
                    );
                    const maxDate = new Date(
                      currentDate.getFullYear() - 18,
                      currentDate.getMonth(),
                      currentDate.getDate()
                    );
                    return (
                      (selectedDate >= minDate && selectedDate <= maxDate) ||
                      "You must be at least 18 years old"
                    );
                  },
                })}
                // onBlur={() => trigger("dob")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors.dob && (
                <span
                  style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                >
                  {errors.dob.message}
                </span>
              )}
            </div>

            <div
              style={{
                // marginRight:'100px',
                // border:'2px solid red',
                marginLeft: "200px",
                marginTop: "10px",
                width: "15%",
              }}
            >
              <TextField
                label="Mobile Number"
                name="mobile"
                type="tel"
                maxLength="10"
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
                <span
                  style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                >
                  {errors.mobile.message}
                </span>
              )}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                marginTop: "20px",
                marginLeft: "250px",
                width: "20%",
              }}
            >
              <FormLabel style={{}}>Designation</FormLabel>
              <FormControl
                variant="standard"
                style={{
                  minWidth: 120,
                  marginTop: "-12px",
                  marginLeft: "10px",
                }}
              >
                <Select
                style={{
                  marginTop:'35px',
                  marginLeft:'-95px'
                }}
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
                <span
                  style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                >
                  {errors.designation.message}
                </span>
              )}
            </div>
            <div
              style={{
                // border:'2px solid red',
                marginTop: "20px",
                marginLeft: "65px",
                width: "20%",
              }}
            >
              <FormLabel   style={{
                  marginLeft: "50px",
                }}>Hobbies</FormLabel>
              <FormGroup
                style={{
                  marginLeft: "120px",
                  marginTop: "-35px",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("hobbies", {
                        required: "Please select at least one hobby",
                      })}
                      value="reading"
                    />
                  }
                  label="Reading"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("hobbies", {
                        required: "Please select at least one hobby",
                      })}
                      value="sports"
                    />
                  }
                  label="Sports"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("hobbies", {
                        required: "Please select at least one hobby",
                      })}
                      value="music"
                    />
                  }
                  label="Music"
                />
                {errors.hobbies && (
                  <span
                    style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                  >
                    {errors.hobbies.message}
                  </span>
                )}
              </FormGroup>
            </div>
          </div>

          <div
            style={{
              // border:'2px solid blue',
              marginLeft: "250px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                // border:'2px solid red',
                display: "flex",
                flexDirection: "column",
              }}
            >
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
                      /[A-Z]/.test(value) ||
                      "Password must contain at least one uppercase letter",
                    containsLowercase: (value) =>
                      /[a-z]/.test(value) ||
                      "Password must contain at least one lowercase letter",
                    containsDigit: (value) =>
                      /\d/.test(value) ||
                      "Password must contain at least one digit",
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
                <span
                  style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                >
                  {errors.password.message}
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "445px",
              }}
            >
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
                <span
                  style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                >
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              // border:'2px solid blue',
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button id="submitBtn" variant="contained" type="submit" >
              SUBMIT
            </Button>
            {registerError && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {registerError}
              </span>
            )}
          </div>
        </form>
        {/* </div> */}
      </div>
      {/* </div> */}
    </>
  );
};

export default Form;
