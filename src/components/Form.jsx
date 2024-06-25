import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
} from "@mui/material";
import "../../src/assets/css/design.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "all",
  });

  const location = useLocation();
  const navigate = useNavigate();
  //states
  const [loading, setLoading] = useState(false); //state for loader
  const [registerError, setRegisterError] = useState(""); //state for setting up the errors in input fields
  const [showPassword, setShowPassword] = useState(false); //state for toggling the visibility on & off for passowrd
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); //state for toggling the visibility on & off for ConfirmPassowrd
  const [userData, setUserData] = useState(null); // State to store user data for editing
  const[profilePicture, setProfilePicture]=useState(null) //state for setting the profile picture
  useEffect(() => {
    // Check if there is state data in location indicating edit functionality
    if (location.state && location.state.data) {
      const userData = location.state.data;
      setUserData(userData); // Set user data for editing
      setValue("f_name", userData.f_name); // Set default values in the form fields
      setValue("l_name", userData.l_name);
      setValue("email", userData.email);
      setValue("gender", userData.gender);
      setValue("d_o_b", userData.d_o_b);
      setValue("countryCode", userData.countryCode);
      setValue("contact", userData.contact);
      setValue("designation", userData.designation);
    }
  }, [location.state, setValue]);



  const onSubmit = async (data) => {
    setLoading(true);
    const obj = {
      firstname: data.f_name,
      lastname: data.l_name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      contact: data.contact,
      dob: data.d_o_b,
      countryCode: data.countryCode,
      designation: data.designation,
      hobbies: data.hobbies,
      profilePicture:data.fileImage,
    };
    if (userData) {
      if (data.password) {
        obj.password = data.password;
      } else {
        obj.password = data.password;
      }
    }

    Cookies.set("RegisterFormData", JSON.stringify(obj), { expires: 7 });

    try {
      let response;
      if (userData) {
        // Editing existing user
         response=  await fetch(
          `http://localhost:4000/edituser/${userData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      } else {
        // Creating new user
        response = await fetch("http://localhost:4000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      const formData = await response.json();
      if (response.status !== 200) {
        console.error("Error submitting form:", formData);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, Please try again later",
        });
        // setRegisterError("Error submitting form. Please try again later.");
        // return;
      }
      else { 
        setRegisterError("");
        Swal.fire({
          title: "Good job!",
          text: "Your data has been submitted successfully!",
          icon: "success",
        });
      navigate("/home");

      }
      if (userData) {
        Swal.fire({
          title: "yayyy!!!",
          text: "Your data has been updated successfully!",
          icon: "success",
        });
        navigate("/home");
      } 
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, Please try again later",
      });
      // setRegisterError("Error submitting form. Please try again later.");

    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <h1>Registration Form</h1>
      <div id="body">
        <div id="Div">
          <form onSubmit={handleSubmit(onSubmit)} id="formSubmit">
            <FormLabel>Profile Picture</FormLabel>
            <input type="file" name="fileImage" 
            accept="image"
            onChange={(e)=>setProfilePicture(e.target.files[0])} 
            {...register('fileImage',{message:'Please select an image'})}></input>
            {errors.fileImage && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.fileImage.message}
              </span>
            )}

            <TextField
              label="First Name"
              name="f_name"
              type="text"
              placeholder="First Name"
              variant="standard"
              {...register("f_name", {
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
            {errors.f_name && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.f_name.message}
              </span>
            )}

            <TextField
              label="Last Name"
              name="l_name"
              type="text"
              placeholder="Last Name"
              variant="standard"
              {...register("l_name", {
                required: "Last Name is required",
                maxLength: {
                  value: 20,
                  message: "Last name must not exceed 20 characters",
                },
                pattern: {
                  value: /^[A-Za-z]/,
                  message: "Last Name can contain only letters ",
                },
              })}
            />
            {errors.l_name && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.l_name.message}
              </span>
            )}

            <TextField
              label="Email"
              type="text"
              variant="standard"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]{1,3})+$/,
                  message:
                    "Please enter a valid email (e.g. abc@example.com)",
                },
              })}
            />
            {errors.email && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
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
              style={{ marginLeft: "110px", marginTop: "-30px" }}
              type="date"
              name="d_o_b"
              variant="standard"
              {...register("d_o_b", {
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
              InputLabelProps={{ shrink: true }}
            />
            {errors.d_o_b && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.d_o_b.message}
              </span>
            )}

            <select
              style={{ width: "30%", marginTop: "30px" }}
              id="countryCode"
              name="countryCode"
              {...register("countryCode", {
                message: "Country code is required",
              })}
            >
              <option value="+1">+1 (USA)</option>
              <option value="+91">+91 (India)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+49">+49 (Germany)</option>
            </select>
            {errors.countryCode && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.countryCode.message}
              </span>
            )}
            <TextField
              style={{ marginTop: "-45px", marginLeft: "100px" }}
              label="Mobile Number"
              name="contact"
              type="tel"
              maxLength={10}
              variant="standard"
              {...register("contact", {
                required: "Mobile number is required",
                pattern: {
                  value: /^(?!0+$)\d{5}-?\d{5}$/,
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
                defaultValue="student"
                placeholder="Student"
                style={{ marginTop: "-35px", marginLeft: "100px" }}
                {...register("designation", {
                  required: "Please select a designation",
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

            <FormLabel style={{ marginTop: "10px" }}>Hobbies</FormLabel>
            <FormGroup style={{ marginLeft: "80px", marginTop: "-30px" }}>
              <FormControlLabel
                control={<Checkbox {...register("hobbies")} value="reading" />}
                label="Reading"
              />
              <FormControlLabel
                control={<Checkbox {...register("hobbies")} value="sports" />}
                label="Sports"
              />
              <FormControlLabel
                control={<Checkbox {...register("hobbies")} value="music" />}
                label="Music"
              />
            </FormGroup>
            {errors.hobbies && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.hobbies.message}
              </span>
            )}
            {!userData && (
              <TextField
                placeholder="Password"
                disabled={!!userData}
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
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
            )}
            {errors.password && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.password.message}
              </span>
            )}
            {!userData && (
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                disabled={!!userData}
                variant="standard"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please enter the password again.",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
            )}
            {errors.confirmPassword && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.confirmPassword.message}
              </span>
            )}

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button id="submitBtn" variant="contained" type="submit">
                {userData ? "UPDATE" : "SUBMIT"}
              </Button>
              {loading && <CircularProgress style={{ margin: "0px" }} />}
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
