import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Form = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange'
  });

  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [showImageInput, setShowImageInput] = useState(false);
  const [contact,setContact]= useState("")

  useEffect(() => {
    if (location.state && location.state.data) {
      const userData = location.state.data;
      setUserData(userData);
      setValue("f_name", userData.f_name);
      setValue("l_name", userData.l_name);
      setValue("email", userData.email);
      setValue("gender", userData.gender);
      setValue("d_o_b", userData.d_o_b.substr(0, 10));
      setValue("contact",String(userData.contact));
      setValue("designation", userData.designation);
      setValue("hobbies", userData.hobbies);
      setContact(String( userData.contact))
      console.log(typeof userData.contact);
      if (userData) {
        setShowImageInput(true);
      }
    }
  }, [location.state, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    // return
    setLoading(true);
    const form = new FormData();
    form.append("f_name", data.f_name);
    form.append("l_name", data.l_name);
    form.append("email", data.email);
    form.append("password", data.password);
    form.append("gender", data.gender);
    form.append("contact", data.contact);
    form.append("d_o_b", data.d_o_b);
    form.append("designation", data.designation);
    form.append("hobbies", data.hobbies);

    if (userData) {
      form.append("fileImage", profilePicture);
    }
    try {
      let response;
      if (userData) {
        // Editing existing user
        if (data.password) {
          form.append("password", data.password);
        }
        response = await fetch(
          `http://localhost:4000/edituser/${userData.id}`,
          {
            method: "PUT",
            body: form,
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
      } else {
        setRegisterError("");
        Cookies.set("RegisterFormData", JSON.stringify(data), { expires: 7 });
        Swal.fire({
          title: "Good job!",
          text: userData
            ? "Your data has been updated successfully!"
            : "Your data has been submitted successfully!",
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
    } finally {
      setLoading(false);
    }
  };

  const onEditSubmit = async (data) => {
    // You can use the same onSubmit function for both editing and registration
    await onSubmit(data);
  };
  const hobbies= watch("hobbies",[])
  console.log(hobbies,"hobb");
  return (
    <>
      <h1>{userData ? "Edit User" : "Registration Form"}</h1>
      <div id="body">
        <div id="Div">
          <form
            onSubmit={handleSubmit(userData ? onEditSubmit : onSubmit)}
            id="formSubmit"
          >
            {showImageInput && (
              <>
                <p style={{ marginBottom: "5px" }}>Profile Picture</p>
                <input
                  type="file"
                  name="fileImage"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </>
            )}
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
                  message: "Please enter a valid email (e.g. abc@example.com)",
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
    
      <Controller
        control={control}
        name="contact"
        rules={{ required: "Mobile number is required" }} // Validation rules
        render={({ field }) => (
          <PhoneInput
            {...field}
            inputProps={{
              name: "contact",
              required: "Mobile Number is required",
            }}
            country={'in'}  // Default country code
            onChange={(contact) => {
              setValue("contact", contact); // Update form value
            }}
          />
        )}
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
                control={
                  <Checkbox
                    {...register("hobbies")}
                    value="reading"

                    checked={hobbies?.includes('reading')}

                  />
                }
                label="Reading"
              />
         
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("hobbies")}
                    value="sports"
                    // checked={Boolean(watch('hobbies')?.includes('sports'))}
                    checked={hobbies?.includes('sports')}


                  />
                }
                label="Sports"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("hobbies")}
                    value="music"
                    // checked={Boolean(watch('hobbies')?.includes('music'))}
                    checked={hobbies?.includes('music')}

                  />
                }
                label="Music"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("hobbies")}
                    value="writing"
                    // checked={Boolean(watch('hobbies')?.includes('writing'))}
                    checked={hobbies?.includes('writing')}



                  />
                }
                label="Writing"
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
