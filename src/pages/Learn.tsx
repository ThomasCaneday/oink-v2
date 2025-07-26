import { useState } from 'react';
import { lessons } from '../data/lessons';
import Quiz from '../components/Quiz';
import ReactMarkdown from 'react-markdown';

const Learn = () => {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const lesson = selectedLesson ? lessons.find(l => l.id === selectedLesson) : null;

  const handleQuizComplete = () => {
    if (lesson) {
      setCompletedLessons([...completedLessons, lesson.id]);
      setShowQuiz(false);
      setSelectedLesson(null);
    }
  };

  if (selectedLesson && lesson) {
    return (
      <div className="learn lesson-view">
        {!showQuiz ? (
          <>
            <button onClick={() => setSelectedLesson(null)} className="back-button">
              ← Back to Lessons
            </button>
            <div className="lesson-content">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
              <button 
                onClick={() => setShowQuiz(true)}
                className="start-quiz-button"
              >
                Take Quiz
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>{lesson.title} - Quiz</h2>
            <Quiz 
              questions={lesson.quiz.questions}
              quizId={lesson.quiz.id}
              onComplete={handleQuizComplete}
            />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="learn">
      <h1>Learn About Crypto</h1>
      <div className="lessons-grid">
        {lessons.map(lesson => (
          <div 
            key={lesson.id}
            className={`lesson-card ${completedLessons.includes(lesson.id) ? 'completed' : ''}`}
            onClick={() => setSelectedLesson(lesson.id)}
          >
            <h3>{lesson.title}</h3>
            {completedLessons.includes(lesson.id) && (
              <span className="completion-badge">✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
