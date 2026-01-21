import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import CustomCursor from './CustomCursor';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <CustomCursor />

            {/* BRUTAL HEADER */}
            <header className="border-b-4 border-black bg-neo-yellow px-4 py-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <Link to="/" className="text-3xl font-display uppercase tracking-tighter hover:bg-black hover:text-white px-2 transition-all">
                        Gabriel.Dev
                    </Link>

                    <nav className="flex gap-4">
                        <NavButton to="/">Work</NavButton>
                        <NavButton to="/tech">Tech</NavButton>
                        <NavButton to="/contact">Contact</NavButton>
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            {/* BRUTAL FOOTER */}
            <footer className="border-t-4 border-black bg-black text-white py-12 px-4 text-center">
                <h2 className="font-display text-2xl mb-4">THANKS FOR VISITING</h2>
                <div className="flex justify-center gap-4 font-bold font-mono">
                    <FooterLink href="#">GITHUB</FooterLink>
                    <FooterLink href="#">LINKEDIN</FooterLink>
                    <FooterLink href="#">EMAIL</FooterLink>
                </div>
            </footer>
        </div>
    );
};

const NavButton = ({ to, children }) => (
    <Link
        to={to}
        className="relative px-6 py-2 border-2 border-black font-bold uppercase bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-neo-pink transition-all active:bg-black active:text-white"
    >
        {children}
    </Link>
);

const FooterLink = ({ href, children }) => (
    <a href={href} className="relative inline-block hover:text-neo-yellow after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-1 after:bottom-0 after:left-0 after:bg-neo-yellow after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left transition-all duration-300">
        {children}
    </a>
);

export default Layout;
