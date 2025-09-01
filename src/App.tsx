import React, {useState} from 'react';
import {Calendar, Clock, Heart, Instagram, Mail, MapPin, Phone, Users} from 'lucide-react';
import {DaySchedule, FormData, NavButtonProps, SectionType} from './types';

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SectionType>('home');
    const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        course: '',
        day: '',
        message: ''
    });

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
                { time: '21:30', name: 'Bachata Sensual Liv. 2', level: 'Intermedio' }
            ]
        },
        {
            day: 'MERCOLEDÌ',
            classes: [
                { time: '20:30', name: 'Salsa Liv. 1', level: 'Principianti' },
                { time: '21:30', name: 'Bachata Sensual Liv. 1', level: 'Principianti' }
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        // Validazione base
        if (!formData.name || !formData.email || !formData.course || !formData.day) {
            alert('Per favore compila tutti i campi obbligatori.');
            return;
        }

        alert('Grazie! Ti contatteremo presto per confermare la tua prova gratuita!');
        setShowBookingForm(false);
        setFormData({ name: '', email: '', phone: '', course: '', day: '', message: '' });
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
                subtitle: "Principianti e avanzati",
                gradient: "from-purple-500 to-purple-600"
            },
            {
                icon: "💃",
                title: "Lady Style",
                subtitle: "Femminilità e grazia",
                gradient: "from-pink-500 to-pink-600"
            },
            {
                icon: "🕺",
                title: "Maestri Pro",
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
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
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
                            <div className="text-center mb-12">
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
                                        Situata nel complesso scolastico Gauss, la nostra accademia offre uno spazio
                                        moderno e
                                        accogliente,
                                        dotato di ampie sale da ballo, specchi professionali e sistema audio di alta
                                        qualità.
                                        Un ambiente perfetto per imparare e divertirsi!
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
                                        <h3 className="text-2xl font-bold text-white">Roberto & Beatrice</h3>
                                    </div>
                                    <p className="text-pink-200 mb-6">
                                        Due maestri appassionati con anni di esperienza internazionale nella danza
                                        latina.
                                        Roberto specializzato in Salsa Cubana e Bachata Sensual, Beatrice esperta in
                                        Lady Style
                                        e tecniche femminili. Insieme creano un team perfetto per guidarti nel mondo
                                        della danza.
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
                        </div>
                    </section>
                )}

                {/* Corsi Section */}
                {activeSection === 'corsi' && (
                    <section className="h-full py-8">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center">
                                <h2 className="text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
                                    I Nostri Corsi
                                </h2>
                                <p className="text-xl text-purple-200 mb-8">
                                    Anno Accademico 2025/2026 - Settimana di prova gratuita dal 22 settembre
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
                                                            <h4 className="text-white font-semibold">{classInfo.name}</h4>
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
                    <section className="h-full py-8">
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
                                        <p>Maestro di Salsa e Bachata con oltre 8 anni di esperienza nel mondo della
                                            danza latina.</p>
                                        <p>Specializzato in stile Cubano e Bachata Sensual, Roberto porta energia e
                                            passione in ogni lezione.</p>
                                        <p>La sua filosofia: "La danza non è solo movimento, è espressione
                                            dell'anima"</p>
                                    </div>
                                    <div className="mt-6 flex justify-center space-x-4">
                                        <span
                                            className="bg-purple-600/30 px-4 py-2 rounded-full text-purple-200 text-sm">Salsa Cubana</span>
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
                                        <p>Maestra specializzata in Lady Style e tecniche femminili, con una particolare
                                            attenzione alla grazia e all'eleganza.</p>
                                        <p>Formatrice certificata in Bachata Sensual e Dominican, aiuta ogni allieva a
                                            trovare la propria femminilità nella danza.</p>
                                        <p>Il suo motto: "Ogni donna ha una regina che aspetta solo di ballare"</p>
                                    </div>
                                    <div className="mt-6 flex justify-center space-x-4">
                                        <span className="bg-pink-600/30 px-4 py-2 rounded-full text-pink-200 text-sm">Lady Style</span>
                                        <span className="bg-pink-600/30 px-4 py-2 rounded-full text-pink-200 text-sm">Bachata Dominican</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 text-center">
                                <div
                                    className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                                    <h3 className="text-2xl font-bold text-white mb-4">Il nostro approccio</h3>
                                    <p className="text-purple-200 mb-6 max-w-4xl mx-auto">
                                        Roberto e Beatrice credono che la danza sia per tutti. Con pazienza,
                                        professionalità e tanto divertimento,
                                        ti guideranno passo dopo passo nel meraviglioso mondo della Salsa e della
                                        Bachata.
                                        Che tu sia un principiante assoluto o un ballerino esperto, troverai il corso
                                        perfetto per te!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Contatti Section */}
                {activeSection === 'contatti' && (
                    <section className="h-full py-8">
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
                                                <div>
                                                    <h4 className="text-white font-semibold">Telefono</h4>
                                                    <p className="text-pink-200">+39 380 68 68 333</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <Mail className="text-purple-400" size={24}/>
                                                <div>
                                                    <h4 className="text-white font-semibold">Email</h4>
                                                    <p className="text-purple-200">info@newgenerationacademy.it</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <Instagram className="text-pink-400" size={24}/>
                                                <div>
                                                    <h4 className="text-white font-semibold">Instagram</h4>
                                                    <p className="text-pink-200">@newgenerationacademy</p>
                                                    <p className="text-pink-200">@roberto&beatrice</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/20">
                                        <h3 className="text-2xl font-bold text-white mb-4">Orari</h3>
                                        <div className="text-pink-200">
                                            <p className="mb-2">Lunedì - Giovedì: 20:30 - 22:30</p>
                                            <p>Chiamaci per informazioni sui corsi e/o prenotare la tua lezione di prova
                                                gratuita!</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 h-fit">
                                    <h3 className="text-2xl font-bold text-white mb-6">Inviaci un Messaggio</h3>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Il tuo nome"
                                            className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none"
                                        />
                                        <input
                                            type="email"
                                            placeholder="La tua email"
                                            className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none"
                                        />
                                        <textarea
                                            rows={4}
                                            placeholder="Il tuo messaggio"
                                            className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none resize-none"
                                        />
                                        <button
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
                className="md:hidden fixed bottom-10 left-4 right-4 bg-black/80 backdrop-blur-md rounded-full p-2 border border-purple-500/30">
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
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="La tua email *"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none"
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Il tuo telefono"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none"
                            />
                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                            >
                                <option value="">Scegli il corso *</option>
                                <option value="salsa">Salsa</option>
                                <option value="bachata">Bachata</option>
                                <option value="lady-style">Lady Style</option>
                            </select>
                            <select
                                name="day"
                                value={formData.day}
                                onChange={handleInputChange}
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
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none resize-none"
                            />
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                            >
                                Prenota Ora
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="py-2 mb-24 sm:mb-0 bg-gradient-to-tb from-purple-900 via-purple-800 to-pink-900">
                <div className="container mx-auto">
                    <div className="text-center">
                        <div className="mt-2 text-sm text-gray-200">
                            Sito sviluppato da <a href="https://www.instagram.com/mattiacucuzza_/" target="_blank"
                                                  className="text-purple-400 hover:underline">Mattia Cucuzza</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;