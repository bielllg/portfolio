import React from 'react';
import { motion } from 'framer-motion';

const TacticalButton = ({ children, onClick, active = false, className = "" }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`relative px-8 py-3 font-display uppercase tracking-wider text-sm border-2 transition-all overflow-hidden group ${active ? 'border-cyber-primary text-cyber-primary' : 'border-white/20 text-white hover:border-cyber-primary hover:text-cyber-primary'
                } ${className}`}
            style={{
                clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
            }}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-cyber-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 origin-left z-0 opacity-10" />
        </motion.button>
    );
};

export default TacticalButton;
