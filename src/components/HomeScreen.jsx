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
      viewBox="0 0 80 80"
      role="img"
      aria-label="Graduation Shiba dog mascot"
      className="w-12 h-12 animate-float drop-shadow-sm"
    >
      <circle cx="40" cy="42" r="34" fill="#FFF7ED" />
      <path d="M17 31 L25 11 L36 28 Z" fill="#D9772B" />
      <path d="M63 31 L55 11 L44 28 Z" fill="#D9772B" />
      <path d="M24 28 L27 18 L34 29 Z" fill="#FFE7C2" />
      <path d="M56 28 L53 18 L46 29 Z" fill="#FFE7C2" />
      <path
        d="M15 41 C15 25 26 17 40 17 C54 17 65 25 65 41 C65 56 54 67 40 67 C26 67 15 56 15 41 Z"
        fill="#E07B2E"
      />
      <path
        d="M24 45 C24 34 31 28 40 28 C49 28 56 34 56 45 C56 58 49 65 40 65 C31 65 24 58 24 45 Z"
        fill="#FFF1D6"
      />
      <path d="M25 37 C28 30 33 27 39 27 L35 40 Z" fill="#B85B1E" opacity="0.35" />
      <path d="M55 37 C52 30 47 27 41 27 L45 40 Z" fill="#B85B1E" opacity="0.35" />
      <circle cx="31" cy="43" r="3.4" fill="#1F2937" />
      <circle cx="49" cy="43" r="3.4" fill="#1F2937" />
      <circle cx="29.8" cy="41.8" r="1" fill="#FFFFFF" />
      <circle cx="47.8" cy="41.8" r="1" fill="#FFFFFF" />
      <circle cx="24" cy="49" r="3.5" fill="#FDBA74" opacity="0.65" />
      <circle cx="56" cy="49" r="3.5" fill="#FDBA74" opacity="0.65" />
      <path d="M36.5 50 C38 48.5 42 48.5 43.5 50 C42.5 52.3 37.5 52.3 36.5 50 Z" fill="#1F2937" />
      <path d="M40 52 C39 55 35.5 56 33 54.5" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 52 C41 55 44.5 56 47 54.5" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 60 C29 68 51 68 55 60 C51 72 29 72 25 60 Z" fill="#C76A24" opacity="0.18" />

      <path d="M23 20 L40 10 L57 20 L40 29 Z" fill="#1E293B" />
      <path d="M29 22 V30 C35 34 45 34 51 30 V22 L40 28 Z" fill="#334155" />
      <path d="M57 20 V32" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="57" cy="34" r="2.4" fill="#FBBF24" />
      <path d="M31 22 L40 17 L49 22" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
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
