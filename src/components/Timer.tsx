import React from 'react'

interface TimerProps {
  timeLeft: number
  isRunning: boolean
}

const Timer: React.FC<TimerProps> = ({ timeLeft, isRunning }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={`timer ${isRunning ? 'running' : ''}`}>
      <div className="timer-circle">
        <div className="timer-display">
          <span className="time-text">{formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  )
}

export default Timer
