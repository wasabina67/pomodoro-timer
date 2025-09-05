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
        {isRunning ? '⏸️ 一時停止' : '▶️ 開始'}
      </button>

      <button
        className="control-button secondary"
        onClick={controls.reset}
      >
        🔄 リセット
      </button>

      <button
        className="control-button secondary"
        onClick={controls.skip}
      >
        ⏭️ スキップ
      </button>
    </div>
  )
}

export default Controls
