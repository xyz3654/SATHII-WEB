import { motion } from 'framer-motion'
import { RefreshCcw, ChevronLeft, Quote } from 'lucide-react'
import { TRANSLATIONS } from '../translations'

export default function ResponseScreen({ response, loading, userData, onReset, onChangePath }) {
    const t = TRANSLATIONS[userData.language.toLowerCase()] || TRANSLATIONS.english;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center space-y-12 py-32">
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 border-t-2 border-r-2 border-gray-900 rounded-full"
                />
                <div className="text-center space-y-4">
                    <p className="text-3xl font-serif text-gray-950 tracking-wide animate-pulse italic">{t.quietlyReflecting}</p>
                    <p className="text-gray-500 font-light tracking-[0.2em] uppercase text-xs">{t.consulting} {userData.path}</p>
                </div>
            </div>
        )
    }

    // Extract Source and Text for special callout, but keep them in the main flow if parsing is messy
    const sourceMatch = response.match(/Source:?\s*([^\n]*)/i);
    const textMatch = response.match(/Text:?\s*("(?:[^"\\]|\\.)*")/i);

    // Create a version of the message for display that doesn't feel cut off
    // We'll just show the whole response but highlight the source if found
    const coreMessage = response;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full space-y-12 pb-24"
        >
            <div className="flex justify-between items-center px-4">
                <button onClick={onReset} className="group flex items-center gap-3 text-gray-400 hover:text-gray-950 transition-all text-sm uppercase tracking-widest font-medium">
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> {t.history}
                </button>
                <span className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase">{userData.path} {t.insight}</span>
            </div>

            <div className="glass-premium rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-gray-900 pointer-events-none">
                    <Quote size={180} />
                </div>

                <div className="relative z-10 space-y-12">
                    {/* Main Conversational Body */}
                    <div className="text-xl md:text-2xl text-gray-800 leading-[1.8] font-light font-serif whitespace-pre-wrap">
                        {coreMessage}
                    </div>

                    {/* Structured Source Presentation */}
                    {(sourceMatch || textMatch) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="border-t border-gray-100 pt-10 space-y-6"
                        >
                            {textMatch && (
                                <p className="text-xl text-gray-600 font-light leading-relaxed">
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t.teaching}</span>
                                    "{textMatch[1]}"
                                </p>
                            )}
                            {sourceMatch && (
                                <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                                    <span className="w-2 h-2 bg-spiritual-400 rounded-full animate-pulse" />
                                    <span className="text-sm font-medium text-gray-500 italic">{sourceMatch[1]}</span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onReset}
                    className="flex items-center gap-3 px-12 py-5 bg-gray-950 text-white rounded-full shadow-xl hover:bg-black transition-all font-semibold tracking-widest text-sm uppercase"
                >
                    <RefreshCcw size={18} /> {t.continueChat}
                </motion.button>
                <button
                    onClick={onChangePath}
                    className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-all uppercase tracking-[0.2em] border-b border-transparent hover:border-gray-300 pb-1"
                >
                    {t.exploreDifferent}
                </button>
            </div>
        </motion.div>
    )
}
