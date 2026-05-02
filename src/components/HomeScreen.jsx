import { useEffect, useState } from 'react'

const ABOUT_ITEMS = [
  { icon: '🎯', title: 'Game-based learning', desc: 'Progress through 7 units covering the full Relational Database syllabus — from the Relational Model and SQL to Normalisation and Relational Algebra.' },
  { icon: '💬', title: 'Instant feedback', desc: 'Every answer triggers immediate feedback. Wrong answers show a detailed explanation so every mistake becomes a learning moment.' },
  { icon: '🔥', title: 'Streak & combo system', desc: 'Answer 3 or more questions correctly in a row and an "ON FIRE!" celebration pops up on screen.' },
  { icon: '💖', title: 'Lives system', desc: 'Each session starts with 3 hearts. Every wrong answer costs one heart — lose all three and the session ends.' },
  { icon: '⚡', title: 'XP & progression', desc: 'Complete a unit and earn XP based on correct answers. Finishing a unit unlocks the next one.' },
  { icon: '💾', title: 'Auto-saved progress', desc: 'Close the browser and your XP and completed units will still be there when you come back.' },
]

function ShibaMascot() {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Shiba dog mascot"
      className="w-10 h-10 animate-float drop-shadow-sm"
    >
      <path d="M14 22 L20 7 L30 18 Z" fill="#C76A24" />
      <path d="M50 22 L44 7 L34 18 Z" fill="#C76A24" />
      <path d="M19 19 L22 11 L28 20 Z" fill="#FFE2B8" />
      <path d="M45 19 L42 11 L36 20 Z" fill="#FFE2B8" />
      <path
        d="M10 31 C10 18 20 11 32 11 C44 11 54 18 54 31 C54 46 44 57 32 57 C20 57 10 46 10 31 Z"
        fill="#D9772B"
      />
      <path
        d="M18 36 C18 28 24 23 32 23 C40 23 46 28 46 36 C46 47 40 54 32 54 C24 54 18 47 18 36 Z"
        fill="#FFF2D8"
      />
      <path d="M20 29 C22 24 26 21 31 21 L28 31 Z" fill="#B85B1E" opacity="0.42" />
      <path d="M44 29 C42 24 38 21 33 21 L36 31 Z" fill="#B85B1E" opacity="0.42" />
      <circle cx="24" cy="33" r="3" fill="#1F2937" />
      <circle cx="40" cy="33" r="3" fill="#1F2937" />
      <path d="M29 39 C30.5 37.5 33.5 37.5 35 39 C34 41 30 41 29 39 Z" fill="#1F2937" />
      <path d="M32 41 C31 44 28 45 25 43.5" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 41 C33 44 36 45 39 43.5" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 33 C14 42 19 50 27 54 C18 53 10 45 8 36 Z" fill="#B85B1E" opacity="0.2" />
      <path d="M51 33 C50 42 45 50 37 54 C46 53 54 45 56 36 Z" fill="#B85B1E" opacity="0.2" />
    </svg>
  )
}

export default function HomeScreen({ units, progress, xp, streak, theme, themes, onThemeChange, onStartLesson }) {
  const [animatedXP, setAnimatedXP] = useState(0)
  const [showAbout, setShowAbout] = useState(false)
  const [showThemePicker, setShowThemePicker] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedXP(xp), 100)
    return () => clearTimeout(timer)
  }, [xp])

  const isUnlocked = (index) => {
    if (index === 0) return true
    return progress[index - 1]?.completed === true
  }

  return (
    <div className="min-h-screen" style={{ background: theme.page }}>
      {/* Header */}
      <div
        className="shadow-lg sticky top-0 z-10"
        style={{ background: `linear-gradient(to right, ${theme.accent}, ${theme.accentDark})` }}
      >
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShibaMascot />
            <span className="font-black text-white text-xl tracking-wide">Relational Database</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/25 rounded-full px-3 py-1.5">
              <span className="text-xl">🔥</span>
              <span className="font-black text-white text-2xl leading-none">{streak}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/25 rounded-full px-3 py-1.5">
              <span className="text-xl">⚡</span>
              <span className="font-black text-white text-2xl leading-none">{animatedXP}</span>
              <span className="font-bold text-white/80 text-sm">XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto px-4 py-6">

        {/* About dropdown */}
        <div className="mb-5 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <button
            onClick={() => setShowAbout((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">📖</span>
              <span className="font-black text-gray-700 text-sm">About this app</span>
            </div>
            <span
              className={`font-black text-lg transition-transform duration-300 ${showAbout ? 'rotate-180' : ''}`}
              style={{ color: theme.accent }}
            >
              ▾
            </span>
          </button>

          {showAbout && (
            <div className="border-t border-gray-100 px-4 py-4 flex flex-col gap-3 animate-slide-up">
              <p className="text-gray-500 text-sm leading-relaxed">
                A quiz app to help you master <span className="font-bold" style={{ color: theme.accent }}>Relational Database</span> through engaging, game-like learning.
              </p>
              {ABOUT_ITEMS.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-gray-700 text-sm">{item.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-5 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <button
            onClick={() => setShowThemePicker((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full border border-white shadow-sm"
                style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})` }}
              />
              <span className="font-black text-gray-700 text-sm">App color</span>
              <span
                className="text-xs font-black rounded-full px-2.5 py-0.5"
                style={{ color: theme.accentDark, background: theme.accentSoft }}
              >
                {theme.name}
              </span>
            </div>
            <span
              className={`font-black text-lg transition-transform duration-300 ${showThemePicker ? 'rotate-180' : ''}`}
              style={{ color: theme.accent }}
            >
              ▾
            </span>
          </button>

          {showThemePicker && (
            <div className="border-t border-gray-100 px-4 py-3 animate-slide-up">
              <div className="grid grid-cols-4 gap-2">
                {themes.map((option) => {
                  const selected = option.id === theme.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onThemeChange(option.id)}
                      className={`h-10 rounded-xl border-2 transition-all active:scale-95 ${selected ? 'shadow-md' : 'hover:-translate-y-0.5'}`}
                      style={{
                        borderColor: selected ? option.accentDark : '#E5E7EB',
                        background: `linear-gradient(135deg, ${option.accent}, ${option.accentDark})`,
                        boxShadow: selected ? `0 6px 18px ${option.shadow}` : 'none',
                      }}
                      aria-label={`Use ${option.name} theme`}
                      title={option.name}
                    >
                      <span className="sr-only">{option.name}</span>
                      {selected && <span className="text-white font-black text-base">✓</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <h2 className="text-center text-gray-400 text-xs font-black uppercase tracking-widest mb-6">
          Your Learning Path
        </h2>

        {/* Skill tree */}
        <div className="flex flex-col items-center gap-4">
          {units.map((unit, index) => {
            const unlocked = isUnlocked(index)
            const completed = progress[index]?.completed
            const unitProgress = progress[index]?.score ?? 0

            return (
              <div key={unit.id} className="flex flex-col items-center w-full">
                {/* Connector line */}
                {index > 0 && (
                  <div
                    className={`w-1.5 h-8 rounded-full mb-1 ${
                      completed
                        ? ''
                        : 'bg-gray-200'
                    }`}
                    style={completed ? { background: `linear-gradient(to bottom, ${theme.accent}, ${theme.accentDark})` } : undefined}
                  />
                )}

                {/* Unit card */}
                <div
                  className={`w-full max-w-sm rounded-2xl border-b-4 p-4 transition-all duration-200
                    ${unlocked
                      ? 'bg-white cursor-pointer hover:-translate-y-1 active:scale-95 active:translate-y-0'
                      : 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
                    }`}
                  style={unlocked ? {
                    borderColor: theme.accentDark,
                    boxShadow: `0 4px 16px ${theme.shadow}`,
                  } : undefined}
                  onClick={() => unlocked && onStartLesson(index)}
                >
                  <div className="flex items-center gap-3">
                    {/* Icon circle */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-sm
                        ${completed
                          ? ''
                          : unlocked
                            ? ''
                            : 'bg-gray-200'
                        }`}
                      style={completed || unlocked ? {
                        background: completed
                          ? `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`
                          : `linear-gradient(135deg, ${theme.accentSoft}, ${theme.subtle})`,
                      } : undefined}
                    >
                      {completed ? '🌟' : unlocked ? unit.icon : '🔐'}
                    </div>

                    {/* Text */}
                    <div className="flex-1 text-left">
                      <p className="text-xs font-black text-duo-gray uppercase tracking-wider">
                        Unit {unit.id}
                      </p>
                      <h3 className={`font-bold text-base leading-tight ${unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                        {unit.title.replace(`Unit ${unit.id}: `, '')}
                      </h3>
                      {completed && (
                        <p className="text-xs font-bold mt-0.5" style={{ color: theme.accent }}>
                          Best score: {unitProgress}/{unit.questions.length}
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    {unlocked && !completed && (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: theme.accent }}
                      >
                        <span className="text-white font-black text-base leading-none">▶</span>
                      </div>
                    )}
                  </div>

                  {/* Progress bar for completed */}
                  {completed && (
                    <div className="mt-3 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full transition-all duration-700"
                        style={{
                          width: `${(unitProgress / unit.questions.length) * 100}%`,
                          background: `linear-gradient(to right, ${theme.accent}, ${theme.accentDark})`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* All done message */}
          {units.every((_, i) => progress[i]?.completed) && (
            <div
              className="mt-6 text-white rounded-2xl p-6 text-center animate-bounce-in shadow-lg"
              style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})` }}
            >
              <div className="text-5xl mb-2">🎊🎉🎊</div>
              <h3 className="font-black text-2xl">Course Complete!</h3>
              <p className="text-sm opacity-90 mt-1">You've mastered all Relational Database units!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
