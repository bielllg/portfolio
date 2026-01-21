import React from 'react';
import { motion } from 'framer-motion';

const HudCard = ({ title, children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className={`relative bg-cyber-panel border border-white/10 p-6 ${className}`}
            style={{
                clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
            }}
        >
            {/* Corner Decor */}
            <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-cyber-primary -rotate-45 origin-bottom-right" />

            {title && (
                <h3 className="font-display text-xl mb-4 text-cyber-secondary border-l-4 border-cyber-secondary pl-3 uppercase">
                    {title}
                </h3>
            )}

            {children}
        </motion.div>
    );
};

export default HudCard;
