import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../../src/assets/css/design.css";
import { useLocation, useNavigate ,} from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  // const history =useHistory();
  const handleLogout =()=>{
    Cookies.remove()
  navigate('/register')
  }
console.log(location.pathname,"pathname using useLocation")
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState();
  const [userToEdit, setUserToEdit] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [expandedRow, setExpandedRow]= useState(null); //Keeps track of the currently expanded row (user id) to show details.
  
  // Fetch data from API
  const fetchData = async (error) => {
    try {
      const response = await fetch("http://localhost:4000/getallusers");
      if (!response.ok) {
        console.log("error",error);
      }
      let data = await response.json();
      // console.log("data", data);
      setUsers(data[0]); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Empty dependency array ensures this effect runs only once after the initial render
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setConfirmDialogOpen(true);
  };
  const handleEditClick = (user) => {
    navigate('/register',{state:{data:user}})
    console.log(user,"<-----user")

  };
  useEffect(() => {
    const user = Cookies.get('RegisterFormData');
    if (user) {
      console.log("--------user home--------", user)
      setUserToEdit(JSON.parse(user));
      // Cookies.remove('UserToEdit'); // Clear cookie after retrieving data
    }
  }, []);
  
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        const response = await fetch(
          `http://localhost:4000/deleteuser/${userToDelete.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          console.log("Error deleting user");
          return;
        }

        // Update state to remove the deleted user
        const updatedUsers = users.filter((u) => u.id !== userToDelete.id);
        setUsers(updatedUsers);
        setConfirmDialogOpen(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  const handleEditSubmit = async (data) => {
    if (!userToEdit) return;

    try {
      const response = await fetch(
        `http://localhost:4000/edituser/${userToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        console.log("Error updating user");
        return;
      }

      // Fetch updated data after successful edit
      await fetchData();
      setEditDialogOpen(false);
      setUserToEdit(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //toggles the expanded state (expandedRow) of a row based on the rowId.
  const handleExpandRow = (rowId) => {
    if (expandedRow === rowId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowId);
    }
  };

  const handleCloseDialog = () => {
    setConfirmDialogOpen(false);
    setUserToDelete(null);
    setEditDialogOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserToEdit((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
    <div style={{
      // border:'2px solid red',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:'10px'

    }}>
      <h1 style={{ textAlign: "center" }}>Registration Data</h1>
      <Button variant="contained" onClick={handleLogout}>Logout</Button>
    </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell id="col">First Name</TableCell>
              <TableCell id="col">Last Name</TableCell>
              <TableCell id="col">Gender</TableCell>
              <TableCell id="col">Email</TableCell>
              <TableCell id="col">Contact</TableCell>
              <TableCell id="col">DOB (DD/MM/YYYY)</TableCell>
              <TableCell id="col">Designation</TableCell>
              <TableCell id="col">Hobbies</TableCell>
              <TableCell id="col">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {users.map((user) => (
              <React.Fragment key={user.id}>
                <TableRow onClick={() => handleExpandRow(user.id)}>
                  <TableCell>{user.f_name}</TableCell>
                  <TableCell>{user.l_name}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>
                    {new Date(user.d_o_b).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user.designation}</TableCell>
                  <TableCell>{user.hobbies.join(", ")}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      id="editBtn"
              
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click propagation
                        handleEditClick(user);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      id="delBtn"

                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click propagation
                        handleDeleteClick(user);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                {expandedRow === user.id && (
                  <TableRow>
                    <TableCell >
                        <Paper>
                          <p>User Details:</p>
                          <p>First Name: {user.f_name}</p>
                          <p>Last Name: {user.l_name}</p>
                          <p>Email: {user.email}</p>
                          <p>Contact: {user.contact}</p>
                          <p>DOB: {new Date(user.d_o_b).toLocaleDateString()}</p>
                          <p>Designation: {user.designation}</p>
                          <p>Hobbies: {user.hobbies.join(", ")}</p>
                        </Paper>
               
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={confirmDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete the data?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <TextField
      
            label="First Name"
            fullWidth
            name="f_name"
            value={userToEdit?.f_name}
            onChange={handleInputChange}
          />
          <TextField
            // margin="dense"
            label="Last Name"
            fullWidth
            name="l_name"
            defaultValue={userToEdit ? userToEdit.lname : ""}
            onChange={handleInputChange}
          />
          <TextField
            // margin="dense"
            label="Email"
            fullWidth
            name="email"
            value={userToEdit ? userToEdit.email : ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Home;


