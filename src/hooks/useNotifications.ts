import { useEffect, useState, useCallback } from 'react'
import type { SessionType } from './usePomodoro'

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default')

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)

      if (Notification.permission === 'default') {
        Notification.requestPermission().then((result) => {
          setPermission(result)
        })
      }
    }
  }, [])

  const sendNotification = useCallback((sessionType: SessionType) => {
    if (!('Notification' in window) || permission !== 'granted') {
      return
    }

    const messages = {
      work: 'Break time over! Ready to work?',
      shortBreak: 'Work session completed! Time for a short break.',
      longBreak: 'Work session completed! Time for a long break.'
    }

    const titles = {
      work: 'Pomodoro Timer',
      shortBreak: 'Pomodoro Timer',
      longBreak: 'Pomodoro Timer'
    }

    new Notification(titles[sessionType], {
      body: messages[sessionType],
      icon: '/favicon.svg'
    })
  }, [permission])

  return {
    sendNotification,
    permission,
    isSupported: 'Notification' in window
  }
}
