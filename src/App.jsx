import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowLeft, Home, User, Code, Briefcase, Mail, Zap, ExternalLink, Github, Terminal, Cpu, Monitor, Star, Disc, Globe, Award } from 'lucide-react';
import librasFacilCover from './assets/libras-facil-cover.jpg';
import confeitariaGeisaCover from './assets/confeitaria-geisa-cover.jpg';
import profilePic from './assets/profile.png';

// --- CUSTOM CURSOR & EFFECTS ---
const useAutoCycle = (length, interval = 2000) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % length);
        }, interval);
        return () => clearInterval(timer);
    }, [length, interval]);

    return activeIndex;
};
const InteractiveLayer = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [clicks, setClicks] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            const target = e.target;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.closest('button') ||
                target.closest('a');

            setIsHovering(!!isInteractive);
        };

        const handleMouseDown = (e) => {
            setIsClicking(true);
            // Adiciona efeito visual de clique (Visual Sound)
            const newClick = { x: e.clientX, y: e.clientY, id: Date.now() };
            setClicks(prev => [...prev, newClick]);
            // Remove o efeito após animação
            setTimeout(() => {
                setClicks(prev => prev.filter(c => c.id !== newClick.id));
            }, 500);
        };

        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            {/* Visual Click Effects (Shockwaves) */}
            {clicks.map(click => (
                <div
                    key={click.id}
                    className="fixed pointer-events-none z-[9998] border-2 border-[#D4FF00] rounded-full animate-shockwave"
                    style={{
                        left: click.x,
                        top: click.y,
                        width: '20px',
                        height: '20px',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            ))}

            {/* Custom Cursor */}
            <div
                className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    transform: `translate(-50%, -50%)`
                }}
            >
                {/* Outer Ring */}
                <div className={`
          border-2 border-white rounded-full transition-all duration-300 ease-out
          ${isHovering ? 'w-16 h-16 bg-white' : 'w-8 h-8'}
          ${isClicking ? 'scale-75' : 'scale-100'}
        `} />

                {/* Center Dot (Crosshair) */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#D4FF00] -translate-x-1/2 -translate-y-1/2" />
            </div>
        </>
    );
};

const Portfolio = () => {
    const [currentPage, setCurrentPage] = useState('home');

    // Scroll to top whenever page changes (Improved for Mobile)
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTo(0, 0);
        document.body.scrollTo(0, 0);
    }, [currentPage]);

    // --- COMPONENTES DE UI ---

    // Marquee (Texto rolante com efeito hover)
    const Marquee = ({ text, color = "bg-white", textColor = "text-black" }) => (
        <div className={`overflow-hidden py-3 border-y-2 border-white ${color} ${textColor} font-mono font-bold uppercase tracking-widest text-sm md:text-base group select-none transition-all duration-100`}>
            <div className="whitespace-nowrap animate-marquee flex gap-8">
                <span>{text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text}</span>
                <span>{text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text}</span>
            </div>
        </div>
    );

    // Botão do Menu Principal - Interatividade Aumentada
    const MenuButton = ({ onClick, title, subtitle, icon: Icon, color, isActive }) => (
        <button
            onClick={onClick}
            className={`group relative w-full h-full min-h-[220px] bg-black border-2 border-zinc-800 flex flex-col justify-between p-6 overflow-hidden text-left
                 transition-all duration-500
                 ${isActive ? 'border-white ring-4 ring-[#D4FF00] z-10' : 'hover:border-white focus:outline-none focus:ring-4 focus:ring-[#D4FF00] focus:border-transparent focus:z-10'}`}
        >
            <div className={`absolute top-0 right-0 p-4 transition-opacity duration-500 ${color} ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100'}`}>
                <ArrowLeft className="rotate-180 text-black" size={32} />
            </div>

            <div className={`z-10 mt-4 transition-transform duration-500 ${isActive ? 'translate-x-2' : 'group-hover:translate-x-2 group-focus:translate-x-2'}`}>
                <Icon size={40} className={`text-white mb-6 transition-transform duration-500 origin-left ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={1.5} />
                {/* Typography Reactive */}
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-sans font-black uppercase text-white leading-[0.85] mb-2 mix-blend-difference tracking-tighter">
                    <span className={`inline-block transition-transform duration-300 ${isActive ? 'skew-x-[-10deg]' : 'group-hover:skew-x-[-10deg]'}`}>{title}</span>
                </h3>
            </div>

            <div className={`z-10 border-t-2 pt-4 mt-auto transition-colors w-full ${isActive ? 'border-white' : 'border-zinc-800 group-hover:border-white'}`}>
                <p className={`font-mono text-xs uppercase tracking-widest inline-block px-2 py-1 transition-colors font-bold ${isActive ? 'text-black bg-white' : 'text-zinc-500 group-hover:text-black group-hover:bg-white'}`}>
                    {subtitle}
                </p>
            </div>

            {/* Hover Background Flash */}
            <div className={`absolute inset-0 ${color} mix-blend-overlay transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
        </button>
    );

    // Layout Padrão das Páginas Internas
    const PageLayout = ({ title, activeColor, children }) => (
        <div className="min-h-screen bg-black text-white flex flex-col border-x-2 border-white/20 mx-auto max-w-[1600px] relative animate-fade-in font-sans cursor-none-override">
            <InteractiveLayer />

            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* Top Bar */}
            <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b-2 border-white flex justify-between items-center p-4 md:px-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setCurrentPage('home')}
                        className="w-12 h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-4 focus:ring-[#D4FF00]"
                    >
                        <ArrowLeft size={24} strokeWidth={3} />
                    </button>
                    <div className="flex flex-col select-none group">
                        <h1 className="text-2xl md:text-3xl font-sans font-black uppercase tracking-tighter leading-none group-hover:translate-x-1 transition-transform">{title}</h1>
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Directory / {title.toLowerCase()}.html</span>
                    </div>
                </div>
                <div className={`w-4 h-4 rounded-full ${activeColor} animate-pulse shadow-[0_0_10px_currentColor]`}></div>
            </header>

            {/* Main Content */}
            <main className="flex-grow relative z-10 p-4 md:p-12 max-w-7xl mx-auto w-full">
                {children}
            </main>

            {/* Bottom Bar */}
            <div className="border-t-2 border-white p-2 font-mono text-[10px] md:text-xs uppercase flex justify-between bg-black relative z-20 select-none">
                <span className="hover:text-[#D4FF00] cursor-help">Status: Online</span>
                <span>© 2024 Brutal_Folio_v2</span>
            </div>
        </div>
    );

    // --- PÁGINAS ---

    // 1. HOME
    const HomePage = () => {
        const activeIndex = useAutoCycle(5, 2000); // 5 items no menu

        return (
            <div className="min-h-screen bg-black text-white p-2 md:p-4 flex flex-col font-sans relative overflow-hidden cursor-none-override">
                <InteractiveLayer />

                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
                </div>

                <div className="flex-grow border-2 border-white flex flex-col max-w-[1600px] mx-auto w-full bg-black relative z-10 shadow-[0_0_50px_rgba(255,255,255,0.1)]">

                    {/* Header Hero */}
                    <header className="border-b-2 border-white p-6 md:p-12 flex flex-col md:flex-row justify-between md:items-end gap-8 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="font-mono text-xs text-[#D4FF00] mb-2 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#D4FF00] rounded-full animate-ping"></span>
                                Available for work
                            </div>
                            <h1 className="text-7xl md:text-[9rem] font-sans font-black uppercase tracking-tighter leading-[0.8] mix-blend-screen hover:mix-blend-normal transition-all duration-300">
                                ▪ <br />
                                <span className="text-transparent stroke-text animate-pulse" style={{ '--stroke-color': '#fff', WebkitTextStroke: '2px white' }}>Gabriel    </span>
                                <span className="text-[#D4FF00] animate-pulse">.</span>
                            </h1>
                        </div>

                        <div className="flex flex-col items-start md:items-end font-mono text-xs md:text-sm text-zinc-400 gap-1 z-10">
                            <p className="text-white translate-x-2 transition-all cursor-default">BASED IN BRAZIL</p>
                            <p className="text-white translate-x-2 transition-all cursor-default">FULL STACK DEVELOPER</p>
                            <p className="text-white translate-x-2 transition-all cursor-default">UI / UX DESIGNER</p>
                            <p className="mt-2 text-white border border-white px-2 py-1 font-bold bg-white text-black transition-colors cursor-help">SCROLL IS DISABLED</p>
                        </div>

                        {/* Abstract Circle */}
                        <div className="absolute -top-20 -right-20 w-96 h-96 border-[1px] border-white/20 rounded-full animate-spin-slow pointer-events-none border-[#D4FF00]/20 transition-colors"></div>
                    </header>

                    <Marquee text="CREATIVE DEVELOPER • BUILDING DIGITAL EXPERIENCES • REACT • NODE • DESIGN" color="bg-[#D4FF00]" textColor="text-black" />

                    {/* Navigation Grid */}
                    <nav className="flex-grow grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-1 border-b-2 md:border-b-0 border-white md:border-r-2 border-zinc-800 relative">
                            <MenuButton
                                onClick={() => setCurrentPage('sobre')}
                                title="Sobre"
                                subtitle="Perfil & Bio"
                                icon={User}
                                color="bg-[#0033FF]"
                                isActive={activeIndex === 0}
                            />
                        </div>

                        <div className="md:col-span-1 border-b-2 md:border-b-0 border-white md:border-r-2 border-zinc-800 flex flex-col">
                            <div className="flex-1 border-b-2 border-zinc-800">
                                <MenuButton
                                    onClick={() => setCurrentPage('projetos')}
                                    title="Projetos"
                                    subtitle="Seleção de Trabalhos"
                                    icon={Briefcase}
                                    color="bg-[#00F0FF]"
                                    isActive={activeIndex === 1}
                                />
                            </div>
                            <div className="flex-1">
                                <MenuButton
                                    onClick={() => setCurrentPage('habilidades')}
                                    title="Skills"
                                    subtitle="Tech Stack"
                                    icon={Cpu}
                                    color="bg-[#00FF66]"
                                    isActive={activeIndex === 2}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-1 flex flex-col border-white">
                            <div className="flex-1 border-b-2 border-zinc-800">
                                <MenuButton
                                    onClick={() => setCurrentPage('qualificacoes')}
                                    title="Qualif."
                                    subtitle="Educação & Certs"
                                    icon={Award}
                                    color="bg-[#FF4D00]"
                                    isActive={activeIndex === 3}
                                />
                            </div>
                            <div className="flex-1">
                                <MenuButton
                                    onClick={() => setCurrentPage('contato')}
                                    title="Contato"
                                    subtitle="Vamos conversar"
                                    icon={Mail}
                                    color="bg-[#9D00FF]"
                                    isActive={activeIndex === 4}
                                />
                            </div>
                        </div>
                    </nav>

                    {/* Footer info */}
                    <div className="border-t-2 border-white p-4 flex justify-between items-center bg-zinc-900">
                        <div className="flex gap-4">
                            <Github className="w-5 h-5 text-[#D4FF00] scale-125 cursor-none transition-transform" />
                            <Globe className="w-5 h-5 text-[#D4FF00] scale-125 cursor-none transition-transform" />
                        </div>
                        <span className="font-mono text-[10px] uppercase">v2.1.0 [STABLE]</span>
                    </div>
                </div>
            </div>
        );
    };

    // 2. SOBRE
    const AboutPage = () => {
        const textHighlightIndex = useAutoCycle(2, 2500); // 2 destaques de texto
        const visualIndex = useAutoCycle(2, 1000); // Alternar visual da imagem (MAIS RÁPIDO)
        const cardsIndex = useAutoCycle(2, 3000); // 2 cards de info

        return (
            <PageLayout title="Quem Sou" activeColor="bg-[#0033FF]">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Coluna Texto */}
                    <div className="lg:col-span-7 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-sans font-black uppercase text-white leading-[0.9] transition-colors cursor-default">
                            Escrevo código como quem projeta interfaces. <br />
                            Penso design como quem resolve problemas <span className={`transition-all duration-500 ${textHighlightIndex === 0 ? 'text-white' : 'text-transparent'}`} style={{ WebkitTextStroke: textHighlightIndex === 0 ? '2px black' : '2px white' }}>☻</span>
                        </h2>

                        <div className="border-l-4 border-[#0033FF] pl-6 space-y-6 text-lg md:text-xl text-zinc-300 font-medium">
                            <p className="hover:text-white transition-colors">
                                Não sou um desenvolvedor tradicional. Encaro cada linha de código como um elemento de design e cada pixel como uma decisão de engenharia.
                            </p>
                            <p className="hover:text-white transition-colors">
                                Minha abordagem mistura a robustez da engenharia de software com a estética crua do brutalismo. O resultado? Interfaces que não apenas funcionam, mas <strong className={`font-black bg-[#0033FF] px-1 inline-block transition-all duration-500 ${textHighlightIndex === 1 ? 'text-white scale-110 rotate-3' : 'text-black scale-100 rotate-0'}`}>gritam</strong>.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-8">
                            <div className={`border-2 p-4 transition-colors duration-500 group ${cardsIndex === 0 ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-500 bg-transparent'}`}>
                                <h4 className={`font-mono text-xs uppercase mb-2 font-bold ${cardsIndex === 0 ? 'text-black' : 'text-zinc-500'}`}>Localização</h4>
                                <p className={`text-xl font-black uppercase ${cardsIndex === 0 ? 'text-black' : 'text-white'}`}>Minas Gerais, BR</p>
                            </div>
                            <div className={`border-2 p-4 transition-colors duration-500 group ${cardsIndex === 1 ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-500 bg-transparent'}`}>
                                <h4 className={`font-mono text-xs uppercase mb-2 font-bold ${cardsIndex === 1 ? 'text-black' : 'text-zinc-500'}`}>Status</h4>
                                <p className={`text-xl font-black uppercase ${cardsIndex === 1 ? 'text-[#00FF66]' : 'text-[#00FF66]'}`}>Open to Work</p>
                            </div>
                        </div>
                    </div>

                    {/* Coluna Visual */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-24">
                            <div className="aspect-[3/4] w-full bg-zinc-900 border-2 border-white relative overflow-hidden group">
                                <div
                                    className={`absolute inset-0 bg-cover bg-center transition-all duration-300 transform ${visualIndex === 1 ? 'grayscale-0 scale-105' : 'grayscale contrast-125 scale-100'}`}
                                    style={{ backgroundImage: `url(${profilePic})` }}
                                ></div>
                                <div className={`absolute inset-0 bg-[#0033FF] mix-blend-multiply transition-opacity duration-300 ${visualIndex === 1 ? 'opacity-0' : 'opacity-20'}`}></div>

                                {/* Decorative elements */}
                                <div className={`absolute bottom-4 left-4 px-2 py-1 font-mono text-xs border border-white font-bold transition-colors duration-300 ${visualIndex === 1 ? 'bg-[#0033FF] text-white' : 'bg-black text-white'}`}>IMG_001.JPG</div>
                                <Star className={`absolute top-4 right-4 animate-spin-slow transition-colors duration-300 ${visualIndex === 1 ? 'text-[#0033FF]' : 'text-white'}`} size={48} fill={visualIndex === 1 ? "#0033FF" : "white"} />
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayout>
        );
    };

    // 3. HABILIDADES
    const SkillsPage = () => {
        const activeIndex = useAutoCycle(6, 1200);

        return (
            <PageLayout title="Skills" activeColor="bg-[#00FF66]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border-2 border-zinc-800">
                    {[
                        { title: "Frontend", tools: ["React", "TypeScript", "Tailwind", "Next.js"], icon: Code, color: "text-[#00FF66]" },
                        { title: "Backend", tools: ["Node.js", "Python", "PostgreSQL", "Supabase"], icon: Terminal, color: "text-[#D4FF00]" },
                        { title: "Design", tools: ["Figma", "Blender", "Adobe CC", "UI/UX"], icon: Disc, color: "text-[#0033FF]" },
                        { title: "DevOps", tools: ["Docker", "AWS", "CI/CD", "Git"], icon: Cpu, color: "text-[#00F0FF]" },
                        { title: "Soft Skills", tools: ["Agile", "Liderança", "Comunicação", "Inglês"], icon: User, color: "text-white" },
                        { title: "Vibe Code", tools: ["Rust", "WebAssembly", "AI/ML"], icon: Zap, color: "text-blue-500" },
                    ].map((cat, i) => {
                        const isActive = activeIndex === i;
                        return (
                            <div key={i} className={`p-8 transition-colors group relative overflow-hidden ${isActive ? 'bg-zinc-900 ring-inset ring-4 ring-[#00FF66]' : 'bg-black hover:bg-zinc-900'}`} tabIndex="0">
                                <cat.icon className={`mb-6 ${cat.color} transition-transform duration-300 ${isActive ? 'scale-110 rotate-12' : 'group-hover:scale-110 group-hover:rotate-12'}`} size={40} />
                                <h3 className={`text-3xl font-sans font-black uppercase mb-6 tracking-wide transition-transform ${isActive ? 'translate-x-2' : 'group-hover:translate-x-2'}`}>{cat.title}</h3>
                                <ul className="space-y-3 font-mono text-sm">
                                    {cat.tools.map(tool => (
                                        <li key={tool} className={`flex items-center gap-2 font-bold transition-colors ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                                            <span className={`w-2 h-2 transition-all ${isActive ? 'bg-white scale-150' : 'bg-zinc-700 group-hover:bg-white group-hover:scale-150'}`}></span>
                                            {tool}
                                        </li>
                                    ))}
                                </ul>
                                <div className={`absolute top-0 right-0 p-2 font-mono text-[10px] text-zinc-700 transition-opacity font-bold ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                    0{i + 1}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </PageLayout>
        );
    };

    // 4. PROJETOS
    const ProjectsPage = () => {
        const projects = [
            {
                id: 1,
                title: "LIBRAS FÁCIL",
                subtitle: "Educação & Inclusão",
                desc: "Plataforma acessível para ensino de Libras com gamificação e IA.",
                tech: ["React", "AI", "Acessibilidade"],
                link: "https://libras-facil.vercel.app/",
                color: "#0099ffe0",
                image: librasFacilCover
            },
            {
                id: 2,
                title: "CONFEITARIA DA GEISA",
                subtitle: "Doçura & Arte",
                desc: "E-commerce de confeitaria artesanal com design delicado e apetitoso.",
                tech: ["React", "Stripe", "UX/UI"],
                link: "https://confeitaria-henna.vercel.app/",
                color: "#D45D79",
                image: confeitariaGeisaCover
            },
            {
                id: 3,
                title: "SEU PROJETO",
                subtitle: "PRÓXIMO_LANÇAMENTO",
                desc: "Ainda não existe, mas o próximo pode ser o seu. Vamos transformar sua ideia em realidade?",
                tech: ["Design", "Dev", "UX"],
                link: "#",
                color: "#73ff00d3"
            }
        ];

        const activeIndex = useAutoCycle(projects.length, 3000);

        return (
            <PageLayout title="Trabalhos" activeColor="bg-[#00F0FF]">
                <div className="space-y-12">
                    {projects.map((project, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div key={project.id} className={`group border-2 transition-colors bg-black relative ${isActive ? '' : 'border-zinc-800'}`} style={{ borderColor: isActive ? project.color : '', boxShadow: isActive ? `0 0 0 4px ${project.color}33` : '' }}>
                                <div className="grid md:grid-cols-12 h-full">
                                    {/* Project Info */}
                                    <div className={`md:col-span-5 p-8 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 transition-colors`} style={{ borderColor: isActive ? project.color : '#27272a' }}>
                                        <div>
                                            <div className={`font-mono text-xs mb-4 font-bold inline-block px-1 transition-colors`} style={{ backgroundColor: isActive ? project.color : 'transparent', color: isActive ? '#000' : project.color, border: `1px solid ${project.color}` }}>
                                                {project.subtitle}
                                            </div>
                                            <h3 className={`text-5xl md:text-6xl font-sans font-black uppercase mb-4 leading-[0.85] transition-transform origin-left ${isActive ? 'skew-x-2' : 'group-hover:skew-x-2'}`}>
                                                {project.title.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
                                            </h3>
                                            <p className={`mb-8 font-medium leading-relaxed transition-colors ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                                                {project.desc}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {project.tech.map(t => (
                                                    <span key={t} className="border border-white/30 px-2 py-1 text-xs uppercase text-zinc-300 font-bold hover:bg-white hover:text-black cursor-default transition-colors">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-black px-6 py-4 font-black uppercase text-sm transition-colors tracking-wider focus:outline-none focus:ring-4 focus:ring-black" style={{ backgroundColor: isActive ? project.color : 'white' }}>
                                                Live Demo <ExternalLink size={16} strokeWidth={3} />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Project Visual */}
                                    <div className={`md:col-span-7 min-h-[300px] relative overflow-hidden bg-zinc-900 transition-all duration-500 ${!project.image && (isActive ? 'invert' : 'group-hover:invert')}`}>
                                        {project.image ? (
                                            <div className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${isActive ? 'scale-100' : 'scale-110 group-hover:scale-100'}`} style={{ backgroundImage: `url(${project.image})` }}>
                                                {/* Overlay para manter o texto legível se necessário ou adicionar tint */}
                                                <div className={`absolute inset-0 bg-black/20 mix-blend-multiply transition-opacity ${isActive ? 'opacity-0' : 'opacity-40 group-hover:opacity-0'}`}></div>
                                            </div>
                                        ) : (
                                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'}`}>
                                                {/* Abstract UI representation */}
                                                <div className={`w-[80%] h-[80%] border-2 relative transform transition-transform ${isActive ? 'scale-95' : 'group-hover:scale-95'}`} style={{ borderColor: project.color }}>
                                                    <div className="absolute top-0 left-0 w-full h-8 border-b-2 bg-opacity-10" style={{ borderColor: project.color, backgroundColor: `${project.color}1A` }}></div>
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono animate-pulse font-bold" style={{ color: project.color }}>
                                                        [ UI_PREVIEW_MODE ]
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {/* Scanline effect */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none mix-blend-overlay"></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </PageLayout>
        );
    };

    // 5. QUALIFICAÇÕES (NOVA PÁGINA)
    const QualificationsPage = () => {
        const activeCertIndex = useAutoCycle(4, 1500); // 4 certificados
        const activeEduIndex = useAutoCycle(2, 3000); // 2 itens de educação

        return (
            <PageLayout title="Minhas Qualificações" activeColor="bg-[#FF4D00]">
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* EDUCAÇÃO */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-[#FF4D00] p-3 border-2 border-white text-black animate-pulse">
                                <Award size={32} />
                            </div>
                            <h2 className="text-4xl font-black uppercase leading-none hover:text-[#FF4D00] transition-colors">Educação<br />Formal</h2>
                        </div>

                        <div className="border-l-4 border-zinc-800 ml-6 pl-8 space-y-12 relative">
                            {/* Item 1 */}
                            <div className={`relative group transition-transform duration-500 ${activeEduIndex === 0 ? 'translate-x-2' : ''}`}>
                                <div className={`absolute -left-[43px] top-0 w-6 h-6 border-4 transition-colors ${activeEduIndex === 0 ? 'bg-[#FF4D00] border-[#FF4D00]' : 'bg-black border-[#FF4D00] group-hover:bg-[#FF4D00]'}`}></div>
                                <span className="font-mono text-[#FF4D00] font-bold text-xs uppercase mb-2 block">2027 - 2030</span>
                                <h3 className="text-2xl font-black uppercase mb-2 transition-transform">Sistemas de Informação</h3>
                                <p className="text-lg font-bold text-zinc-300">Universidade Federal</p>
                                <p className="text-zinc-500 mt-2 text-sm leading-relaxed">Sistema da Informação organiza e processa dados para gerar informações que ajudam no controle, planejamento e decisões de uma organização.</p>
                            </div>

                            {/* Item 2 */}
                            <div className={`relative group transition-transform duration-500 ${activeEduIndex === 1 ? 'translate-x-2' : ''}`}>
                                <div className={`absolute -left-[43px] top-0 w-6 h-6 border-4 transition-colors ${activeEduIndex === 1 ? 'bg-white border-white' : 'bg-black border-white group-hover:bg-white'}`}></div>
                                <span className="font-mono text-zinc-500 font-bold text-xs uppercase mb-2 block">2025 - 2027</span>
                                <h3 className="text-2xl font-black uppercase mb-2 transition-transform">Técnico em Informática</h3>
                                <p className="text-lg font-bold text-zinc-300">Escola Técnica</p>
                            </div>
                        </div>
                    </div>

                    {/* CERTIFICAÇÕES */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-white p-3 border-2 border-white text-black">
                                <Zap size={32} />
                            </div>
                            <h2 className="text-4xl font-black uppercase leading-none">Certificados<br />& Cursos</h2>
                        </div>

                        <div className="grid gap-4">
                            {[
                                { name: " fundação bradesco ", org: "analise de dados", date: "2025", color: "border-[#FF9900] text-[#FF9900]" },
                                { name: "Google  skills", org: " desenvolvimento de IA", date: "2026", color: "border-[#8257E5] text-[#8257E5]" },
                                { name: "fundação bradesco", org: "projetos de programação", date: "2025", color: "border-[#0668E1] text-[#0668E1]" },
                                { name: "Google Labs", org: "labs com gemine", date: "2026", color: "border-[#4285F4] text-[#4285F4]" },
                            ].map((cert, i) => {
                                const isActive = activeCertIndex === i;
                                // Adaptando a cor para usar border e text diretamente em vez de hover
                                return (
                                    <div key={i} className={`border-2 bg-zinc-900/50 p-6 transition-all cursor-none group ${isActive ? `${cert.color} translate-x-1 -translate-y-1 shadow-[4px_4px_0px_currentColor]` : 'border-zinc-800 hover:border-zinc-600'}`} tabIndex="0">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-black uppercase max-w-[80%]">{cert.name}</h3>
                                            <ExternalLink size={20} className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                        </div>
                                        <div className="flex justify-between items-end font-mono text-xs uppercase">
                                            <span className={`font-bold ${isActive ? 'text-current' : 'text-zinc-400 group-hover:text-current'}`}>{cert.org}</span>
                                            <span className={`border px-2 py-1 ${isActive ? 'border-current' : 'border-zinc-700 group-hover:border-current'}`}>{cert.date}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </PageLayout>
        );
    };

    // 6. CONTATO
    const ContactPage = () => {
        const activeSocialIndex = useAutoCycle(4, 1500);

        const activeEmailIndex = useAutoCycle(2, 3000); // Para animar o email grande

        return (
            <PageLayout title="Contato" activeColor="bg-[#9D00FF]">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 pb-12">

                    {/* LEFT COLUMN: FORM */}
                    <div className="border-2 border-white bg-black relative shadow-[10px_10px_0px_0px_#9D00FF] transition-shadow duration-300">
                        <div className="bg-[#9D00FF] p-2 border-b-2 border-white flex justify-between items-center text-black font-bold font-mono text-xs">
                            <span className="animate-pulse">SEND_MESSAGE.EXE</span>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 bg-white border-2 border-black"></div>
                                <div className="w-3 h-3 bg-black border-2 border-white"></div>
                            </div>
                        </div>

                        <div className="p-6 md:p-12 flex flex-col justify-center h-full">
                            <div className="space-y-8">
                                <h2 className="text-4xl md:text-6xl font-sans font-black uppercase leading-[0.85] group">
                                    Let's<br />
                                    <span className="text-transparent stroke-text group-hover:text-[#9D00FF] group-hover:stroke-black transition-all" style={{ WebkitTextStroke: '2px #9D00FF' }}>Connect</span>
                                </h2>

                                <div className="border-l-4 border-[#9D00FF] pl-6 py-2 space-y-6">
                                    <p className="font-mono text-xl md:text-2xl text-white leading-relaxed">
                                        Para conversarmos sobre novos projetos ou parcerias, você pode me enviar uma mensagem direta:
                                    </p>

                                    <div className="space-y-4 font-mono text-lg transition-all">
                                        <a href="https://wa.me/5531988004874" target="_blank" className="group flex items-center gap-3 hover:text-[#25D366] transition-all w-fit">
                                            <span className="text-[#9D00FF] font-bold">&gt;</span>
                                            <span className="underline decoration-zinc-800 group-hover:decoration-[#25D366] underline-offset-4">No WhatsApp (Zap)</span>
                                        </a>
                                        <a href="#" target="_blank" className="group flex items-center gap-3 hover:text-[#E4405F] transition-all w-fit">
                                            <span className="text-[#9D00FF] font-bold">&gt;</span>
                                            <span className="underline decoration-zinc-800 group-hover:decoration-[#E4405F] underline-offset-4">No Instagram</span>
                                        </a>
                                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=g.leonardo2008@gmail.com" target="_blank" className="group flex items-center gap-3 hover:text-white transition-all w-fit">
                                            <span className="text-[#9D00FF] font-bold">&gt;</span>
                                            <span className="underline decoration-zinc-800 group-hover:decoration-white underline-offset-4">Por E-mail (Gmail)</span>
                                        </a>
                                    </div>
                                </div>

                                <p className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em] mt-8 animate-pulse">
                                    // Aguardo seu contato_
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: DIRECT INFO */}
                    <div className="flex flex-col gap-6">

                        {/* BIG EMAIL DISPLAY */}
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=g.leonardo2008@gmail.com" target="_blank" className={`bg-[#9D00FF] p-8 border-2 border-white text-black flex flex-col justify-center items-center text-center transition-all duration-500 cursor-none group min-h-[200px] relative overflow-hidden ${activeEmailIndex === 0 ? 'bg-white text-[#9D00FF]' : 'bg-[#9D00FF] text-black'} `}>
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
                            <Mail size={48} className={`mb-4 stroke-[2.5px] relative z-10 transition-transform duration-500 ${activeEmailIndex === 0 ? 'scale-125' : 'scale-100'}`} />
                            <p className="font-mono text-xs uppercase mb-2 font-bold relative z-10">Direct Protocol</p>
                            <span className={`text-2xl md:text-3xl font-black break-all transition-transform duration-500 relative z-10 font-sans ${activeEmailIndex === 0 ? 'scale-105 underline decoration-4 underline-offset-4' : 'scale-100'}`}>
                                g.leonardo2008@gmail.com
                            </span>
                        </a>

                        {/* SOCIAL GRID */}
                        <div className="grid grid-cols-2 gap-4 flex-grow">
                            {[

                                { name: "GitHub", icon: Github, url: "https://github.com/bielllg" },
                                { name: "Instagram", icon: Disc, url: "#" },
                                { name: "WhatsApp", icon: Zap, url: "https://wa.me/5531988004874" }
                            ].map((social, idx) => {
                                const isActive = activeSocialIndex === idx;
                                return (
                                    <a key={idx} href={social.url} className={`border-2 p-6 flex flex-col justify-between transition-all group min-h-[140px] focus:outline-none focus:ring-4 focus:ring-[#9D00FF] ${isActive ? 'bg-white text-black border-white' : 'bg-zinc-900 border-zinc-700 hover:bg-white hover:text-black hover:border-white'}`}>
                                        <div className="flex justify-between items-start">
                                            <social.icon size={28} className={`transition-colors ${isActive ? 'text-black' : 'text-zinc-500 group-hover:text-black'}`} />
                                            <ArrowLeft size={20} className={`rotate-[135deg] text-[#9D00FF] transition-opacity transform ${isActive ? 'opacity-100 translate-x-1 -translate-y-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                                        </div>
                                        <span className={`font-black uppercase text-xl font-sans tracking-tight transition-transform ${isActive ? 'translate-x-2' : 'group-hover:translate-x-2 group-hover:text-red-500'}`}>{social.name}</span>
                                    </a>
                                )
                            })}
                        </div>

                        {/* LOCATION BADGE */}
                        <div className="border-2 border-dashed border-zinc-700 p-4 font-mono text-[10px] md:text-xs text-zinc-500 flex justify-between items-center bg-zinc-900/50 hover:bg-zinc-900 transition-colors cursor-help">
                            <span className="flex items-center gap-2"><Globe size={14} /> COORDS: 19.9167° S, 43.9345° W</span>
                            <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#00FF66] rounded-full animate-pulse shadow-[0_0_8px_#00FF66]"></div> ONLINE</span>
                        </div>
                    </div>
                </div>
            </PageLayout>
        );
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home': return <HomePage />;
            case 'sobre': return <AboutPage />;
            case 'habilidades': return <SkillsPage />;
            case 'projetos': return <ProjectsPage />;
            case 'qualificacoes': return <QualificationsPage />;
            case 'contato': return <ContactPage />;
            default: return <HomePage />;
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen font-sans selection:bg-[#0033FF] selection:text-white">
            {renderPage()}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@300;400;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        /* Aplicando as fontes globalmente com !important para garantir a sobrescrita */
        .font-sans { font-family: 'Space Grotesk', sans-serif !important; }
        .font-serif { font-family: 'Playfair Display', serif !important; }
        .font-mono { font-family: 'Space Mono', monospace !important; }

        .cursor-none-override, .cursor-none-override * {
            cursor: none !important;
        }

        /* Stroke Text Utility */
        .stroke-text {
            -webkit-text-stroke: 2px currentColor;
            color: transparent;
        }

        /* Keyframes */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }
        @keyframes shockwave {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; border-width: 4px; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; border-width: 0px; }
        }

        /* Classes de Animação */
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-shockwave {
          animation: shockwave 0.5s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default Portfolio;
