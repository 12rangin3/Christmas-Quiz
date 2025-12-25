import { useEffect, useState } from "react";
import questionsData from "../data/questions.json";

export default function ChristmasQuiz() {
  const [username, setUsername] = useState("");
  const [entered, setEntered] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

useEffect(() => {
  const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
  setQuestions(shuffled); // ✅ ALL QUESTIONS
}, []);



  const startQuiz = () => {
    if (!username.trim()) return alert("Enter your name 🎄");
    setEntered(true);
  };

  const handleAnswer = (index) => {
    if (selected !== null) return;

    setSelected(index);
    if (index === questions[current].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 700);
  };

  const restartQuiz = () => {
    window.location.reload();
  };

  /* 👤 Username Screen */
  if (!entered) {
    return (
      <div className="page">
        <div className="quiz-card">
          <h1>🎄 Christmas Quiz</h1>
          <p>Enter your name to begin</p>

          <input
            className="name-input"
            placeholder="Your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button className="start-btn" onClick={startQuiz}>
            Start Quiz 🎅
          </button>
        </div>
      </div>
    );
  }

  /* 🧠 Quiz Screen */
  return (
    <div className="page">
      <div className="quiz-card">
        {!finished ? (
          <>
            <h2>
              👋 Hey <span className="username">{username}</span>
            </h2>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`
                }}
              ></div>
            </div>

            <p className="question">
              {questions[current]?.question}
            </p>

            <div className="options">
              {questions[current]?.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`option-btn
                    ${
                      selected !== null
                        ? i === questions[current].answer
                          ? "correct"
                          : i === selected
                          ? "wrong"
                          : ""
                        : ""
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <p className="progress-text">
              Question {current + 1} / {questions.length}
            </p>
          </>
        ) : (
          <>
            <h2>🎉 Great Job, {username}!</h2>
            <p className="score">
              Your Score: {score} / {questions.length}
            </p>

            <p className="message">
              {score >= 4
                ? "🎄 Excellent! You love Christmas!"
                : "❄️ Nice try! Play again to improve!"}
            </p>

            <button className="restart-btn" onClick={restartQuiz}>
              Play Again 🔁
            </button>
          </>
        )}
      </div>
    </div>
  );
}
