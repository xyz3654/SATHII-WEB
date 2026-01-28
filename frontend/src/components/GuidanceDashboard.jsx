import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Settings } from 'lucide-react'
import { TRANSLATIONS } from '../translations'

export default function GuidanceDashboard({ userData, onNext, onBack, onLanguageChange, history = [] }) {
    const t = TRANSLATIONS[userData.language.toLowerCase()] || TRANSLATIONS.english;
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.trim()) {
            onNext(message)
            setMessage('')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex flex-col h-[75vh]"
        >
            <div className="shrink-0 mb-8 flex justify-between items-end">
                <div className="space-y-1">
                    <h2 className="text-4xl font-serif text-gray-950">{t.peaceBeWithYou}, {userData.name}.</h2>
                    <p className="text-gray-500 font-light flex items-center gap-2 flex-wrap">
                        {t.reflectingOn} <span className="font-medium text-gray-800 capitalize">{userData.path}</span>
                        <button onClick={onBack} className="text-xs font-medium uppercase tracking-widest text-gray-400 hover:text-gray-950 transition-colors ml-2 border-b border-gray-200">
                            {t.changePath}
                        </button>
                        <span className="mx-2">•</span>
                        In <span className="font-medium text-gray-800 capitalize">{userData.language}</span>
                        {/* Assuming we might want to change language too */}
                        {onLanguageChange && (
                            <button onClick={onLanguageChange} className="text-xs font-medium uppercase tracking-widest text-gray-400 hover:text-gray-950 transition-colors ml-2 border-b border-gray-200">
                                {t.changeLang}
                            </button>
                        )}
                    </p>
                </div>
            </div>

            {/* Chat History Container */}
            <div className="flex-1 overflow-y-auto space-y-8 pr-4 mb-6 scrollbar-hide flex flex-col-reverse">
                <div className="flex flex-col space-y-8">
                    {history.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] px-8 py-6 rounded-[2.5rem] text-xl font-light leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user'
                                ? 'bg-gray-950 text-white rounded-tr-sm'
                                : 'glass-premium text-gray-800 rounded-tl-sm border-white/20'
                                }`}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="shrink-0 relative">
                <textarea
                    autoFocus
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={history.length > 0 ? t.whatsOnMind : t.speakFreely}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    className="w-full h-32 glass-premium p-8 rounded-[2.5rem] text-xl font-light outline-none ring-0 border-white/50 shadow-xl focus:shadow-2xl transition-all resize-none placeholder:text-gray-400 leading-relaxed"
                ></textarea>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!message.trim()}
                    className="absolute bottom-6 right-6 p-4 bg-gray-950 text-white rounded-full disabled:opacity-20 disabled:cursor-not-allowed shadow-lg hover:bg-black transition-colors"
                >
                    <Send size={24} />
                </motion.button>
            </form>

            <p className="text-center text-gray-400 text-xs mt-4 uppercase tracking-[0.2em] font-light">
                {t.safety}
            </p>
        </motion.div>
    )
}
