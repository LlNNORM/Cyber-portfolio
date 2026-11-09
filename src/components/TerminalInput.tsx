import type {
  ChangeEvent,
  FC,
  KeyboardEvent,
  RefObject,
} from "react";

import { ChevronRight } from "lucide-react";

import { useLanguage } from "./useLanguage";
import TerminalAutocomplete from "./TerminalAutocomplete";

import type {
  TerminalCommand,
} from "../types/commands";

interface TerminalInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  value: string;
  suggestions: TerminalCommand[];
  selectedSuggestion: number;
  showSuggestions: boolean;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onSuggestionSelect: (command: TerminalCommand) => void;
}

const TerminalInput: FC<TerminalInputProps> = ({
  inputRef,
  value,
  suggestions,
  selectedSuggestion,
  showSuggestions,
  onChange,
  onKeyDown,
  onFocus,
  onSuggestionSelect,
}) => {
  const { t } = useLanguage();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative flex-shrink-0">
      <div
        className="
          flex
          text-lg 
          sm:text-sm
          items-center
          space-x-2
          mb-2
        "
      >
        <ChevronRight
          size={16}
          className="
            text-[#A020F0]
            cyber-text-glow
            flex-shrink-0
          "
        />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          className="
            flex-1
            min-w-0
            bg-transparent
            jetbrains
            text-[#0FF4F8]
            outline-none
            caret-[#00E0FF]
            terminal-cursor
          "
          placeholder={t("terminal.inputPlaceholder")}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          inputMode="text"
        />
      </div>

      <TerminalAutocomplete
        suggestions={suggestions}
        selectedSuggestion={selectedSuggestion}
        showSuggestions={showSuggestions}
        onSelect={onSuggestionSelect}
      />
    </div>
  );
};

export default TerminalInput;