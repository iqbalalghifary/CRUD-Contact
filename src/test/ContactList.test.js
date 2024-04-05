import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactList from './ContactList';

test('renders contact list title', () => {
  render(<ContactList />);
  const titleElement = screen.getByText(/Daftar Kontak/i);
  expect(titleElement).toBeInTheDocument();
});

test('clicking add button opens add modal', () => {
  render(<ContactList />);
  const addButton = screen.getByText(/Tambah Data/i);
  fireEvent.click(addButton);
  const modalTitle = screen.getByText(/Tambah Kontak/i);
  expect(modalTitle).toBeInTheDocument();
});
