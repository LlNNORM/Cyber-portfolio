import type { CommandCategory } from "../types/commands";
import type { TerminalCommand } from "../types/commands";

export const CATEGORY_ORDER: CommandCategory[] = [
  "help",
  "navigation",
  "info",
  "system",
];

export const CATEGORY_COLORS: Record<CommandCategory, string> = {
  help: "#00E0FF",
  navigation: "#00E0FF",
  info: "#A020F0",
  system: "#0FF4F8",
};

export const TERMINAL_PROMPT =
  "linnorm@neural-interface:~$";

import {
  Briefcase,
  HelpCircle,
  LogOut,
  Mail,
  RotateCcw,
  User,
  Zap,
} from "lucide-react";

interface CreateTerminalCommandsParams {
  t: (key: string) => string;
}

export const createTerminalCommands = ({
  t,
}: CreateTerminalCommandsParams): TerminalCommand[] => [
  {
    id: "help",
    name: t("commands.name.help"),
    description: t("commands.help.description"),
    action: {
      type: "output",
      output: t("commands.help.action"),
    },
    icon: HelpCircle,
    category: "help",
  },

  {
    id: "profile",
    name: t("commands.name.profile"),
    description: t("commands.profile.description"),
    action: {
      type: "navigate",
      screen: "profile",
    },
    icon: User,
    category: "navigation",
  },

  {
    id: "skills",
    name: t("commands.name.skills"),
    description: t("commands.skills.description"),
    action: {
      type: "navigate",
      screen: "skills",
    },
    icon: Zap,
    category: "navigation",
  },

  {
    id: "projects",
    name: t("commands.name.projects"),
    description: t("commands.projects.description"),
    action: {
      type: "navigate",
      screen: "projects",
    },
    icon: Briefcase,
    category: "navigation",
  },

  {
    id: "contact",
    name: t("commands.name.contact"),
    description: t("commands.contact.description"),
    action: {
      type: "navigate",
      screen: "contacts",
    },
    icon: Mail,
    category: "navigation",
  },

  {
    id: "clear",
    name: t("commands.name.clear"),
    description: t("commands.clear.description"),
    action: {
      type: "clear",
    },
    icon: RotateCcw,
    category: "system",
  },

  {
    id: "exit",
    name: t("commands.name.exit"),
    description: t("commands.exit.description"),
    action: {
      type: "navigate",
      screen: "boot",
    },
    icon: LogOut,
    category: "system",
  },

  {
    id: "whoami",
    name: t("commands.name.whoami"),
    description: t("commands.whoami.description"),
    action: {
      type: "output",
      output: t("commands.whoami.action"),
    },
    icon: User,
    category: "info",
  },

  {
    id: "status",
    name: t("commands.name.status"),
    description: t("commands.status.description"),
    action: {
      type: "output",
      output: t("commands.status.action"),
    },
    icon: Zap,
    category: "info",
  },
];