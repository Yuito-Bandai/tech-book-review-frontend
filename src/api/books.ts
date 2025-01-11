import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 書籍のリストを取得する
export const fetchBooks = async (searchParams: URLSearchParams = new URLSearchParams()) => {
  const response = await axios.get(`${API_URL}/books?${searchParams.toString()}`);
  return response.data;
};

// 特定の書籍の詳細を取得する
export const fetchBook = async (id: number) => {
  const response = await axios.get(`${API_URL}/books/${id}`);
  return response.data;
};

// 新しい書籍を作成する
export const createBook = async (bookData: { title: string; author: string; categoryId: number; tagIds: number[] }) => {
  const response = await axios.post(`${API_URL}/books`, bookData);
  return response.data;
};

// 書籍の情報を更新する
export const updateBook = async (id: number, bookData: { title?: string; author?: string; categoryId?: number; tagIds?: number[] }) => {
  const response = await axios.put(`${API_URL}/books/${id}`, bookData);
  return response.data;
};

// 書籍を削除する
export const deleteBook = async (id: number) => {
  const response = await axios.delete(`${API_URL}/books/${id}`);
  return response.data;
};

// 特定の書籍に対するレビューを取得する
export const fetchReviews = async (bookId: number) => {
  const response = await axios.get(`${API_URL}/books/${bookId}/reviews`);
  return response.data;
};

// 書籍に新しいレビューを投稿する
export const postReview = async (bookId: number, content: string, rating: number) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/books/${bookId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    credentials: 'include',
    body: JSON.stringify({
      review: {
        content: content,
        rating: rating,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to post review');
  }

  return await response.json();
};
