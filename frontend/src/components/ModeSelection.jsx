import { motion } from 'framer-motion'
import { Sun, Compass, Zap, Ghost } from 'lucide-react'
import { TRANSLATIONS } from '../translations'

const MODES = [
    { id: 'daily', title: 'Daily Reflection', emoji: <Sun size={24} />, desc: 'Start or end your day with centered wisdom.' },
    { id: 'decision', title: 'Decision Clarity', emoji: <Compass size={24} />, desc: 'Perspective for when you are at a crossroads.' },
    { id: 'strength', title: 'Inner Strength', emoji: <Zap size={24} />, desc: 'Find grit and resilience in challenging times.' },
    { id: 'silence', title: 'Silence Mode', emoji: <Ghost size={24} />, desc: 'Quiet guidance for moments of stillness.' }
]

export default function ModeSelection({ onNext, language = 'english' }) {
    const t = TRANSLATIONS[language] || TRANSLATIONS.english;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
        >
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif text-gray-800">{t.selectMode}</h2>
                <p className="text-gray-500 font-light italic">{t.modeDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MODES.map((mode, idx) => (
                    <motion.button
                        key={mode.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => onNext(mode.id)}
                        className="glass p-8 rounded-[2rem] text-center flex flex-col items-center gap-4 hover:bg-white transition-all shadow-sm group border-none"
                    >
                        <div className="p-4 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-gray-900 group-hover:bg-gray-100 transition-colors">
                            {mode.emoji}
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-gray-800">{mode.title}</h3>
                            <p className="text-sm text-gray-500 font-light mt-2">{mode.desc}</p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    )
}
