import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

import { useAutoLockContext } from '../../context/AutoLockContext'
import { setLastActivityAt } from '../../utils/autoLockStorage'

/**
 * Validates interaction and updates storage
 */
const updateActivityTimestamp = async () => {
  const now = Date.now()
  await setLastActivityAt(now)
}

export const AutoLockTouchCapture = ({ children }) => {
  const { notifyInteraction } = useAutoLockContext()
  const navigation = useNavigation()

  const handleInteraction = () => {
    const state = navigation.getState()
    const currentRoute = state?.routes?.[state.index]?.name
    if (currentRoute === 'Welcome') {
      return false
    }

    updateActivityTimestamp()

    notifyInteraction()

    return false
  }

  return (
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponderCapture={handleInteraction}
    >
      {children}
    </View>
  )
}
