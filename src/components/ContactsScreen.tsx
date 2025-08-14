import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, MessageCircle, Mail, MapPin, Calendar } from 'lucide-react';

interface ContactsScreenProps {
  onBack: () => void;
}

const ContactsScreen: React.FC<ContactsScreenProps> = ({ onBack }) => {
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);

  const contacts = [
    {
      id: 'github',
      name: 'GitHub',
      value: '@LlNNORM',
      url: 'https://github.com/LlNNORM',
      icon: Github,
      color: '#A020F0',
      description: 'Open source contributions'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      value: 'Linnorm Dev',
      url: '#',
      icon: Linkedin,
      color: '#00E0FF',
      description: 'Professional network'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      value: '@linnorm_dev',
      url: '#',
      icon: MessageCircle,
      color: '#0FF4F8',
      description: 'Direct messaging'
    },
    {
      id: 'email',
      name: 'Email',
      value: 'dev@linnorm.cyber',
      url: 'mailto:dev@linnorm.cyber',
      icon: Mail,
      color: '#A020F0',
      description: 'Professional inquiries'
    }
  ];

  const floatingElements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    symbol: ['◆', '◇', '▲', '△', '●', '○', '■', '□'][i % 8],
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5
  }));

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] cyber-grid p-4 md:p-8">
      <div className="scanline"></div>
      
      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute text-[#A020F0] text-opacity-20 text-2xl pointer-events-none"
          style={{ left: `${element.x}%`, top: `${element.y}%` }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {element.symbol}
        </motion.div>
      ))}
      
      <motion.div 
        className="max-w-6xl mx-auto h-full flex flex-col relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button
            onClick={onBack}
            className="cyber-border rounded-lg px-4 py-2 jetbrains text-[#00E0FF] hover:bg-[#A020F0] hover:bg-opacity-20 transition-all duration-300"
          >
            {'< BACK'}
          </button>
          <h1 className="orbitron text-2xl md:text-4xl text-[#A020F0] cyber-text-glow tracking-wider">
            NEURAL INTERFACE
          </h1>
          <div className="jetbrains text-[#0FF4F8] text-sm">
            <Calendar size={16} className="inline mr-1" />
            Available 24/7
          </div>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code & Info Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* QR Code Card */}
            <div className="cyber-border rounded-lg bg-[#050508] p-8 text-center">
              <h2 className="orbitron text-xl text-[#A020F0] cyber-text-glow mb-6 tracking-wider">
                QUICK ACCESS
              </h2>
              
              {/* QR Code */}
              <div className="w-48 h-48 mx-auto cyber-border rounded-lg bg-[#0a0a0f] flex items-center justify-center mb-6 relative">
                <div className="w-40 h-40 bg-white rounded grid grid-cols-8 gap-1 p-2">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div
                      key={i}
                      className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 cyber-glow rounded-lg"></div>
              </div>
              
              <p className="jetbrains text-[#00E0FF] text-sm">
                Scan to access GitHub profile
              </p>
              <p className="jetbrains text-[#0FF4F8] text-xs mt-2">
                github.com/LlNNORM
              </p>
            </div>

            {/* Location & Availability */}
            <div className="cyber-border rounded-lg bg-[#050508] p-6">
              <h3 className="orbitron text-lg text-[#A020F0] cyber-text-glow mb-4 tracking-wider">
                LOCATION & STATUS
              </h3>
              <div className="space-y-3 jetbrains">
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-[#0FF4F8]" />
                  <span className="text-[#00E0FF]">Remote • Global</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#00ff41] rounded-full cyber-flicker"></div>
                  <span className="text-[#00E0FF]">Available for projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#00E0FF] rounded-full"></div>
                  <span className="text-[#00E0FF]">Response time: ~2 hours</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contacts Grid */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="orbitron text-xl text-[#A020F0] cyber-text-glow mb-6 tracking-wider">
              COMMUNICATION CHANNELS
            </h2>
            
            {contacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={contact.id}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block cyber-border rounded-lg bg-[#050508] p-6 transition-all duration-300 cursor-pointer ${
                    hoveredContact === contact.id ? 'cyber-glow scale-105' : 'hover:cyber-glow hover:scale-102'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  onMouseEnter={() => setHoveredContact(contact.id)}
                  onMouseLeave={() => setHoveredContact(null)}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 cyber-border rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{ 
                        backgroundColor: hoveredContact === contact.id ? contact.color + '20' : 'transparent',
                        borderColor: hoveredContact === contact.id ? contact.color : ''
                      }}
                    >
                      <Icon 
                        size={24} 
                        style={{ color: hoveredContact === contact.id ? contact.color : '#00E0FF' }}
                        className="transition-colors duration-300"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="orbitron text-lg" style={{ color: contact.color }}>
                        {contact.name}
                      </h3>
                      <p className="jetbrains text-[#00E0FF] cyber-text-glow">
                        {contact.value}
                      </p>
                      <p className="jetbrains text-xs text-[#0FF4F8] mt-1">
                        {contact.description}
                      </p>
                    </div>
                    
                    <div className="text-[#A020F0] opacity-50">
                      →
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactsScreen;