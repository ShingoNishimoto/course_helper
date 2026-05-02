export default function LessonScreen({ unit, theme, onStart, onBack }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: theme.page }}>
      {/* Gradient hero cover */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}, ${theme.accentDark})` }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-white/5 rounded-full pointer-events-none" />

        {/* Close button */}
        <div className="relative max-w-lg mx-auto px-4 pt-4">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-white font-black text-base transition-all"
          >
            ✕
          </button>
        </div>

        {/* Icon + title */}
        <div className="relative max-w-lg mx-auto px-6 pb-10 pt-2 text-center">
          <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center text-6xl mb-4 mx-auto animate-bounce-in shadow-lg">
            {unit.icon}
          </div>
          <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1">
            Unit {unit.id}
          </p>
          <h1 className="text-3xl font-black text-white leading-tight">
            {unit.title.replace(`Unit ${unit.id}: `, '')}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-6 py-6">
        {/* Description card */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-5 border border-gray-100">
          <p className="text-gray-600 text-center text-base leading-relaxed">
            {unit.description}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-3xl font-black text-gray-800">{unit.questions.length}</p>
            <p className="text-xs font-bold text-duo-gray uppercase tracking-wide mt-0.5">Questions</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-3xl font-black text-duo-red">3</p>
            <p className="text-xs font-bold text-duo-gray uppercase tracking-wide mt-0.5">Lives</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-3xl font-black text-duo-yellow">+{unit.questions.length * 10}</p>
            <p className="text-xs font-bold text-duo-gray uppercase tracking-wide mt-0.5">XP Reward</p>
          </div>
        </div>

        <div className="flex-1" />
      </div>

      {/* Start button */}
      <div className="max-w-lg mx-auto w-full px-6 pb-8">
        <button
          onClick={onStart}
          className="w-full active:scale-95 text-white font-black text-xl py-5 rounded-2xl border-b-4 transition-all duration-150"
          style={{
            background: `linear-gradient(to right, ${theme.accent}, ${theme.accentDark})`,
            borderColor: theme.accentDark,
            boxShadow: `0 6px 20px ${theme.shadow}`,
          }}
        >
          START LESSON
        </button>
      </div>
    </div>
  )
}
