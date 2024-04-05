import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, Modal, Button, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import '../style/ContactList.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    age: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch('https://6482fef0f2e76ae1b95bcbd3.mockapi.io/pusatkarirpolban/contact')
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'SET_CONTACTS', payload: data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDeleteContact = (id) => {
    fetch(`https://6482fef0f2e76ae1b95bcbd3.mockapi.io/pusatkarirpolban/contact/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log(`Contact with ID ${id} deleted successfully.`);
        fetchContacts();
      } else {
        console.error(`Failed to delete contact with ID ${id}.`);
      }
    })
    .catch(error => {
      console.error('Error deleting contact:', error);
    });
  };

  const handleEditContact = () => {
    fetch(`https://6482fef0f2e76ae1b95bcbd3.mockapi.io/pusatkarirpolban/contact/${selectedContact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedContact),
    })
    .then(response => {
      if (response.ok) {
        console.log(`Contact with ID ${selectedContact.id} updated successfully.`);
        fetchContacts();
        setOpenEditModal(false);
      } else {
        console.error(`Failed to update contact with ID ${selectedContact.id}.`);
      }
    })
    .catch(error => {
      console.error('Error updating contact:', error);
    });
  };

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedContact(null);
  };

  const handleAddData = () => {
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
    setNewContact({
      firstName: '',
      lastName: '',
      age: ''
    });
  };

  const handleInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleAddContact = () => {
    fetch('https://6482fef0f2e76ae1b95bcbd3.mockapi.io/pusatkarirpolban/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
    .then(response => {
      if (response.ok) {
        console.log('Contact added successfully.');
        fetchContacts();
        handleAddModalClose();
      } else {
        console.error('Failed to add contact.');
      }
    })
    .catch(error => {
      console.error('Error adding contact:', error);
    });
  };

  // Menghitung index data yang akan ditampilkan berdasarkan halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contacts.slice(indexOfFirstItem, indexOfLastItem);

  // Mengubah halaman
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h1>Daftar Kontak</h1>
      <Button
        variant="contained"
        color="btn btn-outline-warning"
        startIcon={<AddIcon />}
        onClick={handleAddData}
        style={{ marginBottom: '10px' }}
      >
        Tambah Data
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f58220', color: 'white' }}>
              <TableCell style={{ fontWeight: 'bold' }}>Foto</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Nama Depan</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Nama Belakang</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Umur</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map(contact => (
              <TableRow key={contact.id}>
                <TableCell>
                  <Avatar alt={`${contact.firstName} ${contact.lastName}`} src={contact.photo} />
                </TableCell>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.age}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(contact)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteContact(contact.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(contacts.length / itemsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
          />
        </Stack>
      </div>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Konten modal untuk edit */}
      </Modal>
      <Modal
        open={openAddModal}
        onClose={handleAddModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' }}>
          <h2 id="modal-title">Tambah Kontak</h2>
          <TextField name="firstName" label="Nama Depan" value={newContact.firstName} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <TextField name="lastName" label="Nama Belakang" value={newContact.lastName} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <TextField name="age" label="Umur" value={newContact.age} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
          <Button variant="contained" color="primary" onClick={handleAddContact} style={{ marginRight: '10px' }}>Tambah</Button>
          <Button variant="contained" onClick={handleAddModalClose}>Batal</Button>
        </div>
      </Modal>
    </div>
  );
}

export default ContactList;
