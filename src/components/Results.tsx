import React, { useContext } from "react";
import { UserContext } from "./UserContext";

interface ArtworkProps {
  title: string;
  primaryImage: string;
  artistDisplayName: string;
  objectDate: string;
}

interface ResultsProps {
  element: string;
  artwork: ArtworkProps | null;
}

const Results: React.FC<ResultsProps> = ({ element, artwork }) => {
  const { name } = useContext(UserContext); // Access the user's name from context

  return (
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>
      {artwork ? (
        <div className="artwork">
          <h2>{artwork.title}</h2>
          <img src={artwork.primaryImage} alt={artwork.title} /> {/* Correct image rendering */}
          <p>
            <strong>Artist:</strong> {artwork.artistDisplayName}
          </p>
          <p>
            <strong>Date:</strong> {artwork.objectDate}
          </p>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
};

export default Results;
