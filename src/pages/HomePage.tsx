import React from "react";
import BookList from "../components/Book/BookList.tsx";
import Header from "../components/Utils/Header.tsx";

interface HomePageProps {
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  return (
    <>
      <Header onLogout={onLogout} />
      <main className="homepage-container">
        <BookList />
      </main>
    </>
  );
};

export default HomePage;
