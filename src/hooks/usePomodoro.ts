import { useState, useEffect, useRef, useCallback } from 'react'

export type SessionType = 'work' | 'shortBreak' | 'longBreak'

export interface PomodoroState {
  sessionType: SessionType
  timeLeft: number
  isRunning: boolean
  completedSessions: number
  progress: number
}

export interface PomodoroControls {
  start: () => void
  pause: () => void
  reset: () => void
  skip: () => void
}

const SESSION_DURATIONS = {
  work: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
}

export const usePomodoro = () => {
  const [sessionType, setSessionType] = useState<SessionType>('work')
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATIONS.work)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)

  const intervalRef = useRef<number | null>(null)

  const progress = (SESSION_DURATIONS[sessionType] - timeLeft) / SESSION_DURATIONS[sessionType]

  const getNextSessionType = useCallback((): SessionType => {
    if (sessionType === 'work') {
      return (completedSessions + 1) % 4 === 0 ? 'longBreak' : 'shortBreak'
    }
    return 'work'
  }, [sessionType, completedSessions])

  const switchSession = useCallback(() => {
    const nextSessionType = getNextSessionType()

    if (sessionType === 'work') {
      setCompletedSessions(prev => prev + 1)
    }

    setSessionType(nextSessionType)
    setTimeLeft(SESSION_DURATIONS[nextSessionType])
    setIsRunning(false)
  }, [sessionType, getNextSessionType])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            switchSession()
            return SESSION_DURATIONS[getNextSessionType()]
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, switchSession, getNextSessionType])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(SESSION_DURATIONS[sessionType])
  }, [sessionType])

  const skip = useCallback(() => {
    switchSession()
  }, [switchSession])

  const state: PomodoroState = {
    sessionType,
    timeLeft,
    isRunning,
    completedSessions,
    progress,
  }

  const controls: PomodoroControls = {
    start,
    pause,
    reset,
    skip,
  }

  return { state, controls }
}
