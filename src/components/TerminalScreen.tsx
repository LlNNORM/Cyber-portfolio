import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, User, Briefcase, Mail, RotateCcw, LogOut, HelpCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
type Screen = 'profile' | 'skills' | 'projects' | 'contacts' | 'boot';

interface TerminalScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Command {
  name: string;
  description: string;
  action: string | (() => void);
  icon?: React.ReactNode;
  category: 'navigation' | 'info' | 'system';
}

const TerminalScreen: React.FC<TerminalScreenProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '╔═══════════════════════════════════════════════════════════════╗',
    t('terminal.bannerLine1'),
    t('terminal.bannerLine2'),
    '╚═══════════════════════════════════════════════════════════════╝',
    '',
    t('terminal.initSuccess'),
    t('terminal.neuralEstablished'),
    t('terminal.helpHint'),
    ''
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<Command[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    { name: 'help', description: t('commands.help.description'), action: 'Available commands: help, profile, skills, projects, contact, whoami, status, clear, exit', icon: <HelpCircle size={16} />, category: 'info' },
    { name: 'profile', description: t('commands.profile.description'), action: () => onNavigate('profile'), icon: <User size={16} />, category: 'navigation' },
    { name: 'skills', description: t('commands.skills.description'), action: () => onNavigate('skills'), icon: <Zap size={16} />, category: 'navigation' },
    { name: 'projects', description: t('commands.projects.description'), action: () => onNavigate('projects'), icon: <Briefcase size={16} />, category: 'navigation' },
    { name: 'contact', description: t('commands.contact.description'), action: () => onNavigate('contacts'), icon: <Mail size={16} />, category: 'navigation' },
    { name: 'clear', description: t('commands.clear.description'), action: () => setHistory([
        '╔═══════════════════════════════════════════════════════════════╗',
        '║                    PersonalityOS v1.0                        ║',
        '║                  Neural Interface Active                     ║',
        '╚═══════════════════════════════════════════════════════════════╝',
        ''
      ]), icon: <RotateCcw size={16} />, category: 'system' },
    { name: 'exit', description: t('commands.exit.description'), action: () => onNavigate('boot'), icon: <LogOut size={16} />, category: 'system' },
    { name: 'whoami', description: t('commands.whoami.description'), action: 'User: Linnorm | Role: Frontend Developer | Status: Available', icon: <User size={16} />, category: 'info' },
    { name: 'status', description: t('commands.status.description'), action: 'System Status: ONLINE | CPU: 45% | Memory: 67% | Neural Load: 23%', icon: <Zap size={16} />, category: 'info' }
  ];

  useEffect(() => {
    if (input.trim()) {
      const filtered = commands.filter(cmd => cmd.name.toLowerCase().startsWith(input.toLowerCase().trim()));
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedSuggestion(0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [input]);

  const handleCommand = useCallback((cmd: string) => {
    const command = cmd.toLowerCase().trim();
    const newHistory = [...history, `> ${cmd}`];

    if (command && !commandHistory.includes(command)) {
      setCommandHistory(prev => [command, ...prev.slice(0, 9)]);
    }

    const foundCommand = commands.find(c => c.name === command);

    if (foundCommand) {
      if (typeof foundCommand.action === 'string') {
        newHistory.push(foundCommand.action, '');
      } else if (typeof foundCommand.action === 'function') {
        foundCommand.action();
        return;
      }
    } else if (command === '') {
      newHistory.push('');
    } else {
      const similarCommands = commands.filter(c => c.name.includes(command) || command.includes(c.name.substring(0, 3))).slice(0, 3);
      newHistory.push(
        `◉ Command not found: "${command}"`,
        similarCommands.length > 0 ? `◉ Did you mean: ${similarCommands.map(c => c.name).join(', ')}?` : '◉ Type "help" for available commands',
        ''
      );
    }

    setHistory(newHistory);
    setInput('');
    setHistoryIndex(-1);
    setShowSuggestions(false);
  }, [history, commands, commandHistory, onNavigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showSuggestions && suggestions.length > 0) handleCommand(suggestions[selectedSuggestion].name);
      else handleCommand(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) { setInput(suggestions[selectedSuggestion].name); setShowSuggestions(false); }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showSuggestions) setSelectedSuggestion(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
      else if (commandHistory.length > 0) { const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex; setHistoryIndex(newIndex); setInput(commandHistory[newIndex] || ''); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showSuggestions) setSelectedSuggestion(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
      else if (historyIndex > 0) { const newIndex = historyIndex - 1; setHistoryIndex(newIndex); setInput(commandHistory[newIndex] || ''); }
      else if (historyIndex === 0) { setHistoryIndex(-1); setInput(''); }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestion(0);
    }
  }, [input, showSuggestions, suggestions, selectedSuggestion, commandHistory, historyIndex, handleCommand]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const getCategoryColor = (category: string) => {
    switch (category) { case 'navigation': return '#00E0FF'; case 'info': return '#A020F0'; case 'system': return '#0FF4F8'; default: return '#00E0FF'; }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] cyber-grid p-4 md:p-8 flex h-screen flex-col">
      <div className="scanline"></div>

      <motion.div className="max-w-6xl mx-auto flex-1 flex overflow-hidden">
        {/* Terminal */}
        <div className="flex-1 flex flex-col min-w-0">
          <motion.div className="cyber-border rounded-t-lg bg-[#050508] p-4 flex items-center justify-between" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cyber-glow"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 cyber-glow"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 cyber-glow"></div>
              </div>
              <span className="jetbrains text-[#00E0FF] cyber-text-glow">linnorm@neural-interface:~$</span>
            </div>
            <div className="text-[#A020F0] jetbrains text-sm flex items-center space-x-4">
              <span>Neural Load: <span className="text-[#0FF4F8]">23%</span></span>
              <span>Status: <span className="text-[#00ff41] cyber-flicker">ACTIVE</span></span>
            </div>
          </motion.div>

          <motion.div className="cyber-border border-t-0 rounded-b-lg bg-[#050508] p-6 flex-1 flex flex-col overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
            <div className="flex-1 overflow-y-auto space-y-1 mb-4 pr-2">
              {history.map((line, index) => (
                <div key={index} className={`jetbrains text-sm ${line.includes('not found') ? 'text-red-400' : 'text-[#00E0FF]'}`}>
                  {line}
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="flex items-center space-x-2 mb-2">
                <ChevronRight size={16} className="text-[#A020F0] cyber-text-glow" />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent jetbrains text-[#0FF4F8] outline-none caret-[#00E0FF] terminal-cursor"
                  placeholder="Enter command... (TAB for autocomplete)"
                />
              </div>

              <AnimatePresence>
                {showSuggestions && (
                  <motion.div className="absolute top-full left-0 right-0 z-20 mt-1 cyber-border rounded-lg bg-[#050508] max-h-48 overflow-y-auto" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    {suggestions.map((cmd, index) => (
                      <div key={cmd.name} className={`p-3 cursor-pointer ${index === selectedSuggestion ? 'bg-[#A020F0] bg-opacity-20 cyber-glow' : 'hover:bg-[#A020F0] hover:bg-opacity-10'}`} onClick={() => { setInput(cmd.name); setShowSuggestions(false); }}>
                        <div className="flex items-center space-x-3">
                          <div style={{ color: getCategoryColor(cmd.category) }}>{cmd.icon}</div>
                          <div>
                            <div className="jetbrains text-sm" style={{ color: getCategoryColor(cmd.category) }}>{cmd.name}</div>
                            <div className="jetbrains text-xs text-[#0FF4F8] opacity-70">{cmd.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Command Reference */}
        <motion.div className="w-80 flex-shrink-0 ml-4 cyber-border rounded-lg bg-[#050508] p-4 overflow-y-auto hidden md:flex flex-col">
          <h3 className="orbitron text-lg text-[#A020F0] cyber-text-glow mb-4 flex items-center space-x-2">
            <HelpCircle size={18} /> <span>Command Reference</span>
          </h3>
          {['navigation', 'info', 'system'].map(category => (
            <div key={category} className="space-y-2 mb-4">
              <h4 className="jetbrains text-sm uppercase tracking-wider border-b border-opacity-30 pb-1" style={{ color: getCategoryColor(category), borderColor: getCategoryColor(category) }}>{category}</h4>
              {commands.filter(c => c.category === category).map(cmd => (
                <button key={cmd.name} onClick={() => handleCommand(cmd.name)} className="w-full text-left p-2 rounded cyber-border bg-[#0a0a0f] hover:bg-[#A020F0] hover:bg-opacity-10 transition-all duration-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <div style={{ color: getCategoryColor(category) }}>{cmd.icon}</div>
                    <span className="jetbrains text-sm" style={{ color: getCategoryColor(category) }}>{cmd.name}</span>
                  </div>
                  <div className="jetbrains text-xs text-[#0FF4F8] opacity-70 pl-6">{cmd.description}</div>
                </button>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TerminalScreen;
