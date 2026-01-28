import { useState } from 'react'
import { motion } from 'framer-motion'
import { TRANSLATIONS } from '../translations'

export default function NameInput({ userData, onNext, language = 'english' }) {
    const t = TRANSLATIONS[language] || TRANSLATIONS.english;
    const [name, setName] = useState(userData.name)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name.trim()) onNext(name)
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-[2rem] p-12 shadow-xl"
        >
            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-3">
                    <label className="text-3xl font-serif text-gray-800 block">
                        {t.namePlaceholder}
                    </label>
                    <p className="text-gray-500 font-light">
                        {t.safety}
                    </p>
                </div>

                <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.enterName}
                    className="w-full bg-white/50 border-b-2 border-gray-200 focus:border-gray-900 outline-none py-4 text-2xl font-light transition-colors duration-300 placeholder:text-gray-300"
                />

                <button
                    disabled={!name.trim()}
                    type="submit"
                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-medium tracking-wide disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-all active:scale-[0.98]"
                >
                    {t.next}
                </button>
            </form>
        </motion.div>
    )
}
