import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBook, fetchReviews, postReview } from '../../api/books.ts';
import '../../styles/Book/BookDetail.css';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState<string>('');
  const [rating, setRating] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        if (id) {
          const response = await fetchBook(id);
          setBook(response);
        } else {
          setError('Book ID is undefined');
        }
      } catch (err) {
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  useEffect(() => {
    if (book) {
      const loadReviews = async () => {
        try {
          if (id) {
            const response = await fetchReviews(id);
            setReviews(response);
          } else {
            setError('Book ID is undefined');
          }
        } catch (err) {
          setError('Failed to fetch reviews');
        }
      };
      loadReviews();
    }
  }, [book, id]);

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newReview.trim() === '') return;

    try {
      if (id) {
        await postReview(id, newReview, rating);
      } else {
        setError('Book ID is undefined');
      }
      setReviews([...reviews, { content: newReview, rating }]);
      setNewReview('');
      setRating(1);
    } catch (err) {
      setError('Failed to post review');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-details-container">
      <h1>本の詳細</h1>
      {book ? (
        <>
          <div className="book-header">
            {book.thumbnail && (
              <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
            )}
            <div className="book-info">
              <div className="book-title">{book.title}</div>
              <div className="book-author">
                著者: {Array.isArray(book.authors) && book.authors.length > 0 ? book.authors.map((author: any) => author.name).join(', ') : '著者情報なし'}
              </div>
              <div className="book-description">説明: {book.description || '説明情報なし'}</div>
            </div>
          </div>

          <h2>レビュー</h2>
          {reviews.length > 0 ? (
            <ul className="review-list">
              {reviews.map((review, index) => (
                <li key={index} className="review-item">
                  <div>評価: {review.rating}</div>
                  <div>{review.content}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>レビューはまだありません。</p>
          )}

          <h3>レビューを投稿する</h3>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="レビューを入力..."
              rows={4}
              cols={50}
            />
            <div>
              <label>評価:</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <button type="submit">投稿</button>
          </form>
        </>
      ) : (
        <p>本が見つかりませんでした。</p>
      )}
    </div>
  );
};

export default BookDetails;
