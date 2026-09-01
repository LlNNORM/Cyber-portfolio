import type { FC } from "react";

import {
  TERMINAL_PROMPT,
} from "../data/commands";

const TerminalHeader: FC = () => (
  <div
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
  >
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
        {TERMINAL_PROMPT}
      </span>
    </div>

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
  </div>
);

export default TerminalHeader;