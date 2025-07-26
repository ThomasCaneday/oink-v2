import { useState } from 'react';
import type { Question } from '../data/lessons';
import { userService } from '../services/userService';
import { useAuth } from '../context/useAuth';
import { toastManager } from '../hooks/useToast';

interface QuizProps {
  questions: Question[];
  quizId: string;
  onComplete: () => void;
}

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { user } = useAuth();

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      showQuizResults();
    }
  };

  const showQuizResults = async () => {
    const correctAnswers = questions.filter(
      (q, index) => q.correctAnswer === answers[index]
    ).length;
    
    const score = (correctAnswers / questions.length) * 100;
    setShowResults(true);

    if (score >= 75) {
      try {
        if (user?.metadata?.publicAddress) {
          const userData = await userService.getUser(user.metadata.publicAddress);
          if (userData) {
            await userService.updateUserPoints(userData.walletAddress, 75);
            toastManager.showToast('Quiz completed! Earned 75 points! 🎉');
          }
        }
      } catch (error) {
        console.error('Error updating points:', error);
        toastManager.showToast('Error updating points');
      }
    }

    onComplete();
  };

  if (showResults) {
    const correctAnswers = questions.filter(
      (q, index) => q.correctAnswer === answers[index]
    ).length;
    const score = (correctAnswers / questions.length) * 100;

    return (
      <div className="quiz-results">
        <h3>Quiz Results</h3>
        <p>Score: {score}%</p>
        {score >= 75 ? (
          <p>Congratulations! You passed! 🎉</p>
        ) : (
          <p>Try again to earn points!</p>
        )}
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz">
      <h3>Question {currentQuestion + 1}</h3>
      <p>{question.text}</p>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="option-button"
          >
            {option}
          </button>
        ))}
      </div>
      <p className="progress">
        Question {currentQuestion + 1} of {questions.length}
      </p>
    </div>
  );
};

export default Quiz;
