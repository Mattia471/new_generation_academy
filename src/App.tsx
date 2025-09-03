import React, {useEffect, useState} from 'react';
import {
    ArrowDown,
    Calendar,
    CheckCircle,
    Clock,
    Heart,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Send,
    Star,
    User,
    Users,
    X
} from 'lucide-react';
import {DaySchedule, FreeTrialForm, NavButtonProps, SectionType, TeamProjectForm} from './types';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from "@vercel/speed-insights/react"

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SectionType>('home');
    const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
    const [formFreeTrial, setFormFreeTrial] = useState<FreeTrialForm>({
        name: '',
        surname: '',
        email: '',
        phone: '',
        day: '',
        message: ''
    });
    const [formSent, setFormSent] = useState<boolean>(false);
    const [loadingSending, setLoadingSending] = useState<boolean>(false);
    const [showTeamForm, setShowTeamForm] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [formTeamProject, setFormTeamProject] = useState<TeamProjectForm>({
        name: '',
        surname: '',
        email: '',
        phone: ''
    });

   useEffect(() => {
        const targetDate = new Date('2025-10-01T20:00:00'); // Data e ora dell'evento
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);



    const courses: DaySchedule[] = [
        {
            day: 'LUNEDÌ',
            classes: [
                { time: '20:45', name: 'Bachata Musicality', level: 'Intermedio' },
                { time: '21:45', name: 'Bachata Sensual Liv. 3', level: 'Avanzato' }
            ]
        },
        {
            day: 'MARTEDÌ',
            classes: [
                { time: '20:30', name: 'Bachata Lady Style', level: 'Tutti i livelli' },
                { time: '21:30', name: 'Bachata Sensual Liv. 2', level: 'Intermedio 2' }
            ]
        },
        {
            day: 'MERCOLEDÌ',
            classes: [
                { time: '20:30', name: 'Salsa Liv. 1', level: 'Intermedio' },
                { time: '21:30', name: 'Bachata Sensual Liv. 1', level: 'Intermedio' }
            ]
        },
        {
            day: 'GIOVEDÌ',
            classes: [
                { time: '20:30', name: 'Salsa Principianti', level: 'Principianti' },
                { time: '21:30', name: 'Bachata Principianti', level: 'Principianti' }
            ]
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, set:any) => {
        const { name, value } = e.target;
        set((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    };


    const sendFreeTrialEmail = async (formData: FreeTrialForm): Promise<void> => {
        try {
            // Invio email con EmailJS
            await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: 'service_6lwhe1n',
                    template_id: 'template_bmwlowp',
                    user_id: 'yICjmAQWVh4F8z63n',
                    template_params: {
                        name: formData.name,
                        surname: formData.surname,
                        email: formData.email,
                        phone: formData.phone,
                        day: formData.day,
                        message: formData.message || 'Nessuna nota aggiuntiva',
                        time: new Date().toLocaleString('it-IT', {
                            dateStyle: 'short',
                            timeStyle: 'short'
                        })
                    }
                })
            });
        } catch (error) {
            console.error('❌ Errore EmailJS:', error);
        }
    };

    const sendTeamProjectEmail = async (formData: TeamProjectForm): Promise<void> => {
        try {
            // Invio email con EmailJS
            await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: 'service_6lwhe1n',
                    template_id: 'template_p9eblu7',
                    user_id: 'yICjmAQWVh4F8z63n',
                    template_params: {
                        name: formData.name,
                        surname: formData.surname,
                        email: formData.email,
                        phone: formData.phone,
                        time: new Date().toLocaleString('it-IT', {
                            dateStyle: 'short',
                            timeStyle: 'short'
                        })
                    }
                })
            });
        } catch (error) {
            console.error('❌ Errore EmailJS:', error);
        }
    };


    const submitTeamProjectForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Validazione base
        if (!formTeamProject.name || !formTeamProject.email || !formTeamProject.phone || !formTeamProject.surname) {
            alert('Per favore compila tutti i campi obbligatori.');
            return;
        }

        setLoadingSending(true);
        sendTeamProjectEmail(formTeamProject).then(() => {
            setLoadingSending(false);
            setShowTeamForm(false);
            setFormTeamProject({name: '', surname: '', email: '', phone: ''});
            setFormSent(true);
            setTimeout(() => setFormSent(false), 3000);
        });
    };


    const submitFreeTrialForm = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();

        // Validazione base
        if (!formFreeTrial.name || !formFreeTrial.email || !formFreeTrial.day || !formFreeTrial.phone || !formFreeTrial.surname) {
            alert('Per favore compila tutti i campi obbligatori.');
            return;
        }
        setLoadingSending(true);
        await sendFreeTrialEmail(formFreeTrial).then(() => {
            setLoadingSending(false);
            setShowBookingForm(false);
            setFormFreeTrial({ name: '', surname: '', email: '', phone: '', day: '', message: '' });
            setFormSent(true);
            setTimeout(() => setFormSent(false), 3000);
        })
    };

    const handleContactSubmit = (): void => {
        alert('Messaggio inviato! Ti contatteremo presto!');
    };

    const NavButton: React.FC<NavButtonProps> = ({ section, icon, text, activeSection, onClick }) => (
        <button
            onClick={() => onClick(section)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeSection === section
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-purple-300 hover:text-white hover:bg-purple-700/30'
            }`}
        >
            {icon}
            <span className="font-lg">{text}</span>
        </button>
    );

        const badges = [
            {
                icon: "🎵",
                title: "Tutti i Livelli",
                subtitle: "Dalle basi alla performance",
                gradient: "from-purple-500 to-purple-600"
            },
            {
                icon: "💃",
                title: "Lady Style",
                subtitle: "Femminilità ed eleganza",
                gradient: "from-pink-500 to-pink-600"
            },
            {
                icon: "🕺",
                title: "Maestri Certificati",
                subtitle: "Esperienza internazionale",
                gradient: "from-purple-600 to-pink-500"
            },
            {
                icon: "🔥",
                title: "Eventi & Serate",
                subtitle: "Divertimento garantito",
                gradient: "from-pink-600 to-purple-500"
            }
        ];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 overflow-x-hidden pb-6">
            <Analytics />
            <SpeedInsights />
            {/* Header */}
            <header className="fixed top-0 w-full bg-black backdrop-blur-md z-50 border-b border-purple-500/20">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div>
                                <img src="/logo_w.png" alt="Logo" className="w-full h-16"/>
                            </div>
                        </div>

                        <nav className="hidden md:flex items-center space-x-2">
                            <NavButton
                                section="home"
                                icon={<Heart size={20}/>}
                                text="Home"
                                activeSection={activeSection}
                                onClick={(value: SectionType) => setActiveSection(value)}
                            />
                            <NavButton
                                section="corsi"
                                icon={<Calendar size={20}/>}
                                text="Corsi"
                                activeSection={activeSection}
                                onClick={(value: SectionType) => setActiveSection(value)}
                            />
                            <NavButton
                                section="maestri"
                                icon={<Users size={20}/>}
                                text="Maestri"
                                activeSection={activeSection}
                                onClick={(value: SectionType) => setActiveSection(value)}
                            />
                            <NavButton
                                section="contatti"
                                icon={<Phone size={20}/>}
                                text="Contatti"
                                activeSection={activeSection}
                                onClick={(value: SectionType) => setActiveSection(value)}
                            />
                        </nav>

                        <button
                            onClick={() => setShowBookingForm(true)}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white lg:px-6 px-3 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                            Prova Gratuita
                        </button>
                    </div>
                </div>
            </header>

            <main className="lg:pt-24 pt-16 pb-24">
                {/* Home Section */}
                {activeSection === 'home' && (
                    <section className="h-full flex items-center lg:py-8">
                        <div className="max-w-full mx-auto py-1">
                            <div className="text-center mb-8">
                                <div className="w-full mb-12 relative overflow-hidden rounded-2xl shadow-2xl">
                                    <div
                                        className="relative h-64 sm:h-80 md:h-96">
                                        <img
                                            src="/walpaper.jpeg"
                                            alt="Coppia che balla salsa in una scuola di danza"
                                            className="w-full h-full object-cover object-center"
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-white">
                                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">New
                                                    Generation Academy</h3>
                                                <p className="text-lg sm:text-xl font-bold text-purple-200">by Roberto e
                                                    Beatrice</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
                                    Scopri il ritmo che è in te con i nostri corsi di <span
                                    className="text-pink-400 font-bold">Salsa</span> e <span
                                    className="text-purple-400 font-bold">Bachata</span>.
                                    Una settimana di prove gratuite ti aspetta dal 22 settembre!
                                </p>

                                <div className="hidden md:grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                                    {badges.map((badge, i) => (
                                        <div
                                            key={i}
                                            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                                        >
                                            <div
                                                className={`bg-gradient-to-br ${badge.gradient} p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300`}>
                                                <div className="text-center">
                                                    <div
                                                        className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                                        {badge.icon}
                                                    </div>
                                                    <h3 className="text-white font-bold text-lg mb-2">
                                                        {badge.title}
                                                    </h3>
                                                    <p className="text-white/80 text-sm">
                                                        {badge.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Layout Mobile - Grid 2x2 */}
                                <div className="md:hidden grid grid-cols-2 gap-4 max-w-sm mx-auto px-4">
                                    {badges.map((badge, i) => (
                                        <div
                                            key={i}
                                            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                                        >
                                            <div
                                                className={`bg-gradient-to-br ${badge.gradient} p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-full`}>
                                                <div className="text-center">
                                                    <div
                                                        className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                                        {badge.icon}
                                                    </div>
                                                    <h3 className="text-white font-bold text-sm mb-1">
                                                        {badge.title}
                                                    </h3>
                                                    <p className="text-white/80 text-xs">
                                                        {badge.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setShowBookingForm(true)}
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 mt-8 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                                >
                                    Prenota la tua Prova Gratuita
                                </button>
                            </div>


                            {/* Sezioni Informative */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-7xl">
                                {/* La Nostra Sede */}
                                <div
                                    className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <MapPin className="text-purple-400" size={32}/>
                                        <h3 className="text-2xl font-bold text-white">La Nostra Sede</h3>
                                    </div>
                                    <p className="text-purple-200 mb-6">
                                        La nostra sala si trova all’interno del complesso scolastico Gauss.
                                        L’Accademia mette a disposizione uno spazio moderno e accogliente,
                                        con un’ampia sala da ballo, specchi professionali e un sistema audio di alta
                                        qualità.
                                        È presente anche un parcheggio gratuito all’interno del complesso. Un ambiente
                                        ideale per imparare, allenarsi e divertirsi!
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a
                                            href="https://www.google.com/maps/search/?api=1&query=Scuola+Paritaria+Gauss,+Via+della+Bufalotta+556,+00139+Roma+RM"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                                        >
                                            <MapPin size={20}/>
                                            <span>Visualizza su Maps</span>
                                        </a>
                                        <button
                                            onClick={() => setActiveSection('contatti')}
                                            className="flex items-center justify-center space-x-2 bg-purple-600/30 hover:bg-purple-600/50 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-purple-400"
                                        >
                                            <Phone size={20}/>
                                            <span>Contattaci</span>
                                        </button>
                                    </div>
                                </div>

                                {/* I Tuoi Maestri Preview */}
                                <div
                                    className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/30">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <Heart className="text-pink-400" size={32}/>
                                        <div className={"flex flex-col"}>
                                            <h3 className="text-2xl font-bold text-white">Roberto & Beatrice</h3>
                                            <small className={"text-white"}> dove la danza caraibica diventa amicizia,
                                                crescita e divertimento ✨</small>
                                        </div>
                                    </div>
                                    <p className="text-pink-200 mb-6">
                                        Due maestri appassionati con anni di esperienza internazionale nel mondo della
                                        danza caraibica.
                                        Oltre alla tecnica e alla didattica, offrono un rapporto umano fatto di
                                        amicizia, energia e supporto anche nella vita quotidiana.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => setActiveSection('maestri')}
                                            className="flex items-center justify-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                                        >
                                            <Users size={20}/>
                                            <span>Scopri i Maestri</span>
                                        </button>
                                        <button
                                            onClick={() => setShowBookingForm(true)}
                                            className="flex items-center justify-center space-x-2 bg-pink-600/30 hover:bg-pink-600/50 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-pink-400"
                                        >
                                            <Calendar size={20}/>
                                            <span>Prenota Lezione</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="bg-gradient-to-br from-purple-600/20 to-pink-800/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 max-w-7xl mx-auto mt-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                    {/* Immagine Locandina */}
                                    <div className="order-2 lg:order-1">
                                        <div
                                            className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
                                            <a href={'https://www.instagram.com/p/DM8FHCxo2XL/'} target={"_blank"} rel="noreferrer">
                                                <img
                                                    src="/locadina-team-project.jpeg"
                                                    alt="Roberto y Beatrice Project Team - Bachata Sensual"
                                                    className="w-full h-full object-cover"
                                                />
                                            </a>
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                        </div>
                                    </div>

                                    {/* Contenuto Testuale */}
                                    <div className="order-1 lg:order-2">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <Star className="text-yellow-400" size={32}/>
                                            <div className={"flex flex-col"}>
                                                <h3 className="text-2xl font-bold text-white">Team Project</h3>
                                                <small className={"text-white"}> Bachata Sensual by Roberto y Beatrice</small>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <p className="text-purple-200 mb-4 leading-relaxed">
                                                <span className="text-pink-400 font-semibold">Vivi la passione della bachata sensual a 360 gradi!</span>
                                            </p>
                                            <p className="text-purple-200 mb-4 leading-relaxed">
                                                Diventa parte del nuovo team di <span
                                                className="text-purple-400 font-semibold">Roberto & Beatrice</span><br/>
                                                … e porta il tuo talento dai locali di <span
                                                className="text-yellow-400 font-semibold">Roma</span> ai <span
                                                className="text-yellow-400 font-semibold">palchi internazionali 🌎</span>
                                            </p>
                                            <p className="text-purple-200 mb-4 leading-relaxed">
                                                <span className="text-pink-400 font-semibold">Nuovo team, nuova coreografia ⬇️</span><br/>
                                            </p>

                                            <div
                                                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 mb-6 border border-purple-400/30">
                                                <h5 className="text-white font-bold mb-2">Requisito:</h5>
                                                <ul className="text-purple-200 space-y-2">
                                                    <li className="flex items-center space-x-2">
                                                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                                        <span>Livello Avanzato</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div
                                                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 mb-6 border border-purple-400/30">
                                                <h5 className="text-white font-bold mb-2">Cosa include:</h5>
                                                <ul className="text-purple-200 space-y-2">
                                                    <li className="flex items-center space-x-2">
                                                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                                        <span>Coreografia esclusiva di Bachata Sensual</span>
                                                    </li>
                                                    <li className="flex items-center space-x-2">
                                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                                        <span>Tecnica avanzata</span>
                                                    </li>
                                                    <li className="flex items-center space-x-2">
                                                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                                        <span>Prove: una volta al mese (3h)</span>
                                                    </li>
                                                    <li className="flex items-center space-x-2">
                                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                                        <span>Quando la coreografia sarà pronta, inizieranno le esibizioni a Roma, in Italia e all’estero, con programma definito in anticipo.</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="text-center">
                                                <div className="mb-4">
                                                    <div className="flex items-center justify-center space-x-2 mb-3">
                                                        <ArrowDown className="text-yellow-400" size={24}/>
                                                        <h5 className="text-yellow-300 font-bold text-lg">Il progetto
                                                            inizia tra</h5>
                                                        <ArrowDown className="text-yellow-400" size={24}/>
                                                    </div>

                                                    <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto mb-4">
                                                        <div
                                                            className="bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-lg p-3 border border-pink-400/50">
                                                            <div
                                                                className="text-2xl font-bold text-white">{timeLeft.days}</div>
                                                            <div className="text-xs text-purple-200">Giorni</div>
                                                        </div>
                                                        <div
                                                            className="bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-lg p-3 border border-pink-400/50">
                                                            <div
                                                                className="text-2xl font-bold text-white">{timeLeft.hours}</div>
                                                            <div className="text-xs text-purple-200">Ore</div>
                                                        </div>
                                                        <div
                                                            className="bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-lg p-3 border border-pink-400/50">
                                                            <div
                                                                className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
                                                            <div className="text-xs text-purple-200">Min</div>
                                                        </div>
                                                        <div
                                                            className="bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-lg p-3 border border-pink-400/50">
                                                            <div
                                                                className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
                                                            <div className="text-xs text-purple-200">Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setShowTeamForm(true)}
                                                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
                                                >
                                                    <Users size={24}/>
                                                    <span>Unisciti al Team Project</span>
                                                </button>
                                                <a
                                                    href="https://www.instagram.com/p/DM8FHCxo2XL/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-pink-400 hover:underline mt-2"
                                                >
                                                    <Instagram className="mr-1" size={18}/>
                                                    Guarda il post su Instagram
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                )}

                {/* Corsi Section */}
                {activeSection === 'corsi' && (
                    <section className="h-full pb-8 pt-14">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center space-y-2 mb-4">
                                <h2 className="text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    I Nostri Corsi
                                </h2>
                                <p className="lg:text-xl text-sm text-purple-200 font-bold ">
                                    Anno Accademico 2025/2026
                                </p>
                                <p className="text-purple-300 max-w-3xl mx-auto underline">
                                    Settimana di prova gratuita dal 22 settembre
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                {courses.map((day, index) => (
                                    <div key={index}
                                         className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-pink-500/40 transition-all duration-300">
                                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
                                            {day.day}
                                        </h3>
                                        <div className="space-y-4">
                                            {day.classes.map((classInfo, classIndex) => (
                                                <div key={classIndex}
                                                     className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/10">
                                                    <div className="flex items-center space-x-4">
                                                        <Clock className="text-purple-400" size={20}/>
                                                        <div>
                                                            <h4 className="text-white font-semibold lg:text-lg text-sm">{classInfo.name}</h4>
                                                            <p className="text-purple-300 text-sm">{classInfo.level}</p>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className="text-pink-400 font-bold text-lg">{classInfo.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <div
                                    className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                                    <h3 className="text-2xl font-bold text-white mb-4">Pronto a iniziare?</h3>
                                    <p className="text-purple-200 mb-6">Prenota la tua lezione di prova gratuita e
                                        scopri il ballo che fa per te!</p>
                                    <button
                                        onClick={() => setShowBookingForm(true)}
                                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                    >
                                        Prenota Ora
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Maestri Section */}
                {activeSection === 'maestri' && (
                    <section className="h-full pb-8 pt-14">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-8">
                                <h2 className="text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
                                    I Tuoi Maestri
                                </h2>
                                <p className="text-xl text-purple-200">
                                    Roberto & Beatrice - Passione, esperienza e dedizione per l'insegnamento
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Roberto */}
                                <div
                                    className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center">
                                    <div
                                        className="w-48 h-48 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                                        <img src="/bob.JPG" alt="Roberto"
                                             className="w-48 h-48 object-cover rounded-full object-top"/>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">Roberto</h3>
                                    <div className="text-purple-200 space-y-4">
                                        <p>Ha studiato diverse discipline, specializzandosi in Salsa Los Angeles, New
                                            York Style e Bachata Sensual, unendo precisione e musicalità.</p>
                                    </div>
                                    <div className="mt-6 flex justify-center space-x-4">
                                        <span
                                            className="bg-purple-600/30 px-4 py-2 rounded-full text-purple-200 text-sm">Salsa Los Angeles</span>
                                        <span
                                            className="bg-purple-600/30 px-4 py-2 rounded-full text-purple-200 text-sm">New York Style</span>
                                        <span
                                            className="bg-purple-600/30 px-4 py-2 rounded-full text-purple-200 text-sm">Bachata Sensual</span>
                                    </div>
                                </div>

                                {/* Beatrice */}
                                <div
                                    className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/20 text-center">
                                    <div
                                        className="w-48 h-48 mx-auto mb-6 bg-gradient-to-r from-pink-600 to-pink-800 rounded-full flex items-center justify-center">
                                        <img src="/bea.JPG" alt="Roberto"
                                             className="w-48 h-48 object-cover rounded-full object-top"/>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">Beatrice</h3>
                                    <div className="text-pink-200 space-y-4">
                                        <p>Specializzata in Salsa Cubana, Bachata Sensual e Lady Style, è un punto di riferimento per la tecnica femminile e per il raffinato stile della Bachata Sensual Lady Style.</p>
                                    </div>
                                    <div className="mt-6 flex justify-center space-x-4">
                                        <span className="bg-pink-600/30 px-4 py-2 rounded-full text-pink-200 text-sm">Lady Style</span>
                                        <span className="bg-pink-600/30 px-4 py-2 rounded-full text-pink-200 text-sm">Bachata Sensual</span>
                                        <span className="bg-pink-600/30 px-4 py-2 rounded-full text-pink-200 text-sm">Salsa Cubana</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 text-center">
                                <div
                                    className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                                    <h3 className="text-2xl font-bold text-white mb-4">Il nostro approccio</h3>
                                    <p className="text-purple-200 mb-6 max-w-4xl mx-auto">
                                        Insieme formiamo un team perfetto per guidarti nel mondo del ballo e del divertimento di gruppo, trasformando ogni lezione in un’esperienza unica
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Contatti Section */}
                {activeSection === 'contatti' && (
                    <section className="h-full pb-8 pt-14">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-8">
                                <h2 className="text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
                                    Contattaci
                                </h2>
                                <p className="text-xl text-purple-200">
                                    Siamo qui per rispondere a tutte le tue domande
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div
                                        className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                                        <h3 className="text-2xl font-bold text-white mb-6">Informazioni di Contatto</h3>

                                        <div className="space-y-6">
                                            <div className="flex items-center space-x-4">
                                                <MapPin className="text-purple-400" size={24}/>
                                                <div>
                                                    <h4 className="text-white font-semibold">Dove ci trovi</h4>
                                                    <p className="text-purple-200">Roma, Via della Bufalotta 556, 00139
                                                        RM</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <Phone className="text-pink-400" size={24}/>
                                                <div className={"flex flex-col"}>
                                                    <h4 className="text-white font-semibold">Telefono</h4>
                                                    <p className="text-pink-200">+39 380 68 68 333</p>
                                                    <p className={"text-pink-200"}>+39 324 88 39 137</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <Mail className="text-purple-400" size={24}/>
                                                <div>
                                                    <h4 className="text-white font-semibold">Email</h4>
                                                    <p className="text-purple-200">n.g.ademy24@gmail.com</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <Instagram className="text-pink-400" size={24}/>
                                                <div className={"flex flex-col"}>
                                                    <h4 className="text-white font-semibold">Instagram</h4>
                                                    <a href="https://www.instagram.com/newgeneration_academy_/" target="_blank"
                                                       className="text-pink-200 hover:underline" rel="noreferrer">@newgeneration_academy_</a>
                                                    <a href="https://www.instagram.com/robertoybeatrice/" target="_blank"
                                                       className="text-pink-200 hover:underline" rel="noreferrer">@robertoybeatrice</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/20">
                                        <div className="text-pink-200 font-bold">
                                            <p>Chiamaci per informazioni sui corsi e/o prenotare la tua lezione di prova
                                                gratuita!</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 h-fit opacity-50">
                                    <h3 className="text-2xl font-bold text-white">Inviaci un Messaggio</h3>
                                    <b className={"text-purple-300 mb-6"}>Modulo disabilitato - Contattaci tramite telefono o Instagram</b>
                                    <div className="space-y-4">
                                        <input
                                            disabled={true}
                                            type="text"
                                            placeholder="Il tuo nome"
                                            className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none"
                                        />
                                        <input
                                            disabled={true}
                                            type="email"
                                            placeholder="La tua email"
                                            className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none"
                                        />
                                        <textarea
                                            disabled={true}
                                            rows={4}
                                            placeholder="Il tuo messaggio"
                                            className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none resize-none"
                                        />
                                        <button
                                            disabled={true}
                                            type="button"
                                            onClick={handleContactSubmit}
                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                                        >
                                            Invia Messaggio
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Mobile Navigation */}
            <div
                className="md:hidden fixed bottom-5 left-4 right-4 bg-black/80 backdrop-blur-md rounded-full p-2 border border-purple-500/30">
                <div className="flex justify-around">
                    <button
                        onClick={() => {
                            setActiveSection('home');
                            window.scrollTo({top: 0, behavior: 'smooth'});
                        }}
                        className={`p-3 rounded-full ${activeSection === 'home' ? 'bg-purple-600' : 'text-purple-300'}`}
                    >
                        <Heart size={20}/>
                    </button>
                    <button
                        onClick={() => {
                            setActiveSection('corsi');
                            window.scrollTo({top: 0, behavior: 'smooth'});
                        }}
                        className={`p-3 rounded-full ${activeSection === 'corsi' ? 'bg-purple-600' : 'text-purple-300'}`}
                    >
                        <Calendar size={20}/>
                    </button>
                    <button
                        onClick={() => {
                            setActiveSection('maestri');
                            window.scrollTo({top: 0, behavior: 'smooth'});
                        }}
                        className={`p-3 rounded-full ${activeSection === 'maestri' ? 'bg-purple-600' : 'text-purple-300'}`}
                    >
                        <Users size={20}/>
                    </button>
                    <button
                        onClick={() => {
                            setActiveSection('contatti');
                            window.scrollTo({top: 0, behavior: 'smooth'});
                        }}
                        className={`p-3 rounded-full ${activeSection === 'contatti' ? 'bg-purple-600' : 'text-purple-300'}`}
                    >
                        <Phone size={20}/>
                    </button>
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingForm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div
                        className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 max-w-md w-full border border-purple-500/30">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white">Prenota la tua Prova Gratuita</h3>
                            <button
                                onClick={() => setShowBookingForm(false)}
                                className="text-purple-300 hover:text-white text-2xl"
                                aria-label="Chiudi"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Il tuo nome *"
                                value={formFreeTrial.name}
                                onChange={(e) => handleInputChange(e,setFormFreeTrial)}
                                required
                                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                name="surname"
                                placeholder="Il tuo cognome *"
                                value={formFreeTrial.surname}
                                onChange={(e) => handleInputChange(e,setFormFreeTrial)}
                                required
                                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="La tua email *"
                                value={formFreeTrial.email}
                                onChange={(e) => handleInputChange(e,setFormFreeTrial)}
                                required
                                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none"
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Il tuo telefono *"
                                value={formFreeTrial.phone}
                                onChange={(e) => handleInputChange(e,setFormFreeTrial)}
                                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none"
                            />
                            <select
                                name="day"
                                value={formFreeTrial.day}
                                onChange={(e) => handleInputChange(e,setFormFreeTrial)}
                                required
                                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                            >
                                <option value="">Scegli il giorno *</option>
                                <option value="lunedi">Lunedì</option>
                                <option value="martedi">Martedì</option>
                                <option value="mercoledi">Mercoledì</option>
                                <option value="giovedi">Giovedì</option>
                            </select>
                            <textarea
                                name="message"
                                placeholder="Note aggiuntive (opzionale)"
                                value={formFreeTrial.message}
                                onChange={(e) => handleInputChange(e,setFormFreeTrial)}
                                rows={3}
                                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none resize-none"
                            />
                            <button
                                type="button"
                                onClick={submitFreeTrialForm}
                                disabled={loadingSending}
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                            >
                                {loadingSending ? 'Inviando la tua prenotazione...' : 'Prenota Ora'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showTeamForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 max-w-md w-full border border-purple-500/50 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                                <Users className="text-pink-400" size={28} />
                                <span>Team Project</span>
                            </h3>
                            <button
                                onClick={() => setShowTeamForm(false)}
                                className="text-white hover:text-pink-400 transition-colors duration-200"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <p className="text-purple-200 mb-6 text-center">
                            Registrati per unirti al <span className="text-pink-400 font-semibold">Roberto y Beatrice Project Team</span>
                        </p>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">
                                        Nome *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formTeamProject.name}
                                            onChange={(e) => handleInputChange(e,setFormTeamProject)}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-purple-400/50 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-200"
                                            placeholder="Il tuo nome"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">
                                        Cognome *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                                        <input
                                            type="text"
                                            name="surname"
                                            value={formTeamProject.surname}
                                            onChange={(e) => handleInputChange(e,setFormTeamProject)}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-purple-400/50 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-200"
                                            placeholder="Il tuo cognome"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Telefono *
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formTeamProject.phone}
                                        onChange={(e) => handleInputChange(e,setFormTeamProject)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-purple-400/50 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-200"
                                        placeholder="Il tuo numero di telefono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Email *
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formTeamProject.email}
                                        onChange={(e) => handleInputChange(e,setFormTeamProject)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-purple-400/50 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-200"
                                        placeholder="La tua email"
                                    />
                                </div>
                            </div>
                        </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowTeamForm(false)}
                                    className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    onClick={submitTeamProjectForm}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <Send size={20} />
                                    <span>Registrati</span>
                                </button>
                            </div>
                    </div>
                </div>
            )}

            {formSent && (
                <div className="fixed inset-0 z-60 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/80"></div>
                    <div
                        className="relative bg-gray-900 p-8 rounded-2xl border-2 border-pink-400 max-w-md mx-4 text-center">
                        <CheckCircle className="mx-auto text-pink-400 mb-4" size={64}/>
                        <h3 className="text-2xl font-black text-white mb-2">
                            Prenotazione Inviata!
                        </h3>
                        <p className="text-pink-400 font-bold text-lg mb-2">
                            Grazie {formFreeTrial.name}, la tua prenotazione è stata inviata con successo.
                        </p>
                        <p className="text-gray-300 text-sm mb-4">
                            Ti contatteremo al più presto.
                        </p>
                        <div className="bg-black/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-400">Questo messaggio si chiuderà automaticamente...</p>
                        </div>
                    </div>
                </div>
            )}

            <footer className="py-2 mb-24 sm:mb-0 bg-gradient-to-tb from-purple-900 via-purple-800 to-pink-900">
                <div className="container mx-auto">
                    <div className="text-center">
                        <div className="mt-2 text-sm text-gray-200">
                            Sito sviluppato da <a href="https://www.instagram.com/mattiacucuzza_/" target="_blank"
                                                  className="text-purple-400 hover:underline" rel="noreferrer">Mattia Cucuzza</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;