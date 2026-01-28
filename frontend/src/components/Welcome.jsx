import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { TRANSLATIONS } from '../translations'

export default function Welcome({ onNext, language = 'english' }) {
    const t = TRANSLATIONS[language] || TRANSLATIONS.english;
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-premium rounded-[3rem] p-16 md:p-24 text-center shadow-2xl space-y-12 max-w-4xl mx-auto border-white/40"
        >
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block p-4 rounded-full bg-white/20 mb-4"
                >
                    <span className="text-4xl">🙏</span>
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight tracking-tight">
                    {t.welcome}
                </h2>
                <p className="text-2xl text-gray-700 leading-relaxed font-light max-w-2xl mx-auto">
                    {t.welcomeDesc}
                </p>
            </div>

            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onNext}
                className="group relative inline-flex items-center justify-center px-14 py-6 font-semibold tracking-[0.1em] text-white transition-all duration-300 bg-gray-950 rounded-full shadow-2xl overflow-hidden hover:bg-black"
            >
                <span className="relative z-10 flex items-center gap-3 text-lg">
                    {t.getStarted} <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-spiritual-600 to-spiritual-400 opacity-0 group-hover:opacity-10 transition-opacity" />
            </motion.button>
        </motion.div>
    )
}
