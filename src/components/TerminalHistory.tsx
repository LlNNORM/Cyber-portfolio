import { useEffect, useState, useRef } from "react"; 
import type { FC } from "react"; 

// Глобальный флаг проигрыша анимации
let hasAnimatedIntro = false; 

interface TerminalHistoryProps { 
  history: string[]; 
  bannerLength?: number; 
} 

const TerminalHistory: FC<TerminalHistoryProps> = ({ 
  history, 
  bannerLength = 0, 
}) => { 
  const containerRef = useRef<HTMLDivElement>(null); 
  const isInitialMount = useRef(true); 

  const [displayedLines, setDisplayedLines] = useState<string[]>(() => { 
    if (hasAnimatedIntro) { 
      return history; 
    } 
    return history.slice(0, bannerLength); 
  }); 

  const [isAnimating, setIsAnimating] = useState(!hasAnimatedIntro); 

  // Управление скроллом
  useEffect(() => { 
    if (!containerRef.current) return; 

    // Если это монтирование при ВОЗВРАТЕ на страницу (анимация уже была) — ставим скролл вверху
    if (isInitialMount.current) { 
      isInitialMount.current = false; 
      if (hasAnimatedIntro) { 
        containerRef.current.scrollTop = 0; 
        return; 
      } 
    } 

    // При первой загрузке (во время печати) и при вводе новых команд скроллим ВНИЗ за текстом
    containerRef.current.scrollTop = containerRef.current.scrollHeight; 
  }, [displayedLines]); 

  // Анимация печати
  useEffect(() => { 
    if (hasAnimatedIntro) { 
      setDisplayedLines(history); 
      return; 
    } 

    const linesToAnimate = history.slice(bannerLength); 
    if (linesToAnimate.length === 0) { 
      hasAnimatedIntro = true; 
      setIsAnimating(false); 
      return; 
    } 

    let lineIdx = 0; 
    let charIdx = 0; 
    const currentTypedLines = [...history.slice(0, bannerLength)]; 

    const timer = setInterval(() => { 
      if (lineIdx >= linesToAnimate.length) { 
        clearInterval(timer); 
        hasAnimatedIntro = true; 
        setIsAnimating(false); 
        setDisplayedLines(history); 
        return; 
      } 

      const currentFullLine = linesToAnimate[lineIdx]; 

      if (currentFullLine === "") { 
        currentTypedLines.push(""); 
        lineIdx++; 
        charIdx = 0; 
      } else { 
        charIdx += 2; 
        if (charIdx >= currentFullLine.length) { 
          currentTypedLines[bannerLength + lineIdx] = currentFullLine; 
          lineIdx++; 
          charIdx = 0; 
        } else { 
          currentTypedLines[bannerLength + lineIdx] = currentFullLine.slice(0, charIdx); 
        } 
      } 

      setDisplayedLines([...currentTypedLines]); 
    }, 12); 

    return () => clearInterval(timer); 
  }, [history, bannerLength]); 

  return ( 
    <div 
      ref={containerRef} 
      className="flex-1 overflow-y-auto cyber-scroll space-y-1" 
    > 
      {displayedLines.map((line, index) => ( 
        <div key={index} className="font-mono text-xl sm:text-lg leading-relaxed min-h-[1.25rem]"> 
          {line} 
          {isAnimating && index === displayedLines.length - 1 && ( 
            <span className="inline-block w-2 h-4 bg-[#A020F0] ml-1 animate-pulse align-middle" /> 
          )} 
        </div> 
      ))} 
    </div> 
  ); 
}; 

export default TerminalHistory;