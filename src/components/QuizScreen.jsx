import { useState } from 'react'

export default function QuizScreen({ unit, theme, onComplete, onQuit }) {
  const questions = unit.questions
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [fillAnswer, setFillAnswer] = useState('')
  const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong'
  const [shakeKey, setShakeKey] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFireToast, setShowFireToast] = useState(false)
  const [lostHeartIndex, setLostHeartIndex] = useState(null)

  const question = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const correctAnswerStyle = {
    borderColor: theme.accent,
    background: theme.accentSoft,
    color: theme.accentDark,
  }

  const checkAnswer = (answer) => {
    if (feedback) return

    let isCorrect = false

    if (question.type === 'multiple_choice') {
      isCorrect = answer === question.correct
    } else if (question.type === 'true_false') {
      isCorrect = answer === question.correct
    } else if (question.type === 'fill_blank') {
      isCorrect = answer.trim().toLowerCase() === question.correct.toLowerCase()
    }

    setSelected(answer)
    setFeedback(isCorrect ? 'correct' : 'wrong')

    const newStreak = isCorrect ? streak + 1 : 0
    setStreak(newStreak)

    if (isCorrect) {
      setScore((s) => s + 1)
      if (newStreak >= 3) {
        setShowFireToast(true)
        setTimeout(() => setShowFireToast(false), 950)
      }
    } else {
      const newHearts = hearts - 1
      setLostHeartIndex(hearts)
      setTimeout(() => setLostHeartIndex(null), 450)
      setHearts(newHearts)
      setShakeKey((k) => k + 1)
      if (newHearts <= 0) {
        setTimeout(() => onComplete({ score, hearts: 0, total: questions.length, failed: true }), 1200)
      }
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      onComplete({ score: feedback === 'correct' ? score : score, hearts, total: questions.length, failed: false })
    } else {
      setCurrentIndex((i) => i + 1)
      setSelected(null)
      setFillAnswer('')
      setFeedback(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: theme.page }}>
      {/* Header */}
      <div className="max-w-lg mx-auto w-full px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onQuit}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 font-black text-base transition-all"
          >
            ✕
          </button>

          {/* Progress bar */}
          <div className="flex-1 bg-duo-gray-light rounded-full h-4 overflow-hidden">
            <div
              className="h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: `linear-gradient(to right, ${theme.accent}, ${theme.accentDark})` }}
            />
          </div>

          {/* Hearts */}
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className={`text-2xl transition-all duration-200 drop-shadow-sm
                  ${i <= hearts ? 'opacity-100' : 'opacity-15 grayscale'}
                  ${i === lostHeartIndex ? 'animate-heart-pop' : ''}`}
              >
                💖
              </span>
            ))}
          </div>
        </div>

        {/* XP + Streak row */}
        <div className="flex justify-between items-center mt-1.5 px-1">
          {streak > 0
            ? <span key={streak} className="text-duo-orange font-extrabold text-base animate-xp-bump">🔥 {streak}</span>
            : <span />}
          <span key={score} className="text-duo-blue font-extrabold text-lg animate-xp-bump">
            {score * 10} XP
          </span>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 flex flex-col relative">
        <p className="text-xs font-bold text-duo-gray uppercase tracking-wider mb-2">
          {question.type === 'multiple_choice' ? 'Choose the correct answer' :
           question.type === 'true_false' ? 'True or False?' :
           'Fill in the blank'}
        </p>

        <h2
          key={`${shakeKey}-q`}
          className={`text-xl font-bold text-gray-800 leading-snug mb-6 ${feedback === 'wrong' ? 'animate-shake' : ''}`}
        >
          {question.question}
        </h2>

        {/* Multiple choice */}
        {question.type === 'multiple_choice' && (
          <div className="flex flex-col gap-3">
            {question.options.map((option, i) => {
              let style = 'border-2 border-duo-gray-light bg-white text-gray-700 hover:border-duo-blue hover:bg-blue-50'
              let buttonStyle = undefined
              if (feedback && i === question.correct) {
                style = 'border-2'
                buttonStyle = correctAnswerStyle
              } else if (feedback === 'wrong' && i === selected) {
                style = 'border-2 border-duo-red bg-red-50 text-duo-red'
              }

              return (
                <button
                  key={i}
                  onClick={() => checkAnswer(i)}
                  disabled={!!feedback}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-150 active:scale-98 ${style}`}
                  style={buttonStyle}
                >
                  {option}
                </button>
              )
            })}
          </div>
        )}

        {/* True / False */}
        {question.type === 'true_false' && (
          <div className="flex gap-3">
            {[true, false].map((val) => {
              let style = 'border-2 border-duo-gray-light bg-white text-gray-700 hover:border-duo-blue hover:bg-blue-50'
              let buttonStyle = undefined
              if (feedback && val === question.correct) {
                style = 'border-2'
                buttonStyle = correctAnswerStyle
              } else if (feedback === 'wrong' && val === selected) {
                style = 'border-2 border-duo-red bg-red-50 text-duo-red'
              }

              return (
                <button
                  key={String(val)}
                  onClick={() => checkAnswer(val)}
                  disabled={!!feedback}
                  className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-150 active:scale-95 ${style}`}
                  style={buttonStyle}
                >
                  {val ? '✓ TRUE' : '✗ FALSE'}
                </button>
              )
            })}
          </div>
        )}

        {/* Fill in the blank */}
        {question.type === 'fill_blank' && (
          <div className="flex flex-col gap-3">
            {question.hint && !feedback && (
              <p className="text-sm text-duo-gray italic">🌟 Hint: {question.hint}</p>
            )}
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fillAnswer.trim() && !feedback && checkAnswer(fillAnswer)}
              disabled={!!feedback}
              placeholder="Type your answer..."
              className={`w-full border-2 rounded-xl px-4 py-3 text-gray-800 font-semibold text-base outline-none transition-colors
                ${feedback === 'correct' ? '' :
                  feedback === 'wrong' ? 'border-duo-red bg-red-50' :
                  'border-duo-gray-light focus:border-duo-blue'}`}
              style={feedback === 'correct' ? correctAnswerStyle : undefined}
            />
            {!feedback && (
              <button
                onClick={() => fillAnswer.trim() && checkAnswer(fillAnswer)}
                disabled={!fillAnswer.trim()}
                className="w-full bg-duo-blue hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-150 active:scale-95"
              >
                CHECK
              </button>
            )}
          </div>
        )}

        {showFireToast && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div key={Date.now()} className="animate-fire-toast bg-duo-orange text-white font-extrabold text-2xl px-8 py-4 rounded-full shadow-xl whitespace-nowrap">
              🔥🔥 ON FIRE! 🔥🔥
            </div>
          </div>
        )}
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div className={`max-w-lg mx-auto w-full animate-slide-up`}>
          <div
            className={`px-4 py-4 border-t-2 ${feedback === 'correct' ? '' : 'bg-duo-red/10 border-duo-red'}`}
            style={feedback === 'correct' ? { background: theme.subtle, borderColor: theme.accent } : undefined}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{feedback === 'correct' ? '🥳' : '😵'}</span>
              <div>
                <p
                  className={`font-bold ${feedback === 'correct' ? '' : 'text-duo-red'}`}
                  style={feedback === 'correct' ? { color: theme.accentDark } : undefined}
                >
                  {feedback === 'correct' ? 'Correct!' : 'Incorrect!'}
                </p>
                <p className="text-gray-600 text-sm mt-0.5">{question.explanation}</p>
              </div>
            </div>
            <button
              onClick={handleNext}
              className={`w-full font-bold text-white py-3 rounded-xl border-b-4 transition-all duration-150 active:scale-95
                ${feedback === 'correct'
                  ? ''
                  : 'bg-duo-red border-red-700 hover:bg-red-600'}`}
              style={feedback === 'correct' ? {
                background: `linear-gradient(to right, ${theme.accent}, ${theme.accentDark})`,
                borderColor: theme.accentDark,
              } : undefined}
            >
              {currentIndex + 1 >= questions.length ? 'SEE RESULTS' : 'CONTINUE'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
