import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@material-ui/core';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  useEffect(() => {
    fetch('https://contact.herokuapp.com/contact')
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'SET_CONTACTS', payload: data.data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [dispatch]);

  return (
    <div>
      <h1>Daftar Kontak</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Foto</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Nama Depan</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Nama Belakang</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Umur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map(contact => (
              <TableRow key={contact.id}>
                <TableCell>
                  <Avatar alt={`${contact.firstName} ${contact.lastName}`} src={contact.photo} />
                </TableCell>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ContactList;
