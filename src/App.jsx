import { useState, useEffect } from 'react'
import data from './data/questions.json'
import HomeScreen from './components/HomeScreen'
import LessonScreen from './components/LessonScreen'
import QuizScreen from './components/QuizScreen'
import CompleteScreen from './components/CompleteScreen'

const STORAGE_KEY = 'comp6240_progress'

const THEMES = [
  {
    id: 'ocean',
    name: 'Ocean',
    accent: '#2563EB',
    accentDark: '#1E40AF',
    accentSoft: '#DBEAFE',
    page: '#F8FAFC',
    subtle: '#EFF6FF',
    shadow: 'rgba(37, 99, 235, 0.22)',
  },
  {
    id: 'violet',
    name: 'Violet',
    accent: '#7C3AED',
    accentDark: '#5B21B6',
    accentSoft: '#EDE9FE',
    page: '#FAF7FF',
    subtle: '#F5F3FF',
    shadow: 'rgba(124, 58, 237, 0.22)',
  },
  {
    id: 'coral',
    name: 'Coral',
    accent: '#E11D48',
    accentDark: '#9F1239',
    accentSoft: '#FFE4E6',
    page: '#FFF8F7',
    subtle: '#FFF1F2',
    shadow: 'rgba(225, 29, 72, 0.2)',
  },
  {
    id: 'slate',
    name: 'Slate',
    accent: '#475569',
    accentDark: '#1E293B',
    accentSoft: '#E2E8F0',
    page: '#F8FAFC',
    subtle: '#F1F5F9',
    shadow: 'rgba(71, 85, 105, 0.22)',
  },
]

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return { xp: 0, streak: 1, progress: {}, themeId: 'ocean' }
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
  const activeTheme = THEMES.find((theme) => theme.id === gameState.themeId) ?? THEMES[0]

  const handleThemeChange = (themeId) => {
    setGameState((prev) => ({ ...prev, themeId }))
  }

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
          theme={activeTheme}
          themes={THEMES}
          onThemeChange={handleThemeChange}
          onStartLesson={handleStartLesson}
        />
      )}
      {screen === 'lesson' && (
        <LessonScreen
          unit={activeUnit}
          theme={activeTheme}
          onStart={handleBeginQuiz}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'quiz' && (
        <QuizScreen
          key={`${activeUnitIndex}-${Date.now()}`}
          unit={activeUnit}
          theme={activeTheme}
          onComplete={handleQuizComplete}
          onQuit={() => setScreen('home')}
        />
      )}
      {screen === 'complete' && quizResult && (
        <CompleteScreen
          unit={activeUnit}
          result={quizResult}
          xpEarned={xpEarned}
          theme={activeTheme}
          onContinue={handleContinue}
          onRedo={handleRedo}
        />
      )}
    </div>
  )
}
