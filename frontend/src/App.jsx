import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Splash from './components/Splash'
import Welcome from './components/Welcome'
import NameInput from './components/NameInput'
import PathSelection from './components/PathSelection'
import ModeSelection from './components/ModeSelection'
import LanguageSelection from './components/LanguageSelection'
import GuidanceDashboard from './components/GuidanceDashboard'
import ResponseScreen from './components/ResponseScreen'
import { TRANSLATIONS } from './translations'

const STEPS = {
    SPLASH: 'splash',
    WELCOME: 'welcome',
    NAME: 'name',
    LANGUAGE: 'language',
    PATH: 'path',
    MODE: 'mode',
    DASHBOARD: 'dashboard',
    RESPONSE: 'response'
}

function App() {
    const [step, setStep] = useState(STEPS.SPLASH)
    const [userData, setUserData] = useState({
        name: '',
        language: 'english',
        path: '',
        mode: '',
        message: ''
    })
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState([]) // Array of {role, content}

    // Auto-advance Splash
    useEffect(() => {
        if (step === STEPS.SPLASH) {
            const timer = setTimeout(() => setStep(STEPS.WELCOME), 3000)
            return () => clearTimeout(timer)
        }
    }, [step])

    const nextStep = (next) => setStep(next)

    const handleBack = () => {
        switch (step) {
            case STEPS.NAME: setStep(STEPS.WELCOME); break;
            case STEPS.LANGUAGE: setStep(STEPS.NAME); break;
            case STEPS.PATH: setStep(STEPS.LANGUAGE); break;
            case STEPS.MODE: setStep(STEPS.PATH); break;
            case STEPS.DASHBOARD: setStep(STEPS.MODE); break;
            case STEPS.RESPONSE: setStep(STEPS.DASHBOARD); break;
            default: break;
        }
    }

    const updateUserData = (data) => {
        setUserData(prev => ({ ...prev, ...data }))
    }

    const renderStep = () => {
        switch (step) {
            case STEPS.SPLASH:
                return <Splash key="splash" language={userData.language} />
            case STEPS.WELCOME:
                return <Welcome key="welcome" language={userData.language} onNext={() => nextStep(STEPS.NAME)} />
            case STEPS.NAME:
                return <NameInput
                    key="name"
                    userData={userData}
                    language={userData.language}
                    onNext={(name) => {
                        updateUserData({ name })
                        setStep(STEPS.LANGUAGE)
                    }}
                />
            case STEPS.LANGUAGE:
                return <LanguageSelection
                    key="language"
                    language={userData.language}
                    onNext={(language) => {
                        updateUserData({ language })
                        setStep(STEPS.PATH)
                    }}
                />
            case STEPS.PATH:
                return <PathSelection
                    key="path"
                    language={userData.language}
                    onNext={(path) => {
                        updateUserData({ path })
                        nextStep(STEPS.MODE)
                    }}
                />
            case STEPS.MODE:
                return <ModeSelection
                    key="mode"
                    language={userData.language}
                    onNext={(mode) => {
                        updateUserData({ mode })
                        nextStep(STEPS.DASHBOARD)
                    }}
                />
            case STEPS.DASHBOARD:
                return <GuidanceDashboard
                    key="dashboard"
                    userData={userData}
                    history={history}
                    onBack={() => setStep(STEPS.PATH)}
                    onLanguageChange={() => setStep(STEPS.LANGUAGE)}
                    onNext={async (message) => {
                        updateUserData({ message })
                        setLoading(true)
                        setStep(STEPS.RESPONSE)

                        const newHistory = [...history, { role: 'user', content: message }]
                        setHistory(newHistory)

                        try {
                            const apiUrl = import.meta.env.VITE_API_URL || ''
                            const res = await fetch(`${apiUrl}/api/guidance`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Bypass-Tunnel-Reminder': 'true'
                                },
                                body: JSON.stringify({ ...userData, message, history: newHistory })
                            })
                            const data = await res.json()
                            setResponse(data.response)
                            setHistory(prev => [...prev, { role: 'assistant', content: data.response }])
                        } catch (err) {
                            console.error("FULL ERROR DETAILS:", err);
                            console.log("Failed API URL:", `${import.meta.env.VITE_API_URL || ''}/api/guidance`);
                            setResponse("I'm sorry, I'm having trouble connecting to the wisdom right now. Please try again soon.")
                        } finally {
                            setLoading(false)
                        }
                    }}
                />
            case STEPS.RESPONSE:
                return <ResponseScreen
                    key="response"
                    response={response}
                    loading={loading}
                    userData={userData}
                    onReset={() => setStep(STEPS.DASHBOARD)}
                    onChangePath={() => setStep(STEPS.PATH)}
                />
            default:
                return <Splash language={userData.language} />
        }
    }

    return (
        <div className="min-h-screen bg-premium-image flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-40 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px] opacity-40 animate-pulse" />
            <div className="absolute top-[30%] right-[10%] w-[20%] h-[20%] bg-orange-50 rounded-full blur-[100px] opacity-30" />

            {/* Universal Back Button */}
            <AnimatePresence>
                {![STEPS.SPLASH, STEPS.WELCOME].includes(step) && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onClick={handleBack}
                        className="absolute top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-gray-800 transition-all group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                            {TRANSLATIONS[userData.language.toLowerCase()]?.back || 'Back'}
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            <main className="w-full max-w-2xl z-10">
                <AnimatePresence mode="wait">
                    {renderStep()}
                </AnimatePresence>
            </main>

            {/* Footer Info (Gentle) */}
            <footer className="absolute bottom-6 text-gray-400 text-sm font-light">
                Sathi — {TRANSLATIONS[userData.language.toLowerCase()]?.companion || 'Your Spiritual Companion'}
            </footer>
        </div>
    )
}

export default App
