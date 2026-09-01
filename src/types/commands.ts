import type { LucideIcon } from "lucide-react";

export type Screen =
  | "profile"
  | "skills"
  | "projects"
  | "contacts"
  | "boot";

export type CommandCategory =
  | "help"
  | "navigation"
  | "info"
  | "system";

export type CommandAction =
  | {
      type: "output";
      output: string;
    }
  | {
      type: "navigate";
      screen: Screen;
    }
  | {
      type: "clear";
    };

export interface TerminalCommand {
  id: string;
  name: string;
  description: string;
  category: CommandCategory;
  icon: LucideIcon;
  action: CommandAction;
}