import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

export const fetchBook = async (id: number) => {
  const response = await axios.get(`${API_URL}/books/${id}`);
  return response.data;
};

export const createBook = async (bookData: { title: string; author: string; categoryId: number; tagIds: number[] }) => {
  const response = await axios.post(`${API_URL}/books`, bookData);
  return response.data;
};

export const updateBook = async (id: number, bookData: { title?: string; author?: string; categoryId?: number; tagIds?: number[] }) => {
  const response = await axios.put(`${API_URL}/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id: number) => {
  const response = await axios.delete(`${API_URL}/books/${id}`);
  return response.data;
};
