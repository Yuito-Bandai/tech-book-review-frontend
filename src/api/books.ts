import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 書籍のリストを取得する
export const fetchBooks = async (searchParams: URLSearchParams = new URLSearchParams()) => {
  const response = await axios.get(`${API_URL}/books?${searchParams.toString()}`);
  console.log("API Response:", response.data); // デバッグ用ログ

  return response.data.map((item: any) => ({
    id: item.id,
    title: item.title || 'タイトル不明',
    // authorsが配列である場合、それを文字列として処理
    author: item.authors && Array.isArray(item.authors)
      ? item.authors.map((author: { name: string }) => author.name).join(', ')
      : item.author || '著者情報なし',
    description: item.description || '説明情報なし',
    description_short: item.description_short || '説明情報なし',
    publishedDate: item.published_date || '出版日不明',
    publisher: item.publisher || '出版社不明',
    thumbnail: item.image_link || null,
    infoLink: item.info_link || null
  }));
};

// 特定の書籍の詳細を取得する
export const fetchBook = async (id: string) => {
  const response = await axios.get(`${API_URL}/books/${id}`);
  const item = response.data;

  return {
    id: item.id,
    title: item.title || 'タイトル不明',
    author: item.authors && Array.isArray(item.authors) ? item.authors.map((author: { name: string }) => author.name).join(', ') : item.author || '著者情報なし',
    description: item.description || '説明情報なし',
    description_short: item.description_short || '説明情報なし',
    publishedDate: item.published_date || '出版日不明',
    publisher: item.publisher || '出版社不明',
    thumbnail: item.image_link || null,
    infoLink: item.info_link || null
  };
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
export const fetchReviews = async (bookId: string) => {
  const response = await axios.get(`${API_URL}/books/${bookId}/reviews`);
  return response.data;
};

// 書籍に新しいレビューを投稿する
export const postReview = async (bookId: string, content: string, rating: number) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/books/${bookId}/reviews`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // トークンをAuthorizationヘッダーに追加(認証情報が必要)
    },
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
