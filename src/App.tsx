import './App.css'
import { usePomodoro } from './hooks/usePomodoro'
import Timer from './components/Timer'
import SessionDisplay from './components/SessionDisplay'
import ProgressBar from './components/ProgressBar'
import Controls from './components/Controls'

function App() {
  const { state, controls } = usePomodoro()

  return (
    <div className="app">
      <header className="app-header">
        <h1>ポモドーロタイマー</h1>
      </header>

      <main className="app-main">
        <SessionDisplay
          sessionType={state.sessionType}
          completedSessions={state.completedSessions}
        />

        <div className="timer-container">
          <ProgressBar
            progress={state.progress}
            sessionType={state.sessionType}
          />
          <Timer
            timeLeft={state.timeLeft}
            isRunning={state.isRunning}
          />
        </div>

        <Controls
          controls={controls}
          isRunning={state.isRunning}
        />
      </main>
    </div>
  )
}

export default App
