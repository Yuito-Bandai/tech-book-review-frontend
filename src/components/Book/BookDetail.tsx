import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBook } from '../../api/books.ts';
import '../../styles/Book/BookDetail.css';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URLのパラメータからIDを取得
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await fetchBook(Number(id)); // IDを渡して本の詳細を取得
        setBook(response);
      } catch (err) {
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-details-container">
      <h1>本の詳細</h1>
      {book ? (
        <>
          <div className="book-title">{book.title}</div>
          <div className="book-author">著者: {book.author}</div>
          <div className="book-description">説明: {book.description}</div>
        </>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
};

export default BookDetails;
