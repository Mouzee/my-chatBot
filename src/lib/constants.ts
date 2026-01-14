/**
 * Application-wide constants
 * Centralized configuration values to avoid magic numbers and strings
 */

// Animation constants
export const ANIMATION = {
  DURATION: {
    FAST: 0.3,
    NORMAL: 0.6,
    SLOW: 1.0,
  },
  DELAY: {
    SHORT: 0.1,
    MEDIUM: 0.2,
    LONG: 0.4,
  },
  EASING: {
    SMOOTH: [0.25, 0.46, 0.45, 0.94] as const,
  },
} as const

// Chat message constants
export const CHAT_MESSAGE = {
  TYPING_DOT_COUNT: 3,
  TYPING_ANIMATION_DURATION: 1.5,
  TYPING_DOT_DELAYS: [0, 0.2, 0.4] as const,
  LINK_PATTERNS: [
    "Portfolio Website",
    "LinkedIn",
    "Email",
    "WhatsApp",
    "GitHub",
    "Download my CV",
    "CV",
  ] as const,
} as const

// Chatbot FAQ constants
export const CHATBOT_FAQ = {
  STAGES: {
    NAME: "name",
    CATEGORY: "category",
    QUESTION_SELECT: "question-select",
    ANSWER: "answer",
    COMPLETE: "complete",
  } as const,
  CATEGORIES: ["recruiter", "client", "collaborator"] as const,
  DELAYS: {
    MESSAGE_RESPONSE: 800,
    ANSWER_DISPLAY: 1200,
    COMPLETE_CHECK: 1000,
  },
  MIN_NAME_LENGTH: 2,
} as const

// Project constants
export const PROJECT = {
  DEFAULT_SLIDE_INTERVAL: 4000,
  MIN_IMAGES_FOR_CAROUSEL: 2,
  PLACEHOLDER_IMAGE: "/placeholder.svg",
} as const

// Animated counter constants
export const ANIMATED_COUNTER = {
  FRAME_RATE: 60,
  DEFAULT_DURATION: 2,
} as const

// Animated background constants
export const ANIMATED_BACKGROUND = {
  PARTICLE_COUNT: 80,
  PARTICLE: {
    MIN_SIZE: 0.5,
    MAX_SIZE: 2.5,
    MIN_OPACITY: 0.3,
    MAX_OPACITY: 0.8,
    VELOCITY_RANGE: 0.3,
    BOUNCE_DAMPING: 0.95,
    CONNECTION_DISTANCE: 120,
  },
  COLORS: {
    DARK: {
      PRIMARY: "rgba(34, 211, 238, ",
      SECONDARY: "rgba(103, 232, 249, ",
      TERTIARY: "rgba(6, 182, 212, ",
    },
    LIGHT: {
      PRIMARY: "rgba(79, 70, 229, ",
      SECONDARY: "rgba(13, 148, 136, ",
      TERTIARY: "rgba(147, 51, 234, ",
    },
  },
} as const

// Contact form constants
export const CONTACT_FORM = {
  VALIDATION: {
    MIN_NAME_LENGTH: 2,
    MIN_SUBJECT_LENGTH: 5,
    MIN_MESSAGE_LENGTH: 10,
  },
  SUBMISSION_DELAY: 1500,
  CV_PATH: "/files/cv_sali.pdf",
  CV_FILENAME: "cv_sali.pdf",
} as const

// Skills expertise calculation
export const SKILLS = {
  EXPERTISE: {
    YEARS_THRESHOLDS: {
      EXPERT: 12,
      SENIOR: 7,
      INTERMEDIATE: 5,
      JUNIOR: 3,
      BEGINNER: 2,
      NOVICE: 1,
    },
    PERCENTAGES: {
      EXPERT: 98,
      SENIOR: 85,
      INTERMEDIATE: 75,
      JUNIOR: 60,
      BEGINNER: 45,
      NOVICE: 30,
      DEFAULT: 20,
    },
  },
} as const

// Local storage keys
export const STORAGE_KEYS = {
  VISITOR_COUNT: "visitorCount",
} as const

