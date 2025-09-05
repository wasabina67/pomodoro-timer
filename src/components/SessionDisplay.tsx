import React from 'react'
import type { SessionType } from '../hooks/usePomodoro'

interface SessionDisplayProps {
  sessionType: SessionType
  completedSessions: number
}

const SessionDisplay: React.FC<SessionDisplayProps> = ({ sessionType, completedSessions }) => {
  const getSessionLabel = (type: SessionType): string => {
    switch (type) {
      case 'work':
        return 'Work'
      case 'shortBreak':
        return 'Short Break'
      case 'longBreak':
        return 'Long Break'
      default:
        return 'Work'
    }
  }

  return (
    <div className="session-display">
      <div className="session-type">
        <span className="session-label">{getSessionLabel(sessionType)}</span>
      </div>
      <div className="session-counter">
        Completed Sessions: {completedSessions}
      </div>
    </div>
  )
}

export default SessionDisplay
