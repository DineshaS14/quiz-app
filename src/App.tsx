import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider, UserContext } from "./components/UserContext";
import Results from "./components/Results";
import Question from "./components/Question";
import UserForm from "./components/UserForm";
import "./App.css";

// Quiz questions and configuration
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // Current question index
  const [answers, setAnswers] = useState<string[]>([]); // User's answers
  const [element, setElement] = useState<string>(""); // Resulting element
  const [artwork, setArtwork] = useState<any>(null); // Artwork data from API

  // Access user name from UserContext
  const { name, setName } = useContext(UserContext);

  // Handle answer selection
  function handleAnswer(answer: string) {
    setAnswers((prevAnswers) => [...prevAnswers, answer]); // Add answer
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to next question
  }

  // Determine the user's element
  function determineElement(answers: string[]): string {
    const counts: { [key: string]: number } = {};
    answers.forEach((answer) => {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  }

  // Fetch artwork based on element
  async function fetchArtwork(keyword: string) {
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
        setArtwork(artworkData); // Set fetched artwork
      }
    } catch (error) {
      console.error("Error fetching artwork:", error);
    }
  }

  // Run when quiz finishes
  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers); // Determine the most selected element
      setElement(selectedElement); // Set result element
      fetchArtwork(keywords[selectedElement]); // Fetch related artwork
    }
  }, [currentQuestionIndex]);

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* User form for name input */}
          <Route
            path="/"
            element={
              <UserForm
                onSubmit={(userName: string) => setName(userName)}
              />
            }
          />
          {/* Quiz question or results */}
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
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
