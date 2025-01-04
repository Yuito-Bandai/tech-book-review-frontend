import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../../api/books.ts';
import '../../styles/Book/BookList.css';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTitle, setSearchTitle] = useState<string>('');
  const [searchAuthor, setSearchAuthor] = useState<string>('');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const params = new URLSearchParams();

        if (searchTitle) params.append('title', searchTitle);
        if (searchAuthor) params.append('author', searchAuthor);

        const response = await fetchBooks(params);
        setBooks(response);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [searchTitle, searchAuthor]); // 検索条件が変更されるたびに再取得

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">Book List</h1>

      {/* 検索フォーム */}
      <div className="search-form">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
      </div>

      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-list-item">
            <div className="book-title">タイトル: {book.title}</div>
            <div className="book-author">著者: {book.author}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
