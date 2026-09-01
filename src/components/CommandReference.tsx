import type { FC } from "react";

import { motion } from "framer-motion";

import { HelpCircle } from "lucide-react";

import { CATEGORY_COLORS } from "../data/commands";

import type {
  CommandCategory,
  TerminalCommand,
} from "../types/commands";

interface CommandReferenceProps {
  commands: TerminalCommand[];

  categories: CommandCategory[];

  categoryLabels: Record<
    CommandCategory,
    string
  >;

  commandReferenceTitle: string;

  onCommand: (
    command: string
  ) => void;
}

const CommandReference: FC<
  CommandReferenceProps
> = ({
  commands,
  categories,
  categoryLabels,
  commandReferenceTitle,
  onCommand,
}) => (
  <motion.div
    className="
      w-full
      lg:w-80
      flex-shrink-0
      cyber-border
      rounded-lg
      bg-[#050508]/95
      p-1
      flex
      flex-1
      flex-col
      backdrop-blur-sm
      min-h-0
      lg:h-full
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
    {/* HEADER */}
    <h3
      className="
        orbitron
        text-2xl 
        sm:text-xl
        text-[#A020F0]
        cyber-text-glow
        mb-4
        px-3
        pt-2
        flex
        items-center
        space-x-2
        flex-shrink-0
      "
    >
      <HelpCircle size={18} />

      <span>
        {commandReferenceTitle}
      </span>
    </h3>

    {/* COMMAND LIST */}
    <div
      className="
        cyber-scroll
        overflow-y-auto
        px-4
        py-2
        flex-1
        min-h-0
      "
    >
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

          const categoryColor =
            CATEGORY_COLORS[
              category
            ];

          const categoryLabel =
            categoryLabels[
              category
            ];

          return (
            <div
              key={category}
              className="space-y-2 mb-4"
            >
              {/* CATEGORY TITLE */}
              <h4
                className="
                  jetbrains
                  text-xl 
                  sm:text-sm
                  uppercase
                  tracking-wider
                  border-b
                  border-opacity-30
                  pb-1
                "
                style={{
                  color:
                    categoryColor,
                  borderColor:
                    categoryColor,
                }}
              >
                {categoryLabel}
              </h4>

              {/* COMMANDS */}
              {categoryCommands.map(
                (command) => {
                  const Icon =
                    command.icon;

                  return (
                    <motion.button
                      type="button"
                      key={command.id}
                      onClick={() =>
                        onCommand(
                          command.name
                        )
                      }
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      variants={{
                        rest: {
                          scale: 1,
                          boxShadow:
                            "0px 0px 0px transparent",
                        },

                        hover: {
                          scale: 1.04,
                          boxShadow: `0px 0px 12px ${categoryColor}`,
                          transition: {
                            duration: 0.25,
                            ease: "easeOut",
                          },
                        },
                      }}
                      className="
                        relative
                        overflow-hidden
                        w-full
                        text-left
                        p-2
                        rounded
                        cyber-border
                        bg-[#0a0a0f]
                        transition-colors
                      "
                    >
                      {/* HOLOGRAPHIC HIGHLIGHT */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                        "
                        style={{
                          top: "-50%",
                          left: "-50%",
                          width: "200%",
                          height: "200%",
                          transform:
                            "rotate(-45deg)",
                        }}
                      >
                        <motion.div
                          className="
                            w-full
                            h-full
                          "
                          style={{
                            background: `linear-gradient(
                              180deg,
                              transparent 0%,
                              ${categoryColor} 45%,
                              transparent 90%
                            )`,
                          }}
                          variants={{
                            rest: {
                              y: "-120%",
                              opacity: 0,
                              transition: {
                                opacity: {
                                  duration:
                                    0.2,
                                },
                                y: {
                                  duration:
                                    0,
                                },
                              },
                            },

                            hover: {
                              y: "120%",
                              opacity: 0.5,
                              transition: {
                                duration:
                                  0.9,
                                ease: "easeInOut",
                              },
                            },
                          }}
                        />
                      </div>

                      {/* BUTTON CONTENT */}
                      <div
                        className="
                          relative
                          z-10
                        "
                      >
                        {/* COMMAND NAME */}
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
                                categoryColor,
                            }}
                          >
                            <Icon size={16} />
                          </div>

                          <span
                            className="
                              jetbrains
                              text-xl 
                              sm:text-sm
                            "
                            style={{
                              color:
                                categoryColor,
                            }}
                          >
                            {
                              command.name
                            }
                          </span>
                        </div>

                        {/* COMMAND DESCRIPTION */}
                        <div
                          className="
                            jetbrains
                            text-lg 
                            sm:text-sm
                            text-[#0FF4F8]
                            opacity-70
                            pl-6
                          "
                        >
                          {
                            command.description
                          }
                        </div>
                      </div>
                    </motion.button>
                  );
                }
              )}
            </div>
          );
        }
      )}
    </div>
  </motion.div>
);

export default CommandReference;
