# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Vite
- `npm run build` - Build the project (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

### Build Process
The project builds to `docs/` directory (configured for GitHub Pages deployment) with base path `/pomodoro-timer/`.

## Architecture

### Core Structure
This is a React + TypeScript Pomodoro timer application using Vite as the build tool.

**Main Hook**: `src/hooks/usePomodoro.ts`
- Central state management for timer functionality
- Manages session types (work/shortBreak/longBreak), timing, and progression
- Session durations: 25min work, 5min short break, 15min long break
- Automatically switches to long break every 4th completed work session

**Component Architecture**:
- `App.tsx` - Main container that consumes `usePomodoro` and `useNotifications` hooks
- `Timer.tsx` - Displays current time remaining
- `SessionDisplay.tsx` - Shows current session type and completed sessions count
- `ProgressBar.tsx` - Visual progress indicator
- `Controls.tsx` - Start/pause/reset/skip buttons

**State Flow**:
- Single source of truth via `usePomodoro` hook
- State includes: `sessionType`, `timeLeft`, `isRunning`, `completedSessions`, `progress`
- Controls: `start`, `pause`, `reset`, `skip`

**Notification Hook**: `src/hooks/useNotifications.ts`
- Browser Notification API integration
- Automatic permission request on first use
- Session completion notifications

### Key Implementation Details
- Uses `setInterval` with cleanup for timer functionality
- Progress calculation: `(SESSION_DURATIONS[sessionType] - timeLeft) / SESSION_DURATIONS[sessionType]`
- Automatic session switching when timer reaches zero
- Work session completion increments counter before switching to break
- Browser notifications sent when timer reaches zero for each session type
