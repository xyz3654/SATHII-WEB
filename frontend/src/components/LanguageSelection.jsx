import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { TRANSLATIONS } from '../translations'

const LANGUAGES = [
    { id: 'english', label: 'English' },
    { id: 'hindi', label: 'हिन्दी (Hindi)' },
    { id: 'bengali', label: 'বাংলা (Bengali)' },
    { id: 'telugu', label: 'తెలుగు (Telugu)' },
    { id: 'marathi', label: 'मराठी (Marathi)' },
    { id: 'tamil', label: 'தமிழ் (Tamil)' },
    { id: 'urdu', label: 'اردو (Urdu)' },
    { id: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
    { id: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
    { id: 'malayalam', label: 'മലയാളം (Malayalam)' },
    { id: 'odia', label: 'ଓଡ଼ିଆ (Odia)' },
    { id: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { id: 'assamese', label: 'অসমীয়া (Assamese)' }
]

export default function LanguageSelection({ onNext, language = 'english' }) {
    const t = TRANSLATIONS[language] || TRANSLATIONS.english;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="glass-premium rounded-[3rem] p-12 shadow-2xl space-y-8 max-w-4xl mx-auto"
        >
            <div className="text-center space-y-2">
                <div className="inline-block p-3 rounded-full bg-gray-100 mb-2">
                    <Languages className="text-gray-900" size={32} />
                </div>
                <h2 className="text-3xl font-serif text-gray-900">{t.selectLanguage}</h2>
                <p className="text-gray-500 font-light">{t.langDesc}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {LANGUAGES.map((lang, idx) => (
                    <motion.button
                        key={lang.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => onNext(lang.id)}
                        className="p-4 rounded-2xl bg-white/40 hover:bg-white transition-all text-sm font-medium text-gray-800 border border-white/50 active:scale-95"
                    >
                        {lang.label}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    )
}
