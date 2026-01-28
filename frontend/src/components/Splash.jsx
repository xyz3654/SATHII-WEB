import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { TRANSLATIONS } from '../translations'

export default function Splash({ language = 'english' }) {
    const t = TRANSLATIONS[language] || TRANSLATIONS.english;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center justify-center text-center space-y-12"
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                    rotate: [0, 180, 360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="relative"
            >
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150" />
                <Sparkles size={120} strokeWidth={0.5} className="text-gray-900 relative z-10 opacity-80" />
            </motion.div>

            <div className="space-y-4">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-8xl md:text-9xl font-serif text-gray-950 tracking-tighter"
                >
                    Sathi
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-2xl md:text-3xl text-gray-700 font-light tracking-[0.3em] uppercase"
                >
                    {t.welcomeDesc.split('.')[0]}.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="pt-12"
            >
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-6" />
                <p className="text-gray-500 font-light tracking-widest text-sm uppercase">
                    {t.langDesc}
                </p>
            </motion.div>
        </motion.div>
    )
}
