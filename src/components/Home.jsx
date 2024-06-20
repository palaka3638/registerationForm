import React, { useState, useEffect } from "react";
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

function Home() {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState();
  const [userToEdit, setUserToEdit] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Fetch data from API
  
    const fetchData = async (error) => {
      try {
        const response = await fetch("http://localhost:3030/getallusers");
        if (!response.ok) {
          console.log("error");
        }
        let data = await response.json();
        console.log("data", data[0].id);
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
    setUserToEdit(user);
    setEditDialogOpen(true);
  };

 
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        const response = await fetch(
          `http://localhost:3030/deleteuser/${userToDelete.id}`,
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
  const handleEditSubmit = async () => {
    if (!userToEdit) return;

    try {
      const response = await fetch(
        `http://localhost:3030/edituser/${userToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToEdit),
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
  const handleCloseDialog = () => {
    setConfirmDialogOpen(false);
    setUserToDelete(null);
    setEditDialogOpen(false)
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
              <TableRow key={user.id}>
                <TableCell>{user.f_name}</TableCell>
                <TableCell>{user.l_name}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>
                  {new Date(user.d_o_b).toLocaleDateString()}
                </TableCell>
                <TableCell>{user.designation}</TableCell>
                <TableCell>{user.hobbies}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" id="editBtn"  onClick={() => handleEditClick(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    id="delBtn"
                    onClick={() => handleDeleteClick(user)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
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
            // autoFocus
            // margin="dense"
            label="First Name"
            fullWidth
            name="f_name"
            value={userToEdit ? userToEdit.f_name : ""}
            onChange={handleInputChange}
          />
          <TextField
            // margin="dense"
            label="Last Name"
            fullWidth
            name="l_name"
            value={userToEdit ? userToEdit.l_name : ""}
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
