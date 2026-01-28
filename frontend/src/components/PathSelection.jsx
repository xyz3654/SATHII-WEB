import { motion } from 'framer-motion'
import { TRANSLATIONS } from '../translations'

const PATHS = [
    { id: 'gita', title: 'Bhagavad Gita', emoji: '🕉️', desc: 'Hindu philosophy on duty and cosmic order.' },
    { id: 'bible', title: 'The Bible', emoji: '✝️', desc: 'Ethical wisdom and parables of love and faith.' },
    { id: 'quran', title: 'The Quran', emoji: '☪️', desc: 'Perspectives on patience, intention, and clarity.' },
    { id: 'buddhist', title: 'Buddhist Teachings', emoji: '☸️', desc: 'Mindfulness, suffering, and the path to peace.' },
    { id: 'stoic', title: 'Stoic Philosophy', emoji: '🧠', desc: 'Practical logic and resilience in a changing world.' },
    { id: 'spiritual', title: 'Universal Spiritual', emoji: '🌱', desc: 'Non-religious wisdom for the modern soul.' }
]

export default function PathSelection({ onNext, language = 'english' }) {
    const t = TRANSLATIONS[language] || TRANSLATIONS.english;

    // In a real app, you might translate the paths too. 
    // For now, we'll keep the paths but translate the context.
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
        >
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif text-gray-800">{t.selectPath}</h2>
                <p className="text-gray-500 font-light italic">{t.pathDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PATHS.map((path, idx) => (
                    <motion.button
                        key={path.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => onNext(path.id)}
                        className="glass p-6 rounded-3xl text-left hover:bg-white transition-all group active:scale-95 border-none shadow-sm hover:shadow-md"
                    >
                        <div className="flex items-start gap-4">
                            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{path.emoji}</span>
                            <div>
                                <h3 className="text-xl font-medium text-gray-800">{path.title}</h3>
                                <p className="text-sm text-gray-500 font-light mt-1 leading-relaxed">{path.desc}</p>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    )
}
