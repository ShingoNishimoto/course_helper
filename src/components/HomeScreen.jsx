import { useEffect, useState } from 'react'

const ABOUT_ITEMS = [
  { icon: '🎯', title: 'Game-based learning', desc: 'Progress through 7 units covering the full COMP6240 syllabus — from the Relational Model and SQL to Normalisation and Relational Algebra.' },
  { icon: '💬', title: 'Instant feedback', desc: 'Every answer triggers immediate feedback. Wrong answers show a detailed explanation so every mistake becomes a learning moment.' },
  { icon: '🔥', title: 'Streak & combo system', desc: 'Answer 3 or more questions correctly in a row and an "ON FIRE!" celebration pops up on screen.' },
  { icon: '💖', title: 'Lives system', desc: 'Each session starts with 3 hearts. Every wrong answer costs one heart — lose all three and the session ends.' },
  { icon: '⚡', title: 'XP & progression', desc: 'Complete a unit and earn XP based on correct answers. Finishing a unit unlocks the next one.' },
  { icon: '💾', title: 'Auto-saved progress', desc: 'Close the browser and your XP and completed units will still be there when you come back.' },
]

export default function HomeScreen({ units, progress, xp, streak, onStartLesson }) {
  const [animatedXP, setAnimatedXP] = useState(0)
  const [showAbout, setShowAbout] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedXP(xp), 100)
    return () => clearTimeout(timer)
  }, [xp])

  const isUnlocked = (index) => {
    if (index === 0) return true
    return progress[index - 1]?.completed === true
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header — green gradient */}
      <div className="bg-gradient-to-r from-duo-green to-duo-green-dark shadow-lg sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-float">🦉</span>
            <span className="font-black text-white text-xl tracking-wide">COMP6240</span>
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
            <span className={`text-duo-green font-black text-lg transition-transform duration-300 ${showAbout ? 'rotate-180' : ''}`}>
              ▾
            </span>
          </button>

          {showAbout && (
            <div className="border-t border-gray-100 px-4 py-4 flex flex-col gap-3 animate-slide-up">
              <p className="text-gray-500 text-sm leading-relaxed">
                A Duolingo-style quiz app to help you master <span className="font-bold text-duo-green">COMP6240</span> through engaging, game-like learning.
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
                        ? 'bg-gradient-to-b from-duo-green to-duo-green-dark'
                        : 'bg-gray-200'
                    }`}
                  />
                )}

                {/* Unit card */}
                <div
                  className={`w-full max-w-sm rounded-2xl border-b-4 p-4 transition-all duration-200
                    ${unlocked
                      ? 'bg-white border-duo-green-dark shadow-[0_4px_16px_rgba(88,204,2,0.18)] cursor-pointer hover:shadow-[0_8px_28px_rgba(88,204,2,0.32)] hover:-translate-y-1 active:scale-95 active:translate-y-0'
                      : 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
                    }`}
                  onClick={() => unlocked && onStartLesson(index)}
                >
                  <div className="flex items-center gap-3">
                    {/* Icon circle */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-sm
                        ${completed
                          ? 'bg-gradient-to-br from-duo-green to-duo-green-dark'
                          : unlocked
                            ? 'bg-gradient-to-br from-duo-green/30 to-duo-green/10'
                            : 'bg-gray-200'
                        }`}
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
                        <p className="text-xs text-duo-green font-bold mt-0.5">
                          Best score: {unitProgress}/{unit.questions.length}
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    {unlocked && !completed && (
                      <div className="w-8 h-8 rounded-full bg-duo-green flex items-center justify-center flex-shrink-0">
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
                          background: 'linear-gradient(to right, #58CC02, #89E219)',
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
            <div className="mt-6 bg-gradient-to-br from-duo-green to-duo-green-dark text-white rounded-2xl p-6 text-center animate-bounce-in shadow-lg">
              <div className="text-5xl mb-2">🎊🎉🎊</div>
              <h3 className="font-black text-2xl">Course Complete!</h3>
              <p className="text-sm opacity-90 mt-1">You've mastered all COMP6240 units!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
