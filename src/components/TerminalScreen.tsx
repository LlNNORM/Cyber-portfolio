import { useMemo, useRef } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "./LanguageContext";
import ElectricSpider from "./ElectricSpider";
import CommandReference from "./CommandReference";
import TerminalHeader from "./TerminalHeader";
import TerminalHistory from "./TerminalHistory";
import TerminalInput from "./TerminalInput";

import {
  createTerminalCommands,
  CATEGORY_ORDER,
} from "../data/commands";

import { useTerminal } from "./useTerminal";

import type {
  CommandCategory,
  Screen,
} from "../types/commands";

interface TerminalScreenProps {
  onNavigate: (
    screen: Screen
  ) => void;
}

const TerminalScreen: FC<
  TerminalScreenProps
> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const interfaceRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  /*
   * INITIAL TERMINAL HISTORY
   */
  const initialHistory = useMemo(
    () => [
      "╔═══════════════════════════════════════════╗",
      t("terminal.bannerLine1"),
      t("terminal.bannerLine2"),
      "╚═══════════════════════════════════════════╝",
      "",
      t("terminal.initSuccess"),
      t("terminal.neuralEstablished"),
      t("terminal.helpHint"),
      "",
    ],
    [t]
  );

  /*
   * TERMINAL COMMANDS
   */
  const commands = useMemo(
    () =>
      createTerminalCommands({
        t,
      }),
    [t]
  );

  /*
   * TERMINAL LOGIC
   */
  const terminal = useTerminal({
    commands,
    initialHistory,
    inputRef,
    onNavigate,
  });

  /*
   * CATEGORY LABELS
   */
  const categoryLabels: Record<
    CommandCategory,
    string
  > = {
    help: t(
      "commands.category.help"
    ),

    navigation: t(
      "commands.category.navigation"
    ),

    info: t(
      "commands.category.info"
    ),

    system: t(
      "commands.category.system"
    ),
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-[#0a0a0f]
        cyber-grid
        p-2
        sm:p-4
        md:p-8
        flex
        h-[100dvh]
        flex-col
        cyber-scroll
        overflow-y-auto
        lg:overflow-hidden
      "
    >
      {/* 
        ELECTRIC SPIDER
        Hidden on mobile
      */}
      <div className="hidden md:block">
        <ElectricSpider
          excludedAreaRef={
            interfaceRef
          }
        />
      </div>

      {/*
        MAIN INTERFACE

        MOBILE:
        terminal
        ↓
        command reference

        DESKTOP:
        terminal | command reference
      */}
      <motion.div
        ref={interfaceRef}
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          flex
          flex-col
          lg:flex-row
          gap-4
          w-full
          lg:flex-1
          min-h-0
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        {/* ========================================
            TERMINAL
        ======================================== */}
        <div
          className="
            flex
            flex-col
            min-w-0

            h-[350px]
            sm:h-[550px]

            lg:h-auto
            lg:flex-1
            lg:min-h-0
          "
        >
          {/* TERMINAL HEADER */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.4,
            }}
          >
            <TerminalHeader />
          </motion.div>

          {/* TERMINAL BODY */}
          <motion.div
            className="
              cyber-border
              border-t-0
              rounded-b-lg
              bg-[#050508]/95

              p-3
              sm:p-4
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
              delay: 0.4,
              duration: 0.4,
            }}
          >
            {/* TERMINAL HISTORY */}
            <TerminalHistory
              history={
                terminal.history
              }
            />

            {/* TERMINAL INPUT */}
            <TerminalInput
              inputRef={inputRef}
              value={terminal.input}
              suggestions={
                terminal.suggestions
              }
              selectedSuggestion={
                terminal.selectedSuggestion
              }
              showSuggestions={
                terminal.showSuggestions
              }
              onChange={
                terminal.setInputValue
              }
              onKeyDown={
                terminal.handleKeyDown
              }
              onFocus={
                terminal.handleInputFocus
              }
              onSuggestionSelect={
                terminal.handleSuggestionSelect
              }
            />
          </motion.div>
        </div>

        {/* ========================================
            COMMAND REFERENCE
        ======================================== */}
        <div
          className="
            w-full
            lg:w-80
            flex-shrink-0

            h-[350px]
            lg:h-auto
            lg:min-h-0
          "
        >
          <CommandReference
            commands={commands}
            categories={CATEGORY_ORDER}
            categoryLabels={
              categoryLabels
            }
            commandReferenceTitle={t(
              "terminal.commandReference"
            )}
            onCommand={
              terminal.handleCommand
            }
          />
        </div>
      </motion.div>
    </div>
  );
};

export default TerminalScreen;
