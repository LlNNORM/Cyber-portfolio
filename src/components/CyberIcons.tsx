import React from 'react';
import { motion } from 'framer-motion';

interface CyberIconProps {
  size?: number;
  color?: string;
  isHovered?: boolean;
}

/* =========================================================
   EXPERIENCE
   Neural / Energy Core
   ========================================================= */

export const ExperienceIcon: React.FC<CyberIconProps> = ({
  size = 48,
  color = '#A020F0',
  isHovered = false,
}) => {
  return (
    <motion.svg
      initial={false}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      animate={{
        filter: isHovered
          ? [
              'drop-shadow(0 0 2px currentColor)',
              'drop-shadow(0 0 10px currentColor)',
              'drop-shadow(0 0 3px currentColor)',
            ]
          : 'drop-shadow(0 0 0px currentColor)',
      }}
      transition={{
        duration: 1.2,
        repeat: isHovered ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      {/* Outer frame */}

      <motion.path
        initial={false}
        d="M24 3L41 13V35L24 45L7 35V13L24 3Z"
        stroke={color}
        strokeWidth="1.5"
        opacity={isHovered ? 0.9 : 0.5}
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 6,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
        }}
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* Inner energy core */}

      <motion.path
        initial={false}
        d="M27 7L15 25H23L21 41L34 21H26L27 7Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        fill="rgba(160,32,240,0.08)"
        animate={{
          scale: isHovered ? [0.9, 1.08, 0.9] : 1,
          opacity: isHovered ? [0.65, 1, 0.65] : 0.75,
        }}
        transition={{
          duration: 1.1,
          repeat: isHovered ? Infinity : 0,
          ease: 'easeInOut',
        }}
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* Energy lines */}

      <motion.path
        initial={false}
        d="M3 19H9"
        stroke={color}
        strokeWidth="1"
        animate={{
          x: isHovered ? [-1, 2, -1] : 0,
          opacity: isHovered ? [0.2, 1, 0.2] : 0.45,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.path
        initial={false}
        d="M39 19H45"
        stroke={color}
        strokeWidth="1"
        animate={{
          x: isHovered ? [1, -2, 1] : 0,
          opacity: isHovered ? [0.2, 1, 0.2] : 0.45,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
          delay: 0.1,
        }}
      />

      <motion.path
        initial={false}
        d="M3 29H9"
        stroke={color}
        strokeWidth="1"
        animate={{
          x: isHovered ? [-1, 2, -1] : 0,
          opacity: isHovered ? [0.2, 1, 0.2] : 0.45,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
          delay: 0.2,
        }}
      />

      <motion.path
        initial={false}
        d="M39 29H45"
        stroke={color}
        strokeWidth="1"
        animate={{
          x: isHovered ? [1, -2, 1] : 0,
          opacity: isHovered ? [0.2, 1, 0.2] : 0.45,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
          delay: 0.3,
        }}
      />
    </motion.svg>
  );
};


/* =========================================================
   PROJECTS
   Cyber Terminal
   ========================================================= */

export const ProjectsIcon: React.FC<CyberIconProps> = ({
  size = 48,
  color = '#00E0FF',
  isHovered = false,
}) => {
  return (
    <motion.svg
      initial={false}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      animate={{
        filter: isHovered
          ? [
              'drop-shadow(0 0 2px currentColor)',
              'drop-shadow(0 0 9px currentColor)',
              'drop-shadow(0 0 2px currentColor)',
            ]
          : 'drop-shadow(0 0 0px currentColor)',
      }}
      transition={{
        duration: 1.4,
        repeat: isHovered ? Infinity : 0,
      }}
    >
      {/* Terminal frame */}

      <rect
        x="5"
        y="7"
        width="38"
        height="34"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Header */}

      <path
        d="M5 15H43"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Header indicators */}

      <circle
        cx="10"
        cy="11"
        r="1"
        fill={color}
      />

      <circle
        cx="14"
        cy="11"
        r="1"
        fill={color}
        opacity="0.6"
      />

      <circle
        cx="18"
        cy="11"
        r="1"
        fill={color}
        opacity="0.3"
      />

      {/* Command */}

      <motion.path
        initial={false}
        d="M11 23L16 27L11 31"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        animate={{
          x: isHovered ? [0, 3, 0] : 0,
          opacity: isHovered ? [0.5, 1, 0.5] : 0.8,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      {/* Cursor */}

      <motion.path
        initial={false}
        d="M21 31H35"
        stroke={color}
        strokeWidth="2"
        animate={{
          opacity: isHovered ? [1, 0, 1] : 0.7,
          scaleX: isHovered ? [1, 0.5, 1] : 1,
        }}
        transition={{
          duration: 0.7,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          transformOrigin: 'left center',
        }}
      />

      {/* Scan line */}

      <motion.path
        initial={false}
        d="M7 18H41"
        stroke={color}
        strokeWidth="0.5"
        opacity={isHovered ? 0.35 : 0}
        animate={{
          y: isHovered ? [0, 19, 0] : 0,
        }}
        transition={{
          duration: 1.8,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
        }}
      />
    </motion.svg>
  );
};


/* =========================================================
   ENERGY / COFFEE
   Reactor Core
   ========================================================= */


export const EnergyIcon: React.FC<CyberIconProps> = ({
  size = 48,
  color = '#00E0FF',
  isHovered = false,
}) => {
  return (
    <motion.svg
      initial={false}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      animate={{
        filter: isHovered
          ? [
              'drop-shadow(0 0 2px currentColor)',
              'drop-shadow(0 0 10px currentColor)',
              'drop-shadow(0 0 3px currentColor)',
            ]
          : 'drop-shadow(0 0 0px currentColor)',
      }}
      transition={{
        duration: 1.2,
        repeat: isHovered ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      {/* Steam */}

      <motion.path
        initial={false}
        d="M17 14C14 11 18 8 16 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{
          y: isHovered ? [-1, -5, -1] : 0,
          opacity: isHovered ? [0.2, 1, 0.2] : 0.45,
        }}
        transition={{
          duration: 1.4,
          repeat: isHovered ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      <motion.path
        initial={false}
        d="M24 13C21 10 25 7 23 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{
          y: isHovered ? [-1, -6, -1] : 0,
          opacity: isHovered ? [0.2, 1, 0.2] : 0.4,
        }}
        transition={{
          duration: 1.2,
          repeat: isHovered ? Infinity : 0,
          delay: 0.15,
          ease: 'easeInOut',
        }}
      />

      <motion.path
        initial={false}
        d="M31 14C28 11 32 8 30 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{
          y: isHovered ? [-1, -4, -1] : 0,
          opacity: isHovered ? [0.2, 1, 0.2] : 0.35,
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          delay: 0.3,
          ease: 'easeInOut',
        }}
      />

      {/* Cup */}

      <motion.path
        d="M9 17H34V30C34 35 30 38 24 38H19C13 38 9 35 9 30V17Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        animate={{
          y: isHovered ? [0, -1, 0] : 0,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Coffee surface */}

      <motion.path
        initial={false}
        d="M10 20H33"
        stroke={color}
        strokeWidth="1.5"
        animate={{
          opacity: isHovered ? [0.4, 1, 0.4] : 0.7,
        }}
        transition={{
          duration: 0.9,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      {/* Handle */}

      <motion.path
        d="M34 21H37C40 21 41 23 41 26C41 29 39 31 34 31"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={{
          scale: isHovered ? [1, 1.04, 1] : 1,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          transformOrigin: '34px 26px',
        }}
      />

      {/* Cyber lines on cup */}

      <motion.path
        d="M14 26H29"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
        animate={{
          x: isHovered ? [0, 3, 0] : 0,
          opacity: isHovered ? [0.2, 0.8, 0.2] : 0.5,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.path
        d="M14 30H25"
        stroke={color}
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Energy pulse */}

      <motion.circle
        initial={false}
        cx="21"
        cy="26"
        r="1.5"
        fill={color}
        animate={{
          scale: isHovered ? [0.5, 1.5, 0.5] : 1,
          opacity: isHovered ? [0.3, 1, 0.3] : 0.6,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      {/* Bottom status line */}

      <motion.path
        d="M14 41H34"
        stroke={color}
        strokeWidth="1"
        animate={{
          pathLength: isHovered ? [0.2, 1, 0.2] : 0.6,
        }}
        transition={{
          duration: 1.2,
          repeat: isHovered ? Infinity : 0,
        }}
      />
    </motion.svg>
  );
};


/* =========================================================
   BUGS
   Glitch Entity
   ========================================================= */

export const BugsIcon: React.FC<CyberIconProps> = ({
  size = 48,
  color = '#FF2BD6',
  isHovered = false,
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
    >
      {/* =====================================================
          GROUND SHADOW
      ===================================================== */}

      <motion.ellipse
        initial={false}
        cx="24"
        cy="39.5"
        rx="8"
        ry="1.3"
        fill={color}
        animate={{
          scaleX: isHovered
            ? [1, 0.92, 1.04, 1]
            : 1,
          opacity: isHovered
            ? [0.08, 0.14, 0.08, 0.1]
            : 0.08,
        }}
        transition={{
          duration: 0.55,
          repeat: isHovered ? Infinity : 0,
          ease: 'easeInOut',
        }}
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* =====================================================
          BUG
      ===================================================== */}

      <motion.g
        animate={{
          x: isHovered
            ? [0, 0.2, 0, -0.2, 0]
            : 0,
          y: isHovered
            ? [0, -0.16, 0, -0.1, 0]
            : 0,
        }}
        transition={{
          duration: 0.55,
          repeat: isHovered ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >

        {/* =================================================
            BODY
        ================================================= */}

        <ellipse
          cx="24"
          cy="27"
          rx="6.5"
          ry="8.5"
          fill="#0a0a0f"
          stroke={color}
          strokeWidth="1.5"
        />

        {/* Body segments */}

        <path
          d="M18.5 23.5H29.5"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.55"
        />

        <path
          d="M17.7 27.5H30.3"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.45"
        />

        <path
          d="M18.5 31H29.5"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.35"
        />

        {/* =================================================
            HEAD
        ================================================= */}

        <circle
          cx="24"
          cy="17"
          r="4.8"
          fill="#0a0a0f"
          stroke={color}
          strokeWidth="1.5"
        />

        {/* Eyes */}

        <motion.circle
          initial={false}
          cx="22.2"
          cy="16.1"
          r="0.8"
          fill={color}
          animate={{
            opacity: isHovered
              ? [0.7, 1, 0.7]
              : 0.85,
          }}
          transition={{
            duration: 0.55,
            repeat: isHovered ? Infinity : 0,
          }}
        />

        <motion.circle
          initial={false}
          cx="25.8"
          cy="16.1"
          r="0.8"
          fill={color}
          animate={{
            opacity: isHovered
              ? [1, 0.7, 1]
              : 0.85,
          }}
          transition={{
            duration: 0.55,
            repeat: isHovered ? Infinity : 0,
            delay: 0.08,
          }}
        />

        {/* =================================================
            ANTENNAE
        ================================================= */}

        <motion.path
          d="M21.2 13L19 9.5"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
          animate={{
            rotate: isHovered
              ? [-3, 3, -3]
              : 0,
          }}
          transition={{
            duration: 0.65,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: '21.2px 13px',
          }}
        />

        <motion.path
          d="M26.8 13L29 9.5"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
          animate={{
            rotate: isHovered
              ? [3, -3, 3]
              : 0,
          }}
          transition={{
            duration: 0.65,
            repeat: isHovered ? Infinity : 0,
            delay: 0.05,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: '26.8px 13px',
          }}
        />

        {/* =================================================
            LEFT FRONT LEG

            Fixed:
            M19 23 -> M14.5 21.5

            Moving:
            M14.5 21.5 -> M11 23.5
        ================================================= */}

        <path
          d="M19 23L14.5 21.5"
          stroke={color}
          strokeWidth="1.35"
          strokeLinecap="round"
        />

        <motion.g
          animate={{
            rotate: isHovered
              ? [-9, 9, -9]
              : 0,
          }}
          transition={{
            duration: 0.38,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: '14.5px 21.5px',
          }}
        >
          <path
            d="M14.5 21.5L11 23.5"
            stroke={color}
            strokeWidth="1.35"
            strokeLinecap="round"
          />

          <path
            d="M11 23.5L9.5 24.2"
            stroke={color}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </motion.g>

        {/* =================================================
            LEFT MIDDLE LEG
        ================================================= */}

        <path
          d="M18 27L13 27"
          stroke={color}
          strokeWidth="1.35"
          strokeLinecap="round"
        />

        <motion.g
          animate={{
            rotate: isHovered
              ? [9, -9, 9]
              : 0,
          }}
          transition={{
            duration: 0.38,
            repeat: isHovered ? Infinity : 0,
            delay: 0.10,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: '13px 27px',
          }}
        >
          <path
            d="M13 27L9.5 29"
            stroke={color}
            strokeWidth="1.35"
            strokeLinecap="round"
          />

          <path
            d="M9.5 29L8 30"
            stroke={color}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </motion.g>

        {/* =================================================
            LEFT REAR LEG
        ================================================= */}

        <path
          d="M19 31L14.5 33.5"
          stroke={color}
          strokeWidth="1.35"
          strokeLinecap="round"
        />

        <motion.g
          animate={{
            rotate: isHovered
              ? [-9, 9, -9]
              : 0,
          }}
          transition={{
            duration: 0.38,
            repeat: isHovered ? Infinity : 0,
            delay: 0.20,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: '14.5px 33.5px',
          }}
        >
          <path
            d="M14.5 33.5L12 36"
            stroke={color}
            strokeWidth="1.35"
            strokeLinecap="round"
          />

          <path
            d="M12 36L11 37"
            stroke={color}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </motion.g>

        {/* =================================================
            RIGHT FRONT LEG
        ================================================= */}

        <path
          d="M29 23L33.5 21.5"
          stroke={color}
          strokeWidth="1.35"
          strokeLinecap="round"
        />

        <motion.g
          animate={{
            rotate: isHovered
              ? [9, -9, 9]
              : 0,
          }}
          transition={{
            duration: 0.38,
            repeat: isHovered ? Infinity : 0,
            delay: 0.05,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: '33.5px 21.5px',
          }}
        >
          <path
            d="M33.5 21.5L37 23.5"
            stroke={color}
            strokeWidth="1.35"
            strokeLinecap="round"
          />

          <path
            d="M37 23.5L38.5 24.2"
            stroke={color}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </motion.g>

        {/* =================================================
            RIGHT MIDDLE LEG
        ================================================= */}

        <path
          d="M30 27L35 27"
          stroke={color}
          strokeWidth="1.35"
          strokeLinecap="round"
        />

        <motion.g
          animate={{
            rotate: isHovered
              ? [-9, 9, -9]
              : 0,
          }}
          transition={{
            duration: 0.38,
            repeat: isHovered ? Infinity : 0,
            delay: 0.15,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: '35px 27px',
          }}
        >
          <path
            d="M35 27L38.5 29"
            stroke={color}
            strokeWidth="1.35"
            strokeLinecap="round"
          />

          <path
            d="M38.5 29L40 30"
            stroke={color}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </motion.g>

        {/* =================================================
            RIGHT REAR LEG
        ================================================= */}

        <path
          d="M29 31L33.5 33.5"
          stroke={color}
          strokeWidth="1.35"
          strokeLinecap="round"
        />

        <motion.g
          animate={{
            rotate: isHovered
              ? [9, -9, 9]
              : 0,
          }}
          transition={{
            duration: 0.38,
            repeat: isHovered ? Infinity : 0,
            delay: 0.25,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: '33.5px 33.5px',
          }}
        >
          <path
            d="M33.5 33.5L36 36"
            stroke={color}
            strokeWidth="1.35"
            strokeLinecap="round"
          />

          <path
            d="M36 36L37 37"
            stroke={color}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </motion.g>
      </motion.g>


      {/* =====================================================
          GLASS JAR
      ===================================================== */}

      <motion.g
        initial={false}
        animate={{
          y: isHovered ? 0 : -31,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          duration: isHovered ? 0.58 : 0.25,
          delay: isHovered ? 1.1 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Glass body */}

        <path
          d="
            M7 7
            H41
            V33
            C41 38 35.5 41
            24 41
            C12.5 41 7 38 7 33
            V7
            Z
          "
          fill="rgba(0,224,255,0.035)"
          stroke="#00E0FF"
          strokeWidth="1.3"
        />

        {/* Inner glass edge */}

        <path
          d="
            M9.5 10
            V32
            C9.5 35.5 14.5 38.5 24 38.5
            C33.5 38.5 38.5 35.5 38.5 32
            V10
          "
          stroke="#00E0FF"
          strokeWidth="0.55"
          opacity="0.18"
        />

        {/* Bottom reflection */}

        <path
          d="
            M11 36
            C14.5 38.2 19 39
            24 39
            C29 39 33.5 38.2 37 36
          "
          stroke="#00E0FF"
          strokeWidth="0.8"
          opacity="0.45"
        />

        {/* Neck */}

        <path
          d="M11 5H37V9H11V5Z"
          fill="#0a0a0f"
          stroke="#00E0FF"
          strokeWidth="1.2"
        />

        {/* Cap */}

        <rect
          x="9"
          y="3"
          width="30"
          height="3"
          rx="1"
          fill="#0a0a0f"
          stroke="#00E0FF"
          strokeWidth="1.2"
        />

        {/* Glass highlight */}

        <motion.path
          initial={false}
          d="M11 12V31"
          stroke="#00E0FF"
          strokeWidth="1"
          animate={{
            opacity: isHovered
              ? [0.18, 0.55, 0.18]
              : 0.25,
          }}
          transition={{
            duration: 1.4,
            repeat: isHovered ? Infinity : 0,
          }}
        />

        <path
          d="M36 12V24"
          stroke="#00E0FF"
          strokeWidth="0.7"
          opacity="0.2"
        />

        {/* Status indicator */}

        <motion.circle
          initial={false}
          cx="32"
          cy="12"
          r="1"
          fill="#00FF41"
          animate={{
            opacity: isHovered
              ? [0.3, 1, 0.3]
              : 0.5,
          }}
          transition={{
            duration: 0.7,
            repeat: isHovered ? Infinity : 0,
          }}
        />

        <path
          d="M26 12H29"
          stroke="#00E0FF"
          strokeWidth="0.8"
          opacity="0.45"
        />

        {/* Captured status line */}

        <motion.path
          initial={false}
          d="M15 34H33"
          stroke="#00FF41"
          strokeWidth="0.7"
          animate={{
            opacity: isHovered
              ? [0.15, 0.5, 0.15]
              : 0,
          }}
          transition={{
            duration: 1,
            repeat: isHovered ? Infinity : 0,
          }}
        />
      </motion.g>


      {/* =====================================================
          CAPTURE PULSE
      ===================================================== */}

      <motion.circle
        initial={false}
        cx="24"
        cy="25"
        r="10"
        fill="none"
        stroke="#00FF41"
        strokeWidth="0.7"
        animate={{
          scale: isHovered
            ? [0.5, 1.45]
            : 0.5,
          opacity: isHovered
            ? [0.6, 0]
            : 0,
        }}
        transition={{
          duration: 0.7,
          delay: isHovered ? 1.58 : 0,
          ease: 'easeOut',
          repeat: isHovered ? 1 : 0,
        }}
      />


      {/* =====================================================
          CAPTURE CONFIRMATION
      ===================================================== */}

      <motion.g
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.4,
        }}
        transition={{
          duration: 0.35,
          delay: isHovered ? 1.63 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: '24px 25px',
        }}
      >
        <circle
          cx="24"
          cy="25"
          r="4"
          fill="#0a0a0f"
          stroke="#00FF41"
          strokeWidth="1.2"
        />

        <motion.path
          d="M22 25L23.5 26.5L27 23"
          stroke="#00FF41"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            pathLength: isHovered ? [0, 1] : 0,
          }}
          transition={{
            duration: 0.3,
            delay: isHovered ? 1.7 : 0,
          }}
        />
      </motion.g>
    </motion.svg>
  );
};
/* =========================================================
   REACT
   ========================================================= */

export const ReactIcon: React.FC<CyberIconProps> = ({
  size = 48,
  color = '#61DAFB',
  isHovered = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        color,
        filter: `drop-shadow(0 0 3px ${color})`,
      }}
    >
      {/* =================================================
          ORBIT 1
      ================================================= */}

      <motion.ellipse
        initial={false}
        cx="24"
        cy="24"
        rx="20"
        ry="8"
        stroke={color}
        strokeWidth="1.5"
        animate={
          isHovered
            ? {
                rotate: 360,
              }
            : {
                rotate: 0,
              }
        }
        transition={
          isHovered
            ? {
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }
            : {
                duration: 0.25,
                ease: 'easeOut',
              }
        }
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* =================================================
          ORBIT 2
      ================================================= */}

      <motion.ellipse
        initial={false}
        cx="24"
        cy="24"
        rx="20"
        ry="8"
        stroke={color}
        strokeWidth="1.5"
        transform="rotate(60 24 24)"
        animate={
          isHovered
            ? {
                rotate: 420,
              }
            : {
                rotate: 60,
              }
        }
        transition={
          isHovered
            ? {
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }
            : {
                duration: 0.25,
                ease: 'easeOut',
              }
        }
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* =================================================
          ORBIT 3
      ================================================= */}

      <motion.ellipse
        initial={false}
        cx="24"
        cy="24"
        rx="20"
        ry="8"
        stroke={color}
        strokeWidth="1.5"
        transform="rotate(-60 24 24)"
        animate={
          isHovered
            ? {
                rotate: 300,
              }
            : {
                rotate: -60,
              }
        }
        transition={
          isHovered
            ? {
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }
            : {
                duration: 0.25,
                ease: 'easeOut',
              }
        }
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* =================================================
          CORE
      ================================================= */}

      <motion.circle
        initial={false}
        cx="24"
        cy="24"
        r="4"
        fill={color}
        animate={
          isHovered
            ? {
                scale: [0.8, 1.3, 0.8],
                opacity: [0.6, 1, 0.6],
              }
            : {
                scale: 1,
                opacity: 0.85,
              }
        }
        transition={
          isHovered
            ? {
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {
                duration: 0.2,
              }
        }
        style={{
          transformOrigin: 'center',
        }}
      />
    </svg>
  );
};


/* =========================================================
   TYPESCRIPT
   ========================================================= */

export const TypeScriptIcon: React.FC<CyberIconProps> = ({
  size = 48,
  color = '#3178C6',
  isHovered = false,
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      animate={{
        filter: isHovered
          ? [
              'drop-shadow(0 0 2px currentColor)',
              'drop-shadow(0 0 10px currentColor)',
              'drop-shadow(0 0 2px currentColor)',
            ]
          : 'drop-shadow(0 0 0px currentColor)',
      }}
      transition={{
        duration: 1.4,
        repeat: isHovered ? Infinity : 0,
      }}
    >
      {/* Main module */}

      <rect
        x="5"
        y="5"
        width="38"
        height="38"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Inner frame */}

      <motion.rect
        initial={false}
        x="9"
        y="9"
        width="30"
        height="30"
        stroke={color}
        strokeWidth="0.7"
        opacity={isHovered ? 0.7 : 0.3}
        animate={{
          rotate: isHovered ? 90 : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
        }}
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* TS */}

      <text
        x="9"
        y="33"
        fill={color}
        fontSize="17"
        fontWeight="700"
        fontFamily="monospace"
      >
        TS
      </text>

      {/* Scan */}

      <motion.path
        initial={false}
        d="M7 12H41"
        stroke={color}
        strokeWidth="1"
        animate={{
          y: isHovered ? [0, 24, 0] : 0,
          opacity: isHovered ? [0, 1, 0] : 0,
        }}
        transition={{
          duration: 1.4,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
        }}
      />

      {/* Data line */}

      <motion.path
        d="M10 38H38"
        stroke={color}
        strokeWidth="1"
        animate={{
          pathLength: isHovered ? [0, 1, 0] : 0.4,
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
        }}
      />
    </motion.svg>
  );
};


/* =========================================================
   PERFORMANCE
   Radar / Performance Scanner
   ========================================================= */

export const PerformanceIcon: React.FC<CyberIconProps> = ({
  size = 48,
  color = '#00FF41',
  isHovered = false,
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      animate={{
        filter: isHovered
          ? [
              'drop-shadow(0 0 2px currentColor)',
              'drop-shadow(0 0 11px currentColor)',
              'drop-shadow(0 0 3px currentColor)',
            ]
          : 'drop-shadow(0 0 0px currentColor)',
      }}
      transition={{
        duration: 1.2,
        repeat: isHovered ? Infinity : 0,
      }}
    >
      {/* Outer monitor */}

      <rect
        x="5"
        y="6"
        width="38"
        height="30"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Performance graph */}

      <motion.path
        initial={false}
        d="M9 29L14 25L18 27L23 17L27 21L32 14L39 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          pathLength: isHovered
            ? [0.4, 1, 0.4]
            : 1,
          opacity: isHovered
            ? [0.5, 1, 0.5]
            : 0.85,
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Optimization arrow */}

      <motion.path
        initial={false}
        d="M34 30L39 25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{
          x: isHovered ? [0, 2, 0] : 0,
          y: isHovered ? [0, -2, 0] : 0,
          opacity: isHovered ? [0.4, 1, 0.4] : 0.7,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.path
        d="M35 25H39V29"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          x: isHovered ? [0, 2, 0] : 0,
          y: isHovered ? [0, -2, 0] : 0,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      {/* Monitor stand */}

      <path
        d="M19 36V40"
        stroke={color}
        strokeWidth="1.5"
      />

      <path
        d="M14 42H34"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Scan line */}

      <motion.path
        initial={false}
        d="M7 11H41"
        stroke={color}
        strokeWidth="0.8"
        animate={{
          y: isHovered ? [0, 24, 0] : 0,
          opacity: isHovered
            ? [0, 0.7, 0]
            : 0,
        }}
        transition={{
          duration: 1.8,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
        }}
      />

      {/* Optimization nodes */}

      <motion.circle
        cx="23"
        cy="17"
        r="2"
        fill={color}
        animate={{
          scale: isHovered ? [0.7, 1.4, 0.7] : 1,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          transformOrigin: '23px 17px',
        }}
      />

      <motion.circle
        cx="32"
        cy="14"
        r="2"
        fill={color}
        animate={{
          scale: isHovered ? [0.7, 1.4, 0.7] : 1,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
          delay: 0.15,
        }}
        style={{
          transformOrigin: '32px 14px',
        }}
      />
    </motion.svg>
  );
};


/* =========================================================
   UI / UX
   HUD Interface
   ========================================================= */

export const UIUXIcon: React.FC<CyberIconProps> = ({
  size = 48,
  color = '#FF2BD6',
  isHovered = false,
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      animate={{
        filter: isHovered
          ? [
              'drop-shadow(0 0 2px currentColor)',
              'drop-shadow(0 0 12px currentColor)',
              'drop-shadow(0 0 3px currentColor)',
            ]
          : 'drop-shadow(0 0 0px currentColor)',
      }}
      transition={{
        duration: 1.2,
        repeat: isHovered ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >

      {/* =====================================================
          ASSEMBLY GUIDES
      ===================================================== */}

      <motion.path
        d="M5 16H11M37 16H43"
        stroke={color}
        strokeWidth="0.7"
        strokeDasharray="2 2"
        opacity={isHovered ? 0.7 : 0.2}
        animate={{
          opacity: isHovered ? [0.2, 0.8, 0.2] : 0.2,
        }}
        transition={{
          duration: 1.2,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.path
        d="M5 32H11M37 32H43"
        stroke={color}
        strokeWidth="0.7"
        strokeDasharray="2 2"
        opacity={isHovered ? 0.7 : 0.2}
      />

      {/* =====================================================
          TOP COMPONENT
          Header / Navigation
      ===================================================== */}

      <motion.g
        animate={{
          x: isHovered ? 0 : -3,
          y: isHovered ? 0 : -4,
          rotate: isHovered ? 0 : -4,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: 'center',
        }}
      >
        <rect
          x="12"
          y="10"
          width="24"
          height="7"
          rx="1"
          stroke={color}
          strokeWidth="1.3"
          fill="#0a0a0f"
        />

        {/* Logo */}

        <motion.rect
          initial={false}
          x="15"
          y="12"
          width="3"
          height="3"
          fill={color}
          animate={{
            opacity: isHovered ? [0.4, 1, 0.4] : 0.65,
          }}
          transition={{
            duration: 0.8,
            repeat: isHovered ? Infinity : 0,
          }}
        />

        {/* Navigation */}

        <path
          d="M22 12H27"
          stroke={color}
          strokeWidth="1"
          opacity="0.65"
        />

        <path
          d="M29 12H33"
          stroke={color}
          strokeWidth="1"
          opacity="0.45"
        />
      </motion.g>


      {/* =====================================================
          LEFT COMPONENT
          Content block
      ===================================================== */}

      <motion.g
        animate={{
          x: isHovered ? 0 : -5,
          y: isHovered ? 0 : 2,
          rotate: isHovered ? 0 : -3,
        }}
        transition={{
          duration: 0.6,
          delay: 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: 'center',
        }}
      >
        <rect
          x="8"
          y="20"
          width="14"
          height="13"
          rx="1"
          stroke={color}
          strokeWidth="1.3"
          fill="#0a0a0f"
        />

        {/* Image / visual */}

        <rect
          x="11"
          y="23"
          width="8"
          height="5"
          stroke={color}
          strokeWidth="0.9"
          opacity="0.7"
        />

        {/* Content lines */}

        <path
          d="M11 30H19"
          stroke={color}
          strokeWidth="0.9"
          opacity="0.6"
        />

        <path
          d="M11 32H16"
          stroke={color}
          strokeWidth="0.9"
          opacity="0.4"
        />
      </motion.g>


      {/* =====================================================
          RIGHT COMPONENT
          Controls / cards
      ===================================================== */}

      <motion.g
        animate={{
          x: isHovered ? 0 : 5,
          y: isHovered ? 0 : 2,
          rotate: isHovered ? 0 : 4,
        }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: 'center',
        }}
      >
        <rect
          x="26"
          y="20"
          width="14"
          height="13"
          rx="1"
          stroke={color}
          strokeWidth="1.3"
          fill="#0a0a0f"
        />

        {/* UI controls */}

        <rect
          x="29"
          y="23"
          width="8"
          height="2"
          rx="1"
          fill={color}
          opacity="0.35"
        />

        <rect
          x="29"
          y="27"
          width="5"
          height="2"
          rx="1"
          fill={color}
          opacity="0.65"
        />

        <rect
          x="35"
          y="27"
          width="2"
          height="2"
          fill={color}
          opacity="0.35"
        />

        <path
          d="M29 31H37"
          stroke={color}
          strokeWidth="0.9"
          opacity="0.45"
        />
      </motion.g>


      {/* =====================================================
          BOTTOM COMPONENT
          Action / Footer
      ===================================================== */}

      <motion.g
        animate={{
          x: isHovered ? 0 : 0,
          y: isHovered ? 0 : 5,
          rotate: isHovered ? 0 : 2,
        }}
        transition={{
          duration: 0.65,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: 'center',
        }}
      >
        <rect
          x="12"
          y="35"
          width="24"
          height="6"
          rx="1"
          stroke={color}
          strokeWidth="1.2"
          fill="#0a0a0f"
        />

        {/* Progress / action */}

        <motion.path
          d="M15 38H28"
          stroke={color}
          strokeWidth="1"
          animate={{
            pathLength: isHovered
              ? [0.2, 1]
              : 0.55,
          }}
          transition={{
            duration: 0.7,
            delay: isHovered ? 0.4 : 0,
          }}
        />

        <rect
          x="31"
          y="37"
          width="2"
          height="2"
          fill={color}
          opacity="0.7"
        />
      </motion.g>


      {/* =====================================================
          CONNECTION POINTS
      ===================================================== */}

      <motion.circle
        initial={false}
        cx="12"
        cy="17"
        r="1"
        fill={color}
        animate={{
          scale: isHovered ? [1, 1.8, 1] : 1,
          opacity: isHovered ? [0.4, 1, 0.4] : 0.45,
        }}
        transition={{
          duration: 0.7,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          transformOrigin: '12px 17px',
        }}
      />

      <motion.circle
        initial={false}
        cx="36"
        cy="17"
        r="1"
        fill={color}
        animate={{
          scale: isHovered ? [1, 1.8, 1] : 1,
          opacity: isHovered ? [0.4, 1, 0.4] : 0.45,
        }}
        transition={{
          duration: 0.7,
          repeat: isHovered ? Infinity : 0,
          delay: 0.15,
        }}
        style={{
          transformOrigin: '36px 17px',
        }}
      />


      {/* =====================================================
          ASSEMBLY LINES
      ===================================================== */}

      <motion.path
        initial={false}
        d="M19 17V20"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="1 2"
        animate={{
          opacity: isHovered ? [0, 1, 0] : 0,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.path
        initial={false}
        d="M29 17V20"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="1 2"
        animate={{
          opacity: isHovered ? [0, 1, 0] : 0,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
          delay: 0.15,
        }}
      />

      <motion.path
        initial={false}
        d="M22 33V35"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="1 2"
        animate={{
          opacity: isHovered ? [0, 1, 0] : 0,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
          delay: 0.3,
        }}
      />

      {/* =====================================================
          FINAL BUILD PULSE
      ===================================================== */}

      <motion.rect
        x="7"
        y="7"
        width="34"
        height="34"
        rx="2"
        stroke={color}
        strokeWidth="0.6"
        opacity={isHovered ? 0.25 : 0}
        animate={{
          opacity: isHovered
            ? [0, 0.35, 0]
            : 0,
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
        }}
      />

    </motion.svg>
  );
};


/* =========================================================
   SOLVER
   Target / Lock-On System
   ========================================================= */

export const SolverIcon: React.FC<CyberIconProps> = ({
  size = 48,
  color = '#A020F0',
  isHovered = false,
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
    >
      {/* Outer scanner */}

      <motion.circle
        cx="24"
        cy="24"
        r="20"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="2 5"
        opacity={isHovered ? 0.9 : 0.35}
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 4,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
        }}
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* Target */}

      <motion.circle
        cx="24"
        cy="24"
        r="15"
        stroke={color}
        strokeWidth="1"
        opacity={isHovered ? 0.8 : 0.35}
        animate={{
          scale: isHovered ? [1, 0.9, 1] : 1,
        }}
        transition={{
          duration: 1.4,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          transformOrigin: 'center',
        }}
      />

      <motion.circle
        cx="24"
        cy="24"
        r="8"
        stroke={color}
        strokeWidth="1.5"
        animate={{
          scale: isHovered ? [1, 0.75, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* Crosshair */}

      <motion.path
        d="M24 2V12"
        stroke={color}
        strokeWidth="1.5"
        animate={{
          y: isHovered ? [0, 1, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.path
        d="M24 36V46"
        stroke={color}
        strokeWidth="1.5"
        animate={{
          y: isHovered ? [0, -1, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.path
        d="M2 24H12"
        stroke={color}
        strokeWidth="1.5"
      />

      <motion.path
        d="M36 24H46"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Lock-on core */}

      <motion.circle
        initial={false}
        cx="24"
        cy="24"
        r="3"
        fill={color}
        animate={{
          scale: isHovered ? [1, 1.5, 1] : 1,
          opacity: isHovered ? [0.6, 1, 0.6] : 0.75,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          transformOrigin: 'center',
        }}
      />
    </motion.svg>
  );
};


/* =========================================================
   TEAM
   Network / Connected Nodes
   ========================================================= */

export const TeamIcon: React.FC<CyberIconProps> = ({
  size = 48,
  color = '#FF2BD6',
  isHovered = false,
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      animate={{
        filter: isHovered
          ? [
              'drop-shadow(0 0 2px currentColor)',
              'drop-shadow(0 0 12px currentColor)',
              'drop-shadow(0 0 3px currentColor)',
            ]
          : 'drop-shadow(0 0 0px currentColor)',
      }}
      transition={{
        duration: 1.2,
        repeat: isHovered ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >

      {/* =================================================
          OUTER DESIGN FRAME
      ================================================= */}

      <motion.path
        initial={false}
        d="M24 3L45 14V34L24 45L3 34V14L24 3Z"
        stroke={color}
        strokeWidth="1"
        opacity={isHovered ? 0.7 : 0.3}
        strokeDasharray="2 5"
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 8,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
        }}
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* =================================================
          CONNECTION LINES
      ================================================= */}

      <motion.path
        initial={false}
        d="M24 24L12 12"
        stroke={color}
        strokeWidth="1"
        opacity={isHovered ? 0.8 : 0.35}
        animate={{
          pathLength: isHovered ? [0.2, 1, 0.2] : 1,
        }}
        transition={{
          duration: 1.2,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.path
        initial={false}
        d="M24 24L36 12"
        stroke={color}
        strokeWidth="1"
        opacity={isHovered ? 0.8 : 0.35}
        animate={{
          pathLength: isHovered ? [0.2, 1, 0.2] : 1,
        }}
        transition={{
          duration: 1.2,
          repeat: isHovered ? Infinity : 0,
          delay: 0.15,
        }}
      />

      <motion.path
        initial={false}
        d="M24 24L12 36"
        stroke={color}
        strokeWidth="1"
        opacity={isHovered ? 0.8 : 0.35}
        animate={{
          pathLength: isHovered ? [0.2, 1, 0.2] : 1,
        }}
        transition={{
          duration: 1.2,
          repeat: isHovered ? Infinity : 0,
          delay: 0.3,
        }}
      />

      <motion.path
        initial={false}
        d="M24 24L36 36"
        stroke={color}
        strokeWidth="1"
        opacity={isHovered ? 0.8 : 0.35}
        animate={{
          pathLength: isHovered ? [0.2, 1, 0.2] : 1,
        }}
        transition={{
          duration: 1.2,
          repeat: isHovered ? Infinity : 0,
          delay: 0.45,
        }}
      />

      {/* =================================================
          DESIGN NODES
      ================================================= */}

      <motion.circle
        initial={false}
        cx="12"
        cy="12"
        r="4"
        stroke={color}
        strokeWidth="1.3"
        fill="#0a0a0f"
        animate={{
          scale: isHovered ? [1, 1.25, 1] : 1,
          opacity: isHovered ? [0.5, 1, 0.5] : 0.65,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          transformOrigin: '12px 12px',
        }}
      />

      <motion.circle
        initial={false}
        cx="36"
        cy="12"
        r="4"
        stroke={color}
        strokeWidth="1.3"
        fill="#0a0a0f"
        animate={{
          scale: isHovered ? [1, 1.25, 1] : 1,
          opacity: isHovered ? [0.5, 1, 0.5] : 0.65,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
          delay: 0.15,
        }}
        style={{
          transformOrigin: '36px 12px',
        }}
      />

      <motion.circle
        initial={false}
        cx="12"
        cy="36"
        r="4"
        stroke={color}
        strokeWidth="1.3"
        fill="#0a0a0f"
        animate={{
          scale: isHovered ? [1, 1.25, 1] : 1,
          opacity: isHovered ? [0.5, 1, 0.5] : 0.65,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
          delay: 0.3,
        }}
        style={{
          transformOrigin: '12px 36px',
        }}
      />

      <motion.circle
        initial={false}
        cx="36"
        cy="36"
        r="4"
        stroke={color}
        strokeWidth="1.3"
        fill="#0a0a0f"
        animate={{
          scale: isHovered ? [1, 1.25, 1] : 1,
          opacity: isHovered ? [0.5, 1, 0.5] : 0.65,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
          delay: 0.45,
        }}
        style={{
          transformOrigin: '36px 36px',
        }}
      />

      {/* =================================================
          CENTER DESIGN CORE
      ================================================= */}

      <motion.path
        d="M24 15L33 24L24 33L15 24L24 15Z"
        stroke={color}
        strokeWidth="1.7"
        fill="#0a0a0f"
        animate={{
          rotate: isHovered ? 90 : 0,
          scale: isHovered
            ? [0.9, 1.08, 0.9]
            : 1,
        }}
        transition={{
          rotate: {
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          },
          scale: {
            duration: 1,
            repeat: isHovered ? Infinity : 0,
          },
        }}
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* Inner diamond */}

      <motion.path
        initial={false}
        d="M24 19L29 24L24 29L19 24L24 19Z"
        stroke={color}
        strokeWidth="1"
        animate={{
          scale: isHovered ? [0.8, 1.2, 0.8] : 1,
          opacity: isHovered ? [0.4, 1, 0.4] : 0.7,
        }}
        transition={{
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* Core */}

      <motion.circle
        initial={false}
        cx="24"
        cy="24"
        r="2"
        fill={color}
        animate={{
          scale: isHovered ? [0.5, 1.7, 0.5] : 1,
          opacity: isHovered ? [0.3, 1, 0.3] : 0.75,
        }}
        transition={{
          duration: 0.7,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          transformOrigin: 'center',
        }}
      />

      {/* =================================================
          DESIGN GUIDES
      ================================================= */}

      <motion.path
        d="M6 24H14"
        stroke={color}
        strokeWidth="0.7"
        opacity={isHovered ? 0.7 : 0.2}
        animate={{
          x: isHovered ? [0, 2, 0] : 0,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.path
        d="M34 24H42"
        stroke={color}
        strokeWidth="0.7"
        opacity={isHovered ? 0.7 : 0.2}
        animate={{
          x: isHovered ? [0, -2, 0] : 0,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.path
        d="M24 6V14"
        stroke={color}
        strokeWidth="0.7"
        opacity={isHovered ? 0.7 : 0.2}
        animate={{
          y: isHovered ? [0, 2, 0] : 0,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.path
        d="M24 34V42"
        stroke={color}
        strokeWidth="0.7"
        opacity={isHovered ? 0.7 : 0.2}
        animate={{
          y: isHovered ? [0, -2, 0] : 0,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
        }}
      />

      {/* =================================================
          DATA PARTICLE
      ================================================= */}

      <motion.circle
        initial={false}
        cx="12"
        cy="12"
        r="1.5"
        fill={color}
        animate={{
          cx: isHovered
            ? [12, 24, 36, 24, 12]
            : 12,
          cy: isHovered
            ? [12, 24, 12, 24, 12]
            : 12,
          opacity: isHovered
            ? [1, 1, 1, 1, 0]
            : 0,
        }}
        transition={{
          duration: 2.4,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
        }}
      />

    </motion.svg>
  );
};