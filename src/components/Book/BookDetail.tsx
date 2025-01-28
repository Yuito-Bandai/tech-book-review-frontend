import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBook, fetchReviews, postReview } from '../../api/books.ts';
import '../../styles/Book/BookDetail.css';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URLのパラメータからIDを取得
  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]); // レビューのリスト
  const [newReview, setNewReview] = useState<string>(''); // ユーザーが入力した新しいレビュー
  const [rating, setRating] = useState<number>(1); // ユーザーが選択した評価
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 本の詳細情報をロードする関数
    const loadBook = async () => {
      try {
        if (id) {
          const response = await fetchBook(id); // IDを渡して本の詳細を取得
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

    // レビューをロードする関数
    const loadReviews = async () => {
      try {
        if (id) {
          const response = await fetchReviews(id); // レビューを取得
          setReviews(response);
        } else {
          setError('Book ID is undefined');
        }
      } catch (err) {
        setError('Failed to fetch reviews');
      }
    };

    loadBook();
    loadReviews();
  }, [id]);

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newReview.trim() === '') return; // 空のレビューを送信しない

    try {
      // レビューを投稿時にcontentとratingを送信
      if (id) {
        await postReview(id, newReview, rating);
      } else {
        setError('Book ID is undefined');
      }
      setReviews([...reviews, { content: newReview, rating }]); // 送信後、レビューリストに追加
      setNewReview(''); // フォームをクリア
      setRating(1); // 評価をリセット
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
          <div className="book-title">{book.title}</div>
          <div className="book-author">
            著者: {Array.isArray(book.authors) && book.authors.length > 0 ? book.authors.map((author: any) => author.name).join(', ') : '著者情報なし'}
          </div>
          <div className="book-description">説明: {book.description}</div>

          <h2>レビュー</h2>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <div>評価: {review.rating}</div>
                  <div>{review.content}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>レビューはまだありません。</p>
          )}

          <h3>レビューを投稿する</h3>
          <form onSubmit={handleReviewSubmit}>
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
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <button type="submit">投稿</button>
          </form>
        </>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
};

export default BookDetails;
