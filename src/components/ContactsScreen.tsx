import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { MapPin, Calendar, ExternalLink, Copy, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { FloatingBackground } from './FloatingBackground';
import { ScreenHeader } from './ScreenHeader';
import { CONTACTS_DATA } from '../data/contacts';
import type { ContactItem } from '../types/contacts';

interface ContactsScreenProps {
  onBack: () => void;
}

const ContactsScreen: React.FC<ContactsScreenProps> = ({ onBack }) => {
  const [selectedContact, setSelectedContact] = useState<ContactItem>(CONTACTS_DATA[0]);
  const [hoveredContact, setHoveredContact] = useState<ContactItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { t } = useLanguage();

  const activeQrContact = hoveredContact || selectedContact;

  const handleCopy = (e: React.MouseEvent, id: string, textToCopy: string) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] cyber-grid p-3 sm:p-4 md:p-8 relative overflow-y-auto overflow-x-hidden cyber-scroll">
      <FloatingBackground />

      <motion.div 
        className="max-w-6xl mx-auto flex flex-col relative z-10 min-h-[calc(100vh-2rem)] md:min-h-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ScreenHeader
          onBack={onBack}
          backText={t('contacts.back')}
          title={t('contacts.title')}
          rightElement={
            <div className="jetbrains text-[#0FF4F8] text-xs sm:text-sm flex items-center shrink-0">
              <Calendar size={14} className="mr-1 sm:w-4 sm:h-4" />
              <span className="truncate">{t('contacts.available')}</span>
            </div>
          }
        />

        {/* Main Layout Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-2 sm:mt-4 pb-8 items-stretch">
          
          {/* Left Column: QR Code & Status Section */}
          <motion.div 
            className="space-y-4 sm:space-y-6 order-2 lg:order-1 flex flex-col justify-between"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Dynamic QR Card */}
            <div className="cyber-border rounded-lg bg-[#050508] p-4 sm:p-8 text-center relative overflow-hidden flex-1 flex flex-col justify-center">
              <h2 className="orbitron text-base sm:text-xl text-[#A020F0] cyber-text-glow mb-4 sm:mb-6 tracking-wider flex items-center justify-center gap-2 flex-wrap">
                <span>{t('contacts.quick_access')}</span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded bg-[#A020F0]/20 text-[#00E0FF] border border-[#A020F0]/40">
                  {activeQrContact.name}
                </span>
              </h2>
              
              {/* Dynamic QR Container with Scanner Effect */}
              <div className="w-36 h-36 sm:w-48 sm:h-48 mx-auto cyber-border rounded-lg bg-white p-2.5 sm:p-3 flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden shadow-[0_0_20px_rgba(160,32,240,0.3)] shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeQrContact.id}
                    initial={{ opacity: 0.3, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.2, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <QRCodeSVG 
                      value={activeQrContact.qrValue}
                      size={120}
                      bgColor="#FFFFFF"
                      fgColor="#050508"
                      level="M"
                      includeMargin={false}
                      className="w-full h-full max-w-[160px] max-h-[160px]"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 cyber-grid-overlay pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`scan-${activeQrContact.id}`}
                    initial={{ top: "-15%", opacity: 0 }}
                    animate={{ 
                      top: ["-15%", "115%"],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut",
                      times: [0, 0.1, 0.9, 1]
                    }}
                    className="absolute left-0 right-0 h-8 cyber-scan-line pointer-events-none z-10"
                  />
                </AnimatePresence>

                <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#A020F0]" />
                <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#A020F0]" />
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#A020F0]" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#A020F0]" />
              </div>
              
              <p className="jetbrains text-[#00E0FF] text-xs sm:text-sm min-h-[20px] transition-all">
                {t(activeQrContact.qrLabelKey)}
              </p>
              <p className="jetbrains text-[#0FF4F8] text-[11px] sm:text-xs mt-1 sm:mt-2 opacity-80 truncate max-w-[240px] sm:max-w-xs mx-auto">
                {activeQrContact.value}
              </p>
            </div>

            {/* Location & Status Card */}
            <div className="cyber-border rounded-lg bg-[#050508] p-4 sm:p-6 shrink-0">
              <h3 className="orbitron text-base sm:text-lg text-[#A020F0] cyber-text-glow mb-3 sm:mb-4 tracking-wider">
                {t('contacts.location_status')}
              </h3>
              <div className="space-y-2.5 sm:space-y-3 jetbrains text-xs sm:text-sm">
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-[#0FF4F8] shrink-0" />
                  <span className="text-[#00E0FF]">{t('contacts.location')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#00ff41] rounded-full cyber-flicker shrink-0"></div>
                  <span className="text-[#00E0FF]">{t('contacts.available_projects')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#00E0FF] rounded-full shrink-0"></div>
                  <span className="text-[#00E0FF]">{t('contacts.response_time')}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contacts List (Растягивается по всей высоте) */}
          <motion.div 
            className="order-1 lg:order-2 flex flex-col justify-between h-full space-y-3 sm:space-y-4 lg:space-y-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="orbitron text-lg sm:text-xl text-[#A020F0] cyber-text-glow mb-3 lg:mb-4 tracking-wider shrink-0">
              {t('contacts.channels')}
            </h2>
            
            <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-4">
              {CONTACTS_DATA.map((contact, index) => {
                const Icon = contact.icon;
                const isSelected = selectedContact.id === contact.id;
                const isHovered = hoveredContact?.id === contact.id;
                const isCopied = copiedId === contact.id;

                return (
                  <motion.a
                    key={contact.id}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSelectedContact(contact)}
                    onMouseEnter={() => setHoveredContact(contact)}
                    onMouseLeave={() => setHoveredContact(null)}
                    className={`cyber-border rounded-lg bg-[#050508] p-3.5 sm:p-4 lg:p-5 transition-all duration-300 cursor-pointer relative group flex-1 flex flex-col justify-center ${
                      isSelected ? 'border-[#00E0FF] bg-[#0a0a14] cyber-glow' : ''
                    } ${isHovered && !isSelected ? 'cyber-glow scale-[1.01]' : ''}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.08, duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      {/* Icon Container */}
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 cyber-border rounded-lg flex items-center justify-center transition-all duration-300 shrink-0"
                        style={{ 
                          backgroundColor: (isHovered || isSelected) ? `${contact.color}25` : 'transparent',
                          borderColor: (isHovered || isSelected) ? contact.color : ''
                        }}
                      >
                        <Icon 
                          size={20} 
                          style={{ color: (isHovered || isSelected) ? contact.color : '#00E0FF' }}
                          className="transition-colors duration-300 sm:w-6 sm:h-6"
                        />
                      </div>
                      
                      {/* Contact Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="orbitron text-sm sm:text-lg flex items-center gap-2" style={{ color: contact.color }}>
                          <span className="truncate">{contact.name}</span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#00E0FF] animate-pulse shrink-0" />
                          )}
                        </h3>
                        <p className="jetbrains text-[#00E0FF] text-xs sm:text-base cyber-text-glow truncate">
                          {contact.value}
                        </p>
                        <p className="jetbrains text-[11px] sm:text-xs text-[#0FF4F8] mt-0.5 opacity-80 truncate">
                          {t(contact.descriptionKey)}
                        </p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
                        {contact.copyableText && (
                          <button
                            type="button"
                            title="Скопировать"
                            onClick={(e) => handleCopy(e, contact.id, contact.copyableText!)}
                            className="p-2 rounded-md hover:bg-[#1a1a24] text-[#0FF4F8] transition-colors relative active:scale-95"
                          >
                            {isCopied ? (
                              <Check size={16} className="text-[#00ff41] sm:w-[18px] sm:h-[18px]" />
                            ) : (
                              <Copy size={16} className="opacity-70 hover:opacity-100 sm:w-[18px] sm:h-[18px]" />
                            )}

                            <AnimatePresence>
                              {isCopied && (
                                <motion.span
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: -25 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#00ff41] text-black text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-md whitespace-nowrap jetbrains z-20"
                                >
                                  Copied!
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </button>
                        )}

                        <div className={`p-1.5 sm:p-2 transition-transform duration-300 ${
                          isHovered || isSelected ? 'translate-x-1 text-[#00E0FF]' : 'text-[#A020F0] opacity-50'
                        }`}>
                          <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default ContactsScreen;