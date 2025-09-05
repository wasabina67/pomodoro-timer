import React from 'react'
import type { PomodoroControls } from '../hooks/usePomodoro'

interface ControlsProps {
  controls: PomodoroControls
  isRunning: boolean
}

const Controls: React.FC<ControlsProps> = ({ controls, isRunning }) => {
  return (
    <div className="controls">
      <button
        className={`control-button primary ${isRunning ? 'pause' : 'start'}`}
        onClick={isRunning ? controls.pause : controls.start}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>

      <button
        className="control-button secondary"
        onClick={controls.reset}
      >
        Reset
      </button>

      <button
        className="control-button secondary"
        onClick={controls.skip}
      >
        Skip
      </button>
    </div>
  )
}

export default Controls
