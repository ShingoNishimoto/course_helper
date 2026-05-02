import { useEffect, useState } from 'react'

const CONFETTI_COLORS = [
  '#58CC02', '#1CB0F6', '#FF9600', '#FF4B4B',
  '#FFC800', '#CE82FF', '#89E219', '#FF6B35',
]

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    duration: `${1.5 + Math.random() * 2.5}s`,
    delay: `${Math.random() * 1.2}s`,
    width: `${8 + Math.random() * 10}px`,
    height: `${10 + Math.random() * 14}px`,
    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-confetti-fall"
          style={{
            left: p.left,
            backgroundColor: p.color,
            width: p.width,
            height: p.height,
            borderRadius: p.borderRadius,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

export default function CompleteScreen({ unit, result, xpEarned, theme, onContinue, onRedo, onBackHome }) {
  const { score, total, failed } = result
  const percentage = Math.round((score / total) * 100)
  const [displayScore, setDisplayScore] = useState(0)
  const [showXP, setShowXP] = useState(false)

  useEffect(() => {
    const step = score / 20
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= score) {
        setDisplayScore(score)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.floor(current))
      }
    }, 50)
    return () => clearInterval(timer)
  }, [score])

  useEffect(() => {
    const timer = setTimeout(() => setShowXP(true), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between relative"
      style={{ background: `linear-gradient(to bottom, ${theme.page}, #ffffff)` }}
    >
      {!failed && percentage >= 60 && <Confetti />}

      <div className="flex-1 flex flex-col items-center justify-center max-w-lg w-full px-6 py-8 relative z-10">
        {/* Result emoji */}
        <div className="text-8xl mb-4 animate-bounce-in drop-shadow-md">
          {failed ? '😵' : percentage >= 80 ? '🏆' : percentage >= 60 ? '🌟' : '😤'}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black text-gray-800 mb-1 text-center">
          {failed ? 'Out of lives!' :
           percentage >= 80 ? 'Amazing work!' :
           percentage >= 60 ? 'Well done!' :
           'Keep practicing!'}
        </h1>
        <p className="text-gray-500 text-center mb-10">
          {failed ? 'You ran out of hearts. Try again!' :
           `You completed ${unit.title.replace(`Unit ${unit.id}: `, '')}`}
        </p>

        {/* Stats cards */}
        <div className="flex gap-3 w-full mb-6">
          {/* Score */}
          <div
            className="flex-1 border-2 rounded-2xl p-4 text-center shadow-sm"
            style={{
              background: `linear-gradient(to bottom, ${theme.subtle}, #ffffff)`,
              borderColor: theme.accent,
            }}
          >
            <p className="text-5xl font-black leading-none" style={{ color: theme.accentDark }}>{displayScore}</p>
            <p className="text-sm font-bold mt-1" style={{ color: theme.accentDark }}>/ {total}</p>
            <p className="text-xs font-black uppercase tracking-widest mt-1" style={{ color: theme.accent }}>Score</p>
          </div>

          {/* XP — pop animation on reveal */}
          <div
            className={`flex-1 bg-gradient-to-b from-yellow-50 to-white border-2 border-duo-yellow rounded-2xl p-4 text-center shadow-sm ${
              showXP ? 'animate-pop-up' : 'opacity-0 scale-50'
            }`}
          >
            <p className="text-5xl font-black text-yellow-600 leading-none">+{failed ? 0 : xpEarned}</p>
            <p className="text-xs font-black text-yellow-600 uppercase tracking-widest mt-2">XP Earned</p>
          </div>

          {/* Accuracy */}
          <div className="flex-1 bg-gradient-to-b from-blue-50 to-white border-2 border-duo-blue rounded-2xl p-4 text-center shadow-sm">
            <p className="text-5xl font-black text-blue-600 leading-none">
              {failed ? '—' : percentage}
            </p>
            {!failed && <p className="text-sm font-bold text-blue-600 mt-1">%</p>}
            <p className="text-xs font-black text-blue-600 uppercase tracking-widest mt-1">Accuracy</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="max-w-lg w-full px-6 pb-8 flex flex-col gap-3 relative z-10">
        {!failed && (
          <button
            onClick={onContinue}
            className="w-full text-white font-black text-lg py-4 rounded-2xl border-b-4 transition-all duration-150 active:scale-95"
            style={{
              background: `linear-gradient(to right, ${theme.accent}, ${theme.accentDark})`,
              borderColor: theme.accentDark,
              boxShadow: `0 6px 20px ${theme.shadow}`,
            }}
          >
            CONTINUE
          </button>
        )}
        <button
          onClick={onRedo}
          className="w-full bg-white hover:bg-gray-50 text-duo-blue font-black text-lg py-4 rounded-2xl border-2 border-duo-blue transition-all duration-150 active:scale-95 hover:shadow-md"
        >
          {failed ? 'TRY AGAIN' : 'PRACTICE AGAIN'}
        </button>
        {failed && (
          <button
            onClick={onBackHome}
            className="w-full bg-white hover:bg-gray-50 text-gray-500 font-black text-lg py-4 rounded-2xl border-2 border-gray-200 transition-all duration-150 active:scale-95 hover:shadow-md"
          >
            BACK TO HOME
          </button>
        )}
      </div>
    </div>
  )
}
