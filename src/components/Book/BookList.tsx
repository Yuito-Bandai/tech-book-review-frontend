import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../../api/books.ts';
import '../../styles/Book/BookList.css';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">Book List</h1>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-list-item">
            <span>{book.title} by {book.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
