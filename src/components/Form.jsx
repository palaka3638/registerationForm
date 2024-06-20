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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      gender: "male",
    },
  });
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const password = watch("password", ""); // Watch the password input
  const onSubmit = async (data) => {
    const obj = {
      firstname: data.fname,
      lastname: data.lname,
      email: data.email,
      password: data.password,
      gender: data.gender,
      contact: data.contact,
      dob: data.dob,
      designation: data.designation,
      hobbies: data.hobbies,
    };
    localStorage.setItem("RegisterFormData", JSON.stringify(obj));
    const response = await fetch("http://localhost:3030/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const formData = await response.json();
    if (data.status === 404) {
      setRegisterError("Student already exists!!");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Student already exists!!!",
        footer:
          '<a href="#">Register yourself by filling the correct form?</a>',
      });
    } else {
      Swal.fire({
        title: "Good job!",
        text: "You data has been registered",
        icon: "success",
      });
      console.log("FormData", formData);
      navigate("/home");
    }
  };

  return (
    <>
      <h1>Registration Form</h1>
      <div id="body">
        <div id="Div">
          <form onSubmit={handleSubmit(onSubmit)} id="formSubmit">
            <TextField
              label="First Name"
              name="fname"
              type="text"
              placeholder="First Name"
              variant="standard"
              {...register("fname", {
                required: "First Name is required",
                pattern: {
                  value: /^[A-Za-z]{3,}$/,
                  message: "First Name can contain only letters",
                },
                maxLength: {
                  value: 20,
                  message: "First name must not exceed 20 characters",
                },
              })}
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

                maxLength: {
                  value: 20,
                  message: "Last name must not exceed 20 characters",
                },
                pattern: {
                  value: /^[A-Za-z]{5,}$/,
                  message: "Last Name can contain only letters ",
                },
              })}
            />
            {errors.lname && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.lname.message}
              </span>
            )}
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

            <FormLabel style={{ marginTop: "15px", marginRight: "20px" }}>
              Gender
            </FormLabel>
            <FormControl>
              <div
                style={{
                  display: "flex",
                  marginTop: "-21px",
                  marginLeft: "60px",
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
            {errors.gender && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.gender.message}
              </span>
            )}
            <FormLabel style={{ marginTop: "15px", marginRight: "20px" }}>
              Date Of Birth
            </FormLabel>
            <TextField
              style={{
                marginLeft: "110px",
                marginTop: "-30px",
              }}
              // label="Date of Birth"
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
              name="contact"
              type="tel"
              maxLength={10}
              variant="standard"
              {...register("contact", {
                required: "Mobile number is required",
                pattern: {
                  // value: /^\d{10}$/,
                  value: /^(?!0+$)\d{10}$/,

                  message: "Please enter a valid 10-digit mobile number",
                },
              })}
            />
            {errors.contact && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.contact.message}
              </span>
            )}
            <FormLabel style={{ marginTop: "20px" }}>Designation</FormLabel>
            <FormControl variant="standard">
              <Select
               defaultValue="Student"
                style={{
                  marginTop: "-35px",
                  marginLeft: "100px",
                }}
                {...register("designation", {
                  required: "Please select a designation",
                  validate: (value) =>
                    value !== "" || "Please select a designation",
                })}
              >
                <MenuItem value="">Select Designation</MenuItem>
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="designer">Designer</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            {errors.designation && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.designation.message}
              </span>
            )}
            <FormLabel
              style={{
                marginTop: "10px",
              }}
            >
              Hobbies
            </FormLabel>
            <FormGroup
              style={{
                marginLeft: "80px",
                marginTop: "-30px",
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
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.confirmPassword.message}
              </span>
            )}
            <div
              style={{
                // border:'2px solid blue',
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button id="submitBtn" variant="contained" type="submit">
                SUBMIT
              </Button>
              {registerError && (
                <span
                  style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
                >
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
