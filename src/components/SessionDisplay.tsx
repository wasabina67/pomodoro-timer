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
        return '作業時間'
      case 'shortBreak':
        return '短休憩'
      case 'longBreak':
        return '長休憩'
      default:
        return '作業時間'
    }
  }

  return (
    <div className="session-display">
      <div className="session-type">
        <span className="session-label">{getSessionLabel(sessionType)}</span>
      </div>
      <div className="session-counter">
        完了セッション: {completedSessions}
      </div>
    </div>
  )
}

export default SessionDisplay
