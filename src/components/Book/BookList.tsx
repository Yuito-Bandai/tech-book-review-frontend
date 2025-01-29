import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../../api/books.ts';
import '../../styles/Book/BookList.css';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');

  // 初期データの取得
  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        setLoading(true);
        const initialBooks = await fetchBooks(new URLSearchParams()); // 初期データを取得
        setBooks(initialBooks);
        setError(null);
      } catch (err) {
        setError('Failed to fetch initial books');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialBooks();
  }, []);

  // 検索を実行する関数
  const searchBooks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchTitle || searchAuthor) {
        let query = '';
        if (searchTitle) query += `intitle:${searchTitle}`;
        if (searchAuthor) query += `${query ? '+' : ''}inauthor:${searchAuthor}`;

        params.append('query', query);
      }

      const fetchedBooks = await fetchBooks(params);
      setBooks(fetchedBooks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">本の一覧</h1>

      {/* 検索フォーム */}
      <div className="search-form">
        <input
          type="text"
          placeholder="タイトルから検索"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="著者から検索"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <button onClick={searchBooks}>検索</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="book-list">
        {books.length === 0 ? (
          <p>本が見つかりませんでした。</p>
        ) : (
          books.map((book) => (
            <li key={book.id} className="book-list-item">
              <Link to={`/books/${book.id}`}>
                <div className="book-title">{book.title}</div>
                <div className="book-author">
                  {book.author ? book.author.split(',').join(', ') : '著者情報なし'}
                </div>
                <div className="book-published-date">出版日: {book.publishedDate || '不明'}</div>
                <div className="book-publisher">出版社: {book.publisher || '不明'}</div>
                <div className="book-description">
                  <p>{book.description ? book.description : '説明情報なし'}</p>
                </div>
                {book.thumbnail && <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BookList;
