
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ChevronRight,
  Zap,
  User,
  Briefcase,
  Mail,
  RotateCcw,
  LogOut,
  HelpCircle,
} from "lucide-react";

import { useLanguage } from "./LanguageContext";
import ElectricSpider from "./ElectricSpider";

type Screen =
  | "profile"
  | "skills"
  | "projects"
  | "contacts"
  | "boot";

interface TerminalScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Command {
  name: string;
  description: string;
  action: string | (() => void);
  icon?: React.ReactNode;
  category: string;
}

const TerminalScreen: React.FC<
  TerminalScreenProps
> = ({ onNavigate }) => {
  const { t } = useLanguage();

  // ==========================================================
  // REFS
  // ==========================================================

  /**
   * ВАЖНО:
   *
   * Этот ref НЕ висит на fullscreen-контейнере.
   *
   * Он указывает только на область самого терминала.
   *
   * Поэтому:
   *
   *  курсор СНАРУЖИ terminalWindowRef
   *      -> паук следует за курсором
   *
   *  курсор ВНУТРИ terminalWindowRef
   *      -> паук двигается самостоятельно
   */
const interfaceRef =
  useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  // ==========================================================
  // STATE
  // ==========================================================

  const [input, setInput] =
    useState("");

  const [history, setHistory] =
    useState<string[]>([
      "╔═══════════════════════════════════════════════════════════════╗",
      t("terminal.bannerLine1"),
      t("terminal.bannerLine2"),
      "╚═══════════════════════════════════════════════════════════════╝",
      "",
      t("terminal.initSuccess"),
      t("terminal.neuralEstablished"),
      t("terminal.helpHint"),
      "",
    ]);

  const [commandHistory, setCommandHistory] =
    useState<string[]>([]);

  const [historyIndex, setHistoryIndex] =
    useState(-1);

  const [suggestions, setSuggestions] =
    useState<Command[]>([]);

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const [selectedSuggestion, setSelectedSuggestion] =
    useState(0);

  // ==========================================================
  // COMMANDS
  // ==========================================================

  const commands: Command[] = [
    {
      name: t("commands.name.help"),
      description:
        t("commands.help.description"),
      action:
        t("commands.help.action"),
      icon: <HelpCircle size={16} />,
      category:
        t("commands.category.help"),
    },

    {
      name: t("commands.name.profile"),
      description:
        t("commands.profile.description"),
      action: () => onNavigate("profile"),
      icon: <User size={16} />,
      category:
        t("commands.category.navigation"),
    },

    {
      name: t("commands.name.skills"),
      description:
        t("commands.skills.description"),
      action: () => onNavigate("skills"),
      icon: <Zap size={16} />,
      category:
        t("commands.category.navigation"),
    },

    {
      name: t("commands.name.projects"),
      description:
        t("commands.projects.description"),
      action: () => onNavigate("projects"),
      icon: <Briefcase size={16} />,
      category:
        t("commands.category.navigation"),
    },

    {
      name: t("commands.name.contact"),
      description:
        t("commands.contact.description"),
      action: () => onNavigate("contacts"),
      icon: <Mail size={16} />,
      category:
        t("commands.category.navigation"),
    },

    {
      name: t("commands.name.clear"),
      description:
        t("commands.clear.description"),
      action: () =>
        setHistory([
          "╔═══════════════════════════════════════════════════════════════╗",
          t("terminal.bannerLine1"),
          t("terminal.bannerLine2"),
          "╚═══════════════════════════════════════════════════════════════╝",
          "",
        ]),
      icon: <RotateCcw size={16} />,
      category:
        t("commands.category.system"),
    },

    {
      name: t("commands.name.exit"),
      description:
        t("commands.exit.description"),
      action: () => onNavigate("boot"),
      icon: <LogOut size={16} />,
      category:
        t("commands.category.system"),
    },

    {
      name: t("commands.name.whoami"),
      description:
        t("commands.whoami.description"),
      action:
        t("commands.whoami.action"),
      icon: <User size={16} />,
      category:
        t("commands.category.info"),
    },

    {
      name: t("commands.name.status"),
      description:
        t("commands.status.description"),
      action:
        t("commands.status.action"),
      icon: <Zap size={16} />,
      category:
        t("commands.category.info"),
    },
  ];

  // ==========================================================
  // AUTOCOMPLETE
  // ==========================================================

  useEffect(() => {
    const query = input.trim().toLowerCase();

    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedSuggestion(0);
      return;
    }

    const filtered = commands.filter(
      (command) =>
        command.name
          .toLowerCase()
          .startsWith(query)
    );

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setSelectedSuggestion(0);
  }, [input]);

  // ==========================================================
  // COMMAND EXECUTION
  // ==========================================================

  const handleCommand = useCallback(
    (value: string) => {
      const command =
        value.toLowerCase().trim();

      const newHistory = [
        ...history,
        `> ${value}`,
      ];

      // ------------------------------------------------------
      // SAVE COMMAND TO HISTORY
      // ------------------------------------------------------

      if (
        command &&
        !commandHistory.includes(command)
      ) {
        setCommandHistory((prev) => [
          command,
          ...prev.slice(0, 9),
        ]);
      }

      // ------------------------------------------------------
      // FIND COMMAND
      // ------------------------------------------------------

      const foundCommand = commands.find(
        (item) => item.name === command
      );

      // ------------------------------------------------------
      // COMMAND FOUND
      // ------------------------------------------------------

      if (foundCommand) {
        if (
          typeof foundCommand.action ===
          "string"
        ) {
          newHistory.push(
            foundCommand.action,
            ""
          );

          setHistory(newHistory);
        } else {
          foundCommand.action();
          return;
        }
      }

      // ------------------------------------------------------
      // EMPTY COMMAND
      // ------------------------------------------------------

      else if (command === "") {
        newHistory.push("");
        setHistory(newHistory);
      }

      // ------------------------------------------------------
      // COMMAND NOT FOUND
      // ------------------------------------------------------

      else {
        const similarCommands =
          commands
            .filter(
              (item) =>
                item.name.includes(command) ||
                command.includes(
                  item.name.substring(0, 3)
                )
            )
            .slice(0, 3);

        newHistory.push(
          `◉ Command not found: "${command}"`,
          similarCommands.length > 0
            ? `◉ Did you mean: ${similarCommands
                .map((item) => item.name)
                .join(", ")}?`
            : '◉ Type "help" for available commands',
          ""
        );

        setHistory(newHistory);
      }

      // ------------------------------------------------------
      // RESET INPUT
      // ------------------------------------------------------

      setInput("");
      setHistoryIndex(-1);
      setShowSuggestions(false);
      setSelectedSuggestion(0);
    },
    [
      history,
      commands,
      commandHistory,
    ]
  );

  // ==========================================================
  // KEYBOARD HANDLER
  // ==========================================================

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // ------------------------------------------------------
      // ENTER
      // ------------------------------------------------------

      if (event.key === "Enter") {
        event.preventDefault();

        if (
          showSuggestions &&
          suggestions.length > 0
        ) {
          handleCommand(
            suggestions[selectedSuggestion].name
          );
        } else {
          handleCommand(input);
        }

        return;
      }

      // ------------------------------------------------------
      // TAB
      // ------------------------------------------------------

      if (event.key === "Tab") {
        event.preventDefault();

        if (suggestions.length > 0) {
          setInput(
            suggestions[selectedSuggestion].name
          );

          setShowSuggestions(false);
        }

        return;
      }

      // ------------------------------------------------------
      // ARROW UP
      // ------------------------------------------------------

      if (event.key === "ArrowUp") {
        event.preventDefault();

        // Autocomplete
        if (showSuggestions) {
          setSelectedSuggestion(
            (prev) =>
              prev > 0
                ? prev - 1
                : suggestions.length - 1
          );

          return;
        }

        // Command history
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex <
            commandHistory.length - 1
              ? historyIndex + 1
              : historyIndex;

          setHistoryIndex(newIndex);

          setInput(
            commandHistory[newIndex] || ""
          );
        }

        return;
      }

      // ------------------------------------------------------
      // ARROW DOWN
      // ------------------------------------------------------

      if (event.key === "ArrowDown") {
        event.preventDefault();

        // Autocomplete
        if (showSuggestions) {
          setSelectedSuggestion(
            (prev) =>
              prev <
              suggestions.length - 1
                ? prev + 1
                : 0
          );

          return;
        }

        // Command history
        if (historyIndex > 0) {
          const newIndex =
            historyIndex - 1;

          setHistoryIndex(newIndex);

          setInput(
            commandHistory[newIndex] || ""
          );

          return;
        }

        if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput("");
        }

        return;
      }

      // ------------------------------------------------------
      // ESCAPE
      // ------------------------------------------------------

      if (event.key === "Escape") {
        setShowSuggestions(false);
        setSelectedSuggestion(0);
      }
    },
    [
      input,
      showSuggestions,
      suggestions,
      selectedSuggestion,
      commandHistory,
      historyIndex,
      handleCommand,
    ]
  );

  // ==========================================================
  // AUTOFOCUS
  // ==========================================================

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ==========================================================
  // CATEGORY COLOR
  // ==========================================================

  const getCategoryColor = (
    category: string
  ) => {
    const navigation =
      t("commands.category.navigation");

    const info =
      t("commands.category.info");

    const system =
      t("commands.category.system");

    if (category === navigation) {
      return "#00E0FF";
    }

    if (category === info) {
      return "#A020F0";
    }

    if (category === system) {
      return "#0FF4F8";
    }

    return "#00E0FF";
  };

  // ==========================================================
  // COMMAND CATEGORIES
  // ==========================================================

  const categories = [
    t("commands.category.help"),
    t("commands.category.navigation"),
    t("commands.category.info"),
    t("commands.category.system"),
  ];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="
        fixed
        inset-0
        bg-[#0a0a0f]
        cyber-grid
        p-4
        md:p-8
        flex
        h-screen
        flex-col
        cyber-scroll
        overflow-y-auto
      "
    >
      {/* ====================================================
          ELECTRIC SPIDER
      ==================================================== */}

      <ElectricSpider
        excludedAreaRef={
          interfaceRef
        }
      />

      {/* ====================================================
          MAIN CONTENT
      ==================================================== */}

      <motion.div
        ref={interfaceRef}
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          flex-1
          flex
          overflow-hidden
          w-full
          min-h-0
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        {/* ==================================================
            TERMINAL WINDOW

            ВАЖНО:
            ref стоит именно здесь.

            Не на fullscreen-контейнере.
        ================================================== */}

        <div
          className="
            flex-1
            flex
            flex-col
            min-w-0
            min-h-0
          "
        >
          {/* ==================================================
              TERMINAL HEADER
          ================================================== */}

          <motion.div
            className="
              cyber-border
              rounded-t-lg
              bg-[#050508]/95
              p-4
              flex
              items-center
              justify-between
              backdrop-blur-sm
              flex-shrink-0
            "
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.5,
            }}
          >
            {/* ----------------------------------------------
                LEFT SIDE
            ---------------------------------------------- */}

            <div className="flex items-center space-x-4 min-w-0">
              <div className="flex space-x-2">
                <div
                  className="
                    w-3
                    h-3
                    rounded-full
                    bg-red-500
                    cyber-glow
                  "
                />

                <div
                  className="
                    w-3
                    h-3
                    rounded-full
                    bg-yellow-500
                    cyber-glow
                  "
                />

                <div
                  className="
                    w-3
                    h-3
                    rounded-full
                    bg-green-500
                    cyber-glow
                  "
                />
              </div>

              <span
                className="
                  jetbrains
                  text-[#00E0FF]
                  cyber-text-glow
                  truncate
                "
              >
                linnorm@neural-interface:~$
              </span>
            </div>

            {/* ----------------------------------------------
                RIGHT SIDE
            ---------------------------------------------- */}

            <div
              className="
                text-[#A020F0]
                jetbrains
                text-sm
                hidden
                sm:flex
                items-center
                space-x-4
                flex-shrink-0
              "
            >
              <span>
                Neural Load:{" "}
                <span className="text-[#0FF4F8]">
                  23%
                </span>
              </span>

              <span>
                Status:{" "}
                <span
                  className="
                    text-[#00ff41]
                    cyber-flicker
                  "
                >
                  ACTIVE
                </span>
              </span>
            </div>
          </motion.div>

          {/* ==================================================
              TERMINAL BODY
          ================================================== */}

          <motion.div
            className="
              cyber-border
              border-t-0
              rounded-b-lg
              bg-[#050508]/95
              p-4
              md:p-6
              flex-1
              flex
              flex-col
              overflow-hidden
              backdrop-blur-sm
              min-h-0
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.6,
              duration: 0.5,
            }}
          >
            {/* ==================================================
                HISTORY
            ================================================== */}

            <div
              className="
                flex-1
                overflow-y-auto
                space-y-1
                mb-4
                pr-2
                min-h-0
              "
            >
              {history.map(
                (line, index) => (
                  <div
                    key={`${index}-${line}`}
                    className={`
                      jetbrains
                      text-sm
                      break-words
                      ${
                        line.includes(
                          "not found"
                        )
                          ? "text-red-400"
                          : "text-[#00E0FF]"
                      }
                    `}
                  >
                    {line}
                  </div>
                )
              )}
            </div>

            {/* ==================================================
                INPUT
            ================================================== */}

            <div className="relative flex-shrink-0">
              <div
                className="
                  flex
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
                  value={input}
                  onChange={(event) =>
                    setInput(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    handleKeyDown
                  }
                  onFocus={() =>
                    setShowSuggestions(
                      input.trim().length > 0 &&
                        suggestions.length > 0
                    )
                  }
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
                  placeholder="Enter command... (TAB for autocomplete)"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              {/* ==================================================
                  AUTOCOMPLETE
              ================================================== */}

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
                        (
                          command,
                          index
                        ) => (
                          <button
                            type="button"
                            key={
                              command.name
                            }
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

                              setInput(
                                command.name
                              );

                              setShowSuggestions(
                                false
                              );

                              inputRef.current?.focus();
                            }}
                          >
                            <div
                              className="
                                flex
                                items-center
                                space-x-3
                              "
                            >
                              <div
                                style={{
                                  color:
                                    getCategoryColor(
                                      command.category
                                    ),
                                }}
                              >
                                {
                                  command.icon
                                }
                              </div>

                              <div className="min-w-0">
                                <div
                                  className="
                                    jetbrains
                                    text-sm
                                  "
                                  style={{
                                    color:
                                      getCategoryColor(
                                        command.category
                                      ),
                                  }}
                                >
                                  {
                                    command.name
                                  }
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
                        )
                      )}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ====================================================
            COMMAND REFERENCE
        ==================================================== */}

        <motion.div
            className="
            w-80
            flex-shrink-0
            ml-4
            cyber-border
            rounded-lg
            bg-[#050508]/95
            p-4
            hidden
            md:flex
            flex-col
            backdrop-blur-sm
          "
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
        >
          {/* ==================================================
              TITLE
          ================================================== */}

          <h3
            className="
              orbitron
              text-lg
              text-[#A020F0]
              cyber-text-glow
              mb-4
              flex
              items-center
              space-x-2
              flex-shrink-0
            "
          >
            <HelpCircle size={18} />

            <span>
              {t(
                "terminal.commandReference"
              )}
            </span>
          </h3>

          {/* ==================================================
              CATEGORIES
          ================================================== */}

          <div className="      
                  cyber-scroll
                  overflow-y-auto
                  pr-2
                  flex-1
                  min-h-0">
            {categories.map(
              (category) => {
                const categoryCommands =
                  commands.filter(
                    (command) =>
                      command.category ===
                      category
                  );

                if (
                  categoryCommands.length ===
                  0
                ) {
                  return null;
                }

                return (
                  <div
                    key={category}
                    className="space-y-2 mb-4"
                  >
                    {/* ----------------------------------------
                        CATEGORY TITLE
                    ---------------------------------------- */}

                    <h4
                      className="
                        jetbrains
                        text-sm
                        uppercase
                        tracking-wider
                        border-b
                        border-opacity-30
                        pb-1
                      "
                      style={{
                        color:
                          getCategoryColor(
                            category
                          ),
                        borderColor:
                          getCategoryColor(
                            category
                          ),
                      }}
                    >
                      {category}
                    </h4>

                    {/* ----------------------------------------
                        COMMANDS
                    ---------------------------------------- */}

                    {categoryCommands.map(
                      (command) => (
                        <button
                          type="button"
                          key={
                            command.name
                          }
                          onClick={() =>
                            handleCommand(
                              command.name
                            )
                          }
                          className="
                            w-full
                            text-left
                            p-2
                            rounded
                            cyber-border
                            bg-[#0a0a0f]
                            hover:bg-[#A020F0]/10
                            transition-all
                            duration-200
                          "
                        >
                          <div
                            className="
                              flex
                              items-center
                              space-x-2
                              mb-1
                            "
                          >
                            <div
                              style={{
                                color:
                                  getCategoryColor(
                                    category
                                  ),
                              }}
                            >
                              {
                                command.icon
                              }
                            </div>

                            <span
                              className="
                                jetbrains
                                text-sm
                              "
                              style={{
                                color:
                                  getCategoryColor(
                                    category
                                  ),
                              }}
                            >
                              {
                                command.name
                              }
                            </span>
                          </div>

                          <div
                            className="
                              jetbrains
                              text-xs
                              text-[#0FF4F8]
                              opacity-70
                              pl-6
                            "
                          >
                            {
                              command.description
                            }
                          </div>
                        </button>
                      )
                    )}
                  </div>
                );
              }
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TerminalScreen;

