import type { FC } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  CATEGORY_COLORS,
} from "../data/commands";

import type {
  TerminalCommand,
} from "../types/commands";

interface TerminalAutocompleteProps {
  suggestions: TerminalCommand[];
  selectedSuggestion: number;
  showSuggestions: boolean;
  onSelect: (
    command: TerminalCommand
  ) => void;
}

const TerminalAutocomplete: FC<
  TerminalAutocompleteProps
> = ({
  suggestions,
  selectedSuggestion,
  showSuggestions,
  onSelect,
}) => (
  <AnimatePresence>
    {showSuggestions &&
      suggestions.length > 0 && (
        <motion.div
          className="
            absolute
            bottom-full
            left-0
            right-0
            z-50
            mb-2
            cyber-border
            rounded-lg
            bg-[#050508]
            max-h-48
            overflow-y-auto
            shadow-2xl
          "
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 10,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          {suggestions.map(
            (command, index) => {
              const Icon =
                command.icon;

              const categoryColor =
                CATEGORY_COLORS[
                  command.category
                ];

              return (
                <button
                  type="button"
                  key={command.id}
                  className={`
                    w-full
                    text-left
                    p-3
                    cursor-pointer
                    transition-colors
                    ${
                      index ===
                      selectedSuggestion
                        ? "bg-[#A020F0]/20 cyber-glow"
                        : "hover:bg-[#A020F0]/10"
                    }
                  `}
                  onMouseDown={(
                    event
                  ) => {
                    event.preventDefault();

                    onSelect(command);
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      style={{
                        color:
                          categoryColor,
                      }}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="min-w-0">
                      <div
                        className="
                          jetbrains
                          text-sm
                        "
                        style={{
                          color:
                            categoryColor,
                        }}
                      >
                        {command.name}
                      </div>

                      <div
                        className="
                          jetbrains
                          text-xs
                          text-[#0FF4F8]
                          opacity-70
                          truncate
                        "
                      >
                        {
                          command.description
                        }
                      </div>
                    </div>
                  </div>
                </button>
              );
            }
          )}
        </motion.div>
      )}
  </AnimatePresence>
);

export default TerminalAutocomplete;