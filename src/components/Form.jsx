// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import {
//   Button,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   FormLabel,
//   IconButton,
//   MenuItem,
//   Select,
//   TextField,
//   CircularProgress,
// } from "@mui/material";
// import "../../src/assets/css/design.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import Swal from "sweetalert2";

// const Form = () => {
//   const location = useLocation();
//   const [userToEdit, setUserToEdit] = useState(null);
//   const [value, setValue] = useState(null);
//   // const handleEditClick = (user) => {
//   //   navigate("/register", { state: { data: user } });
//   //   console.log(user, "<-----user");
//   // };
//   // useEffect(() => {}, []);
//   useEffect(() => {
//     //check if there is state data in location indicating for edit functionality
//     if (location.state && location.state.data) {
//       const userData = location.state.data;
//       if (userData) {
//         //populating the fields for editing with userData in formState
//         setValue(userData);
//       }
//     }
//   }, [location.state]);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     mode: "all",
//     defaultValues:
//       location.state && location.state.data
//         ? location.state.data
//         : {
//             gender: "male",
//           },
//   });
//   console.log(value, "value");
//   const [registerError, setRegisterError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const password = watch("password", ""); // Watch the password input
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserToEdit((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };
//   const handleEditSubmit = async (data) => {
//     if (!userToEdit) return;

//     try {
//       const response = await fetch(
//         `http://localhost:3030/edituser/${userToEdit.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       if (!response.ok) {
//         console.log("Error updating user");
//         return;
//       }

//       // Fetch updated data after successful edit
//       await fetchData();
//       setEditDialogOpen(false);
//       setUserToEdit(null);
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
//     const obj = {
//       firstname: data.f_name,
//       lastname: data.lname,
//       email: data.email,
//       password: data.password,
//       gender: data.gender,
//       contact: data.contact,
//       dob: data.dob,
//       designation: data.designation,
//       hobbies: data.hobbies,
//     };
//     // localStorage.setItem("RegisterFormData", JSON.stringify(obj));
//     Cookies.set("RegisterFormData", JSON.stringify(obj), { expires: 7 });
//     try {
//       const response = await fetch("http://localhost:3030/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const formData = await response.json();
//       if (data.status === 404) {
//         setRegisterError("Student already exists!!");
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Student already exists!!!",
//           footer:
//             '<a href="#">Register yourself by filling the correct form?</a>',
//         });
//       } else {
//         Swal.fire({
//           title: "Good job!",
//           text: "You data has been registered",
//           icon: "success",
//         });
//         console.log("FormData", formData);
//         navigate("/home");
//       }
//     } catch (error) {
//       console.log("error submitting form :", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <h1>Registration Form</h1>
//       <div id="body">
//         <div id="Div">
//           <form onSubmit={handleSubmit(onSubmit)} id="formSubmit">
//             <TextField
//               label="First Name"
//               name="f_name"
//               type="text"
//               placeholder="First Name"
//               variant="standard"
//               // defaultValue={userToEdit? userToEdit.firstname:""}
//               {...register("f_name", {
//                 required: "First Name is required",
//                 pattern: {
//                   value: /^[A-Za-z]{3,}$/,
//                   message: "First Name can contain only letters",
//                 },
//                 maxLength: {
//                   value: 20,
//                   message: "First name must not exceed 20 characters",
//                 },
//               })}
//             />
//             {errors.fname && (
//               <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
//                 {errors.fname.message}
//               </span>
//             )}

//             <TextField
//               label="Last Name"
//               name="lname"
//               type="text"
//               placeholder="Last Name"
//               variant="standard"
//               // defaultValue={userToEdit? userToEdit.lastname:""}

//               {...register("lname", {
//                 required: "Last Name is required",

//                 maxLength: {
//                   value: 20,
//                   message: "Last name must not exceed 20 characters",
//                 },
//                 pattern: {
//                   value: /^[A-Za-z]/,
//                   message: "Last Name can contain only letters ",
//                 },
//               })}
//             />
//             {errors.lname && (
//               <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
//                 {errors.lname.message}
//               </span>
//             )}
//             <TextField
//               label="Email"
//               // name='email'
//               type="text"
//               variant="standard"
//               // defaultValue={userToEdit? userToEdit.email:""}
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value:
//                     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]{1,3})+$/,
//                   message: "Please enter a valid email (abc@example.com)",
//                 },
//               })}
//             />
//             {errors.email && (
//               <span
//                 style={{
//                   color: "red",
//                   fontSize: 12,
//                   fontWeight: "bold",
//                   display: "flex",
//                   alignItems: "center",
//                   textAlign: "center",
//                 }}
//               >
//                 {errors.email.message}
//               </span>
//             )}

//             <FormLabel style={{ marginTop: "15px", marginRight: "20px" }}>
//               Gender
//             </FormLabel>
//             <FormControl>
//               <div
//                 style={{
//                   display: "flex",
//                   marginTop: "-21px",
//                   marginLeft: "60px",
//                 }}
//               >
//                 <div className="radio">
//                   <input
//                     type="radio"
//                     id="male"
//                     name="gender"
//                     value="male"
//                     {...register("gender", {})}
//                   />
//                   <label htmlFor="male">Male</label>
//                 </div>
//                 <div className="radio">
//                   <input
//                     type="radio"
//                     id="female"
//                     name="gender"
//                     value="female"
//                     {...register("gender", {
//                       required: "Please select gender",
//                     })}
//                   />
//                   <label htmlFor="female">Female</label>
//                 </div>
//                 {errors.gender && (
//                   <span
//                     style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
//                   >
//                     {errors.gender.message}
//                   </span>
//                 )}
//               </div>
//             </FormControl>
//             {errors.gender && (
//               <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
//                 {errors.gender.message}
//               </span>
//             )}
//             <FormLabel style={{ marginTop: "15px", marginRight: "20px" }}>
//               Date Of Birth
//             </FormLabel>
//             <TextField
//               style={{
//                 marginLeft: "110px",
//                 marginTop: "-30px",
//               }}
//               // label="Date of Birth"
//               type="date"
//               variant="standard"
//               // defaultValue={Cookies.get(userToEdit.dob)}
//               {...register("dob", {
//                 required: "Date of Birth is required",
//                 validate: (value) => {
//                   const selectedDate = new Date(value);
//                   const currentDate = new Date();
//                   const minDate = new Date(
//                     currentDate.getFullYear() - 100,
//                     currentDate.getMonth(),
//                     currentDate.getDate()
//                   );
//                   const maxDate = new Date(
//                     currentDate.getFullYear() - 18,
//                     currentDate.getMonth(),
//                     currentDate.getDate()
//                   );
//                   return (
//                     (selectedDate >= minDate && selectedDate <= maxDate) ||
//                     "You must be at least 18 years old"
//                   );
//                 },
//               })}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//             {errors.dob && (
//               <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
//                 {errors.dob.message}
//               </span>
//             )}
//             {/* <label htmlFor="countryCode">Country Code</label> */}
//             <select
//               style={{
//                 width: "30%",
//                 marginTop: "30px",
//                 // marginLeft:'20px'
//               }}
//               id="countryCode"
//               {...register("countryCode", {
//                 required: "Country code is required",
//               })}
//             >
//               <option value="+1">+1 (USA)</option>
//               <option value="+91">+91 (India)</option>
//               <option value="+61">+61 (Australia)</option>
//               <option value="+49">+49 (Germany)</option>
//             </select>
//             <TextField
//               style={{
//                 marginTop: "-45px",
//                 marginLeft: "100px",
//                 // width:'50%'
//               }}
//               label="Mobile Number"
//               name="contact"
//               type="tel"
//               maxLength={10}
//               variant="standard"
//               {...register("contact", {
//                 required: "Mobile number is required",
//                 pattern: {
//                   // value: /^\d{10}$/,
//                   value: /^(?!0+$)\d{10}$/,

//                   message: "Please enter a valid 10-digit mobile number",
//                 },
//               })}
//             />
//             {errors.contact && (
//               <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
//                 {errors.contact.message}
//               </span>
//             )}
//             <FormLabel style={{ marginTop: "20px" }}>Designation</FormLabel>
//             <FormControl variant="standard">
//               <Select
//                 defaultValue="student"
//                 placeholder="Student"
//                 style={{
//                   marginTop: "-35px",
//                   marginLeft: "100px",
//                 }}
//                 {...register("designation", {
//                   required: "Please select a designation",
//                   validate: (value) =>
//                     value !== "" || "Please select a designation",
//                 })}
//               >
//                 <MenuItem value="">Select Designation</MenuItem>
//                 <MenuItem value="developer">Developer</MenuItem>
//                 <MenuItem value="designer">Designer</MenuItem>
//                 <MenuItem value="manager">Manager</MenuItem>
//                 <MenuItem value="student">Student</MenuItem>
//                 <MenuItem value="other">Other</MenuItem>
//               </Select>
//             </FormControl>
//             {errors.designation && (
//               <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
//                 {errors.designation.message}
//               </span>
//             )}
//             <FormLabel
//               style={{
//                 marginTop: "10px",
//               }}
//             >
//               Hobbies
//             </FormLabel>
//             <FormGroup
//               style={{
//                 marginLeft: "80px",
//                 marginTop: "-30px",
//               }}
//             >
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     {...register("hobbies", {
//                       required: "Please select at least one hobby",
//                     })}
//                     value="reading"
//                   />
//                 }
//                 label="Reading"
//               />
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     {...register("hobbies", {
//                       required: "Please select at least one hobby",
//                     })}
//                     value="sports"
//                   />
//                 }
//                 label="Sports"
//               />
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     {...register("hobbies", {
//                       required: "Please select at least one hobby",
//                     })}
//                     value="music"
//                   />
//                 }
//                 label="Music"
//               />
//               <TextField variant="standard" placeholder="Others"></TextField>
//               {errors.hobbies && (
//                 <span
//                   style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
//                 >
//                   {errors.hobbies.message}
//                 </span>
//               )}
//             </FormGroup>

//             <TextField
//               placeholder="Password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 8,
//                   message: "Password must be at least 8 characters long",
//                 },
//                 maxLength: {
//                   value: 15,
//                   message: "Password must not exceed 15 characters",
//                 },
//                 validate: {
//                   containsUppercase: (value) =>
//                     /[A-Z]/.test(value) ||
//                     "Password must contain at least one uppercase letter",
//                   containsLowercase: (value) =>
//                     /[a-z]/.test(value) ||
//                     "Password must contain at least one lowercase letter",
//                   containsDigit: (value) =>
//                     /\d/.test(value) ||
//                     "Password must contain at least one digit",
//                   containsSpecialChar: (value) =>
//                     /[@.#$!%*?&]/.test(value) ||
//                     "Password must contain at least one special character among @.#$!%*?&",
//                 },
//               })}
//               type={showPassword ? "text" : "password"}
//               label="Password"
//               // name='password'
//               variant="standard"
//               InputProps={{
//                 // <-- This is where the toggle button is added, for password and the use of it is to add and icon in textfield we use of it
//                 endAdornment: (
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
//                   </IconButton>
//                 ),
//               }}
//             />
//             {errors.password && (
//               <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
//                 {errors.password.message}
//               </span>
//             )}

//             <TextField
//               type={showConfirmPassword ? "text" : "password"}
//               // name='confirmPassword'
//               label="Confirm Password"
//               variant="standard"
//               placeholder=" Confirm Password"
//               {...register("confirmPassword", {
//                 required: "Please enter the password again.",
//                 validate: (value) =>
//                   value === password || "Passwords do not match",
//               })}
//               InputProps={{
//                 // <-- This is where the toggle button is added, for password and the use of it is to add and icon in textfield we use of it
//                 endAdornment: (
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     // onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showConfirmPassword ? (
//                       <VisibilityIcon />
//                     ) : (
//                       <VisibilityOffIcon />
//                     )}
//                   </IconButton>
//                 ),
//               }}
//             />

//             {errors.confirmPassword && (
//               <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
//                 {errors.confirmPassword.message}
//               </span>
//             )}
//             <div
//               style={{
//                 // border:'2px solid blue',
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <Button id="submitBtn" variant="contained" type="submit">
//                 SUBMIT
//               </Button>
//               {loading && (
//                 <CircularProgress style={{ margin: "0px" }}></CircularProgress>
//               )}
//               {registerError && (
//                 <span
//                   style={{ color: "red", fontSize: 12, fontWeight: "bold" }}
//                 >
//                   {registerError}
//                 </span>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Form;
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
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    mode: "all",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data for editing

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
      designation: data.designation,
      hobbies: data.hobbies,
    };
    Cookies.set("RegisterFormData", JSON.stringify(obj), { expires: 7 });

    try {
      let response;
      if (userData) {
        // Editing existing user
        response = await fetch(`http://localhost:3030/edituser/${userData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        // Creating new user
        response = await fetch("http://localhost:3030/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      const formData = await response.json();
      if (!response.ok) {
        console.error("Error submitting form:", formData);
        setRegisterError("Error submitting form. Please try again later.");
        return;
      }

      Swal.fire({
        title: "Good job!",
        text: "Your data has been submitted successfully!",
        icon: "success",
      });
      navigate("/home");
    } catch (error) {
      console.error("Error submitting form:", error);
      setRegisterError("Error submitting form. Please try again later.");
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
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]{1,3})+$/,
                  message: "Please enter a valid email (e.g., mailto:abc@example.com)",
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
              <div style={{ display: "flex", marginTop: "-21px", marginLeft: "60px" }}>
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
                    {...register("gender", { required: "Please select gender" })}
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
              {...register("countryCode", { required: "Country code is required" })}
            >
              <option value="+1">+1 (USA)</option>
              <option value="+91">+91 (India)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+49">+49 (Germany)</option>
            </select>
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
              {/* <TextField variant="standard" placeholder="Others" {...register("otherHobby")} /> */}
            </FormGroup>
            {errors.hobbies && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.hobbies.message}
              </span>
            )}

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
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
            />
            {errors.password && (
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                {errors.password.message}
              </span>
            )}

            <TextField
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
              />
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

