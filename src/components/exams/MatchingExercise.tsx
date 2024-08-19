import React, { useState } from 'react';


// Deprecated


interface MatchingExerciseProps {
  items: Record<string, string>;
}

const MatchingExercise: React.FC<MatchingExerciseProps> = ({ items }) => {
  const [selectedPairs, setSelectedPairs] = useState<Record<string, string>>({});
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  const handleSelect = (leftItem: string, rightItem: string) => {
    setSelectedPairs((prevPairs) => ({
      ...prevPairs,
      [leftItem]: rightItem,
    }));
  };

  const checkAnswer = (leftItem: string, rightItem: string): boolean => {
    return items[leftItem] === rightItem;
  };

  const renderRightColumn = (leftItem: string) => (
    <div>
      {Object.values(items).map((rightItem) => (
        <div key={rightItem}>
          <input
            type="radio"
            name={`matching-${leftItem}`}
            value={rightItem}
            onChange={() => handleSelect(leftItem, rightItem)}
            disabled={showAnswers}
          />
          <label className="ml-2">
            {rightItem}
          </label>
          {showAnswers && (
            <span
              className={`ml-4 ${
                checkAnswer(leftItem, rightItem)
                  ? 'text-green-600'
                  : selectedPairs[leftItem] === rightItem
                  ? 'text-red-600'
                  : ''
              }`}
            >
              {checkAnswer(leftItem, rightItem)
                ? 'Correct'
                : selectedPairs[leftItem] === rightItem
                ? 'Incorrect'
                : ''}
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex">
      <div className="flex-1">
        {Object.keys(items).map((leftItem) => (
          <div key={leftItem} className="mb-4">
            <strong>{leftItem}</strong>
          </div>
        ))}
      </div>
      <div className="flex-1">
        {Object.keys(items).map((leftItem) => (
          <div key={leftItem} className="mb-4">
            {renderRightColumn(leftItem)}
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowAnswers(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Show Answers
      </button>
    </div>
  );
};

export default MatchingExercise