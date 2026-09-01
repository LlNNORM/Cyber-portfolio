import type { FC } from "react";

interface TerminalHistoryProps {
  history: string[];
}

const TerminalHistory: FC<
  TerminalHistoryProps
> = ({ history }) => (
  <div
    className="
      flex-1
      overflow-y-auto
      space-y-1
      mb-4
      pr-2
      min-h-0
      cyber-scroll
    "
  >
    {history.map(
      (line, index) => (
        <div
          key={`${index}-${line}`}
          className={`
            jetbrains
            text-lg 
            sm:text-sm
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
);

export default TerminalHistory;