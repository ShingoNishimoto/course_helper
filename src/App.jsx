import { useState, useEffect } from 'react'
import data from './data/questions.json'
import HomeScreen from './components/HomeScreen'
import LessonScreen from './components/LessonScreen'
import QuizScreen from './components/QuizScreen'
import CompleteScreen from './components/CompleteScreen'

const STORAGE_KEY = 'comp6240_progress'

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return { xp: 0, streak: 1, progress: {} }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [activeUnitIndex, setActiveUnitIndex] = useState(0)
  const [quizResult, setQuizResult] = useState(null)
  const [gameState, setGameState] = useState(loadState)

  useEffect(() => {
    saveState(gameState)
  }, [gameState])

  const units = data.units
  const activeUnit = units[activeUnitIndex]

  const handleStartLesson = (index) => {
    setActiveUnitIndex(index)
    setScreen('lesson')
  }

  const handleBeginQuiz = () => {
    setScreen('quiz')
  }

  const handleQuizComplete = (result) => {
    setQuizResult(result)
    if (!result.failed) {
      const xpEarned = result.score * 10
      setGameState((prev) => ({
        ...prev,
        xp: prev.xp + xpEarned,
        progress: {
          ...prev.progress,
          [activeUnitIndex]: {
            completed: true,
            score: Math.max(result.score, prev.progress[activeUnitIndex]?.score ?? 0),
          },
        },
      }))
    }
    setScreen('complete')
  }

  const handleContinue = () => {
    const nextIndex = activeUnitIndex + 1
    if (nextIndex < units.length) {
      setActiveUnitIndex(nextIndex)
      setScreen('lesson')
    } else {
      setScreen('home')
    }
  }

  const handleRedo = () => {
    setQuizResult(null)
    setScreen('quiz')
  }

  const xpEarned = quizResult ? quizResult.score * 10 : 0

  return (
    <div className="max-w-lg mx-auto min-h-screen">
      {screen === 'home' && (
        <HomeScreen
          units={units}
          progress={gameState.progress}
          xp={gameState.xp}
          streak={gameState.streak}
          onStartLesson={handleStartLesson}
        />
      )}
      {screen === 'lesson' && (
        <LessonScreen
          unit={activeUnit}
          onStart={handleBeginQuiz}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'quiz' && (
        <QuizScreen
          key={`${activeUnitIndex}-${Date.now()}`}
          unit={activeUnit}
          onComplete={handleQuizComplete}
          onQuit={() => setScreen('home')}
        />
      )}
      {screen === 'complete' && quizResult && (
        <CompleteScreen
          unit={activeUnit}
          result={quizResult}
          xpEarned={xpEarned}
          onContinue={handleContinue}
          onRedo={handleRedo}
        />
      )}
    </div>
  )
}
