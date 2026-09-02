import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";

import type { Screen, TerminalCommand } from "../types/commands";

interface UseTerminalParams {
  commands: TerminalCommand[];
  initialHistory: string[];
  inputRef: RefObject<HTMLInputElement | null>;
  onNavigate: (screen: Screen) => void;
}

interface UseTerminalReturn {
  input: string;
  history: string[];
  suggestions: TerminalCommand[];
  showSuggestions: boolean;
  selectedSuggestion: number;

  setInputValue: (value: string) => void;
  handleCommand: (value: string) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  handleInputFocus: () => void;
  handleSuggestionSelect: (command: TerminalCommand) => void;
}

const MAX_COMMAND_HISTORY = 10;

export const useTerminal = ({
  commands,
  initialHistory,
  inputRef,
  onNavigate,
}: UseTerminalParams): UseTerminalReturn => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(initialHistory);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);

  // ==========================================================
  // AUTOCOMPLETE
  // ==========================================================

  const suggestions = useMemo(() => {
    const query = input.trim().toLowerCase();
    if (!query) return [];

    return commands.filter((command) =>
      command.name.toLowerCase().startsWith(query)
    );
  }, [commands, input]);

  // Сброс выбранной подсказки при изменении списка предложений
  useEffect(() => {
    if (selectedSuggestion >= suggestions.length) {
      setSelectedSuggestion(0);
    }
  }, [selectedSuggestion, suggestions.length]);

  useEffect(() => {
    if (suggestions.length === 0) {
      setShowSuggestions(false);
    }
  }, [suggestions.length]);

  // ==========================================================
  // RESET
  // ==========================================================

  const resetInputState = useCallback(() => {
    setInput("");
    setHistoryIndex(-1);
    setShowSuggestions(false);
    setSelectedSuggestion(0);
  }, []);

  // ==========================================================
  // CLEAR TERMINAL
  // ==========================================================

  const clearTerminal = useCallback(() => {
    setHistory(initialHistory);
    resetInputState();
  }, [initialHistory, resetInputState]);

  // ==========================================================
  // APPEND HISTORY
  // ==========================================================

  const appendHistory = useCallback((...lines: string[]) => {
    setHistory((prev) => [...prev, ...lines]);
  }, []);

  // ==========================================================
  // SAVE COMMAND HISTORY
  // ==========================================================

  const saveCommandToHistory = useCallback((command: string) => {
    if (!command) return;

    setCommandHistory((prev) => {
      // Перемещаем команду наверх, если она уже есть в истории
      const filtered = prev.filter((item) => item !== command);
      return [command, ...filtered].slice(0, MAX_COMMAND_HISTORY);
    });
  }, []);

  // ==========================================================
  // EXECUTE COMMAND
  // ==========================================================

  const executeCommand = useCallback(
    (command: TerminalCommand) => {
      switch (command.action.type) {
        case "output":
          appendHistory(
            `> ${command.name}`,
            command.action.output,
            ""
          );
          return;

        case "navigate":
          onNavigate(command.action.screen);
          return;

        case "clear":
          clearTerminal();
          return;
      }
    },
    [appendHistory, clearTerminal, onNavigate]
  );

  // ==========================================================
  // COMMAND HANDLER
  // ==========================================================

  const handleCommand = useCallback(
    (value: string) => {
      const command = value.toLowerCase().trim();

      saveCommandToHistory(command);

      const foundCommand = commands.find(
        (item) => item.name.toLowerCase() === command
      );

      // COMMAND FOUND
      if (foundCommand) {
        executeCommand(foundCommand);
        resetInputState();
        return;
      }

      // EMPTY COMMAND
      if (command === "") {
        appendHistory(`> ${value}`, "");
        resetInputState();
        return;
      }

      // COMMAND NOT FOUND
      const similarCommands = commands
        .filter(
          (item) =>
            item.name.toLowerCase().includes(command) ||
            command.includes(item.name.toLowerCase().slice(0, 3))
        )
        .slice(0, 3);

      appendHistory(
        `> ${value}`,
        `◉ Command not found: "${command}"`,
        similarCommands.length > 0
          ? `◉ Did you mean: ${similarCommands
              .map((item) => item.name)
              .join(", ")}?`
          : '◉ Type "help" for available commands',
        ""
      );

      resetInputState();
    },
    [
      appendHistory,
      commands,
      executeCommand,
      resetInputState,
      saveCommandToHistory,
    ]
  );

  // ==========================================================
  // INPUT
  // ==========================================================

  const setInputValue = useCallback((value: string) => {
    setInput(value);
    setHistoryIndex(-1);
    setSelectedSuggestion(0);
    setShowSuggestions(value.trim().length > 0);
  }, []);

  // ==========================================================
  // INPUT FOCUS
  // ==========================================================

  const handleInputFocus = useCallback(() => {
    setShowSuggestions(
      input.trim().length > 0 && suggestions.length > 0
    );
  }, [input, suggestions.length]);

  // ==========================================================
  // SELECT AUTOCOMPLETE
  // ==========================================================

  const handleSuggestionSelect = useCallback((command: TerminalCommand) => {
    setInput(command.name);
    setHistoryIndex(-1);
    setSelectedSuggestion(0);
    setShowSuggestions(false);
  }, []);

  // ==========================================================
  // KEYBOARD
  // ==========================================================

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // ENTER
      if (event.key === "Enter") {
        event.preventDefault();

        const valueToExecute =
          showSuggestions && suggestions.length > 0
            ? suggestions[selectedSuggestion]?.name ?? input
            : input;

        handleCommand(valueToExecute);
        return;
      }

      // TAB
      if (event.key === "Tab") {
        event.preventDefault();

        const suggestion = suggestions[selectedSuggestion];
        if (suggestion) {
          handleSuggestionSelect(suggestion);
        }
        return;
      }

      // ARROW UP
      if (event.key === "ArrowUp") {
        event.preventDefault();

        // Autocomplete Navigation
        if (showSuggestions && suggestions.length > 0) {
          setSelectedSuggestion((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          return;
        }

        // Command History Navigation
        if (commandHistory.length === 0) return;

        const nextIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;

        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex] ?? "");
        return;
      }

      // ARROW DOWN
      if (event.key === "ArrowDown") {
        event.preventDefault();

        // Autocomplete Navigation
        if (showSuggestions && suggestions.length > 0) {
          setSelectedSuggestion((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          return;
        }

        // Command History Navigation
        if (historyIndex > 0) {
          const nextIndex = historyIndex - 1;
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex] ?? "");
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput("");
        }
        return;
      }

      // ESCAPE
      if (event.key === "Escape") {
        setShowSuggestions(false);
        setSelectedSuggestion(0);
      }
    },
    [
      commandHistory,
      handleCommand,
      handleSuggestionSelect,
      historyIndex,
      input,
      selectedSuggestion,
      showSuggestions,
      suggestions,
    ]
  );

  // ==========================================================
  // AUTOFOCUS
  // ==========================================================

useEffect(() => {
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (!isTouchDevice) {
    inputRef.current?.focus();
  }
}, [inputRef]);

  return {
    input,
    history,
    suggestions,
    showSuggestions,
    selectedSuggestion,
    setInputValue,
    handleCommand,
    handleKeyDown,
    handleInputFocus,
    handleSuggestionSelect,
  };
};