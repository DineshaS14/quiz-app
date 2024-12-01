import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Question from "./components/Question";
import Results from "./components/Results";
import "./App.css";

const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
];

const keywords: { [key: string]: string } = {
  Fire: "fire",
  Water: "water",
  Earth: "earth",
  Air: "air",
};

const elements: { [key: string]: string } = {
  "Red 🔴": "Fire",
  "Blue 🔵": "Water",
  "Green 🟢": "Earth",
  "Yellow 🟡": "Air",
};

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [element, setElement] = useState<string>("");
  const [artwork, setArtwork] = useState<any>(null);
  const [userName, setUserName] = useState<string>('');


  // Handle answer selection
  const handleAnswer = (answer: string) => {
    setAnswers((prev) => [...prev, answer]);
    setCurrentQuestionIndex((prev) => prev + 1);
  };
  function handleUserFormSubmit(name: string) {
    setUserName(name);
    console.log(userName);
  };
  // Determine the result element based on answers
  const determineElement = (answers: string[]): string => {
    const counts: { [key: string]: number } = {};
    answers.forEach((answer) => {
      const elem = elements[answer];
      counts[elem] = (counts[elem] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  };

  // Fetch artwork from the API
  const fetchArtwork = async (keyword: string) => {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`
      );
      const data = await response.json();
      if (data.objectIDs && data.objectIDs.length > 0) {
        const artworkResponse = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${data.objectIDs[0]}`
        );
        const artworkData = await artworkResponse.json();
        setArtwork(artworkData);
      }
    } catch (error) {
      console.error("Error fetching artwork:", error);
    }
  };

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex]);

  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
  <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
  <Route
    path="/quiz"
    element={
      currentQuestionIndex < questions.length ? (
        <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
      ) : (
        <Results element={element} artwork={artwork} />
      )
    }
  />
</Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
