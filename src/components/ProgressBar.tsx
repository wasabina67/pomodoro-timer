import React from 'react'
import type { SessionType } from '../hooks/usePomodoro'

interface ProgressBarProps {
  progress: number
  sessionType: SessionType
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, sessionType }) => {
  const circumference = 2 * Math.PI * 120 // radius 120px
  const strokeDashoffset = circumference - (progress * circumference)

  const getProgressColor = (type: SessionType): string => {
    switch (type) {
      case 'work':
        return '#e74c3c' // red
      case 'shortBreak':
        return '#f39c12' // orange
      case 'longBreak':
        return '#27ae60' // green
      default:
        return '#e74c3c'
    }
  }

  return (
    <div className="progress-bar">
      <svg className="progress-ring" width="260" height="260">
        <circle
          cx="130"
          cy="130"
          r="120"
          fill="transparent"
          stroke="#ecf0f1"
          strokeWidth="8"
          className="progress-ring-background"
        />
        <circle
          cx="130"
          cy="130"
          r="120"
          fill="transparent"
          stroke={getProgressColor(sessionType)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="progress-ring-fill"
          transform="rotate(-90 130 130)"
        />
      </svg>
    </div>
  )
}

export default ProgressBar
