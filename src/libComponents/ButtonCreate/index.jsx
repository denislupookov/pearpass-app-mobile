import { colors } from 'pearpass-lib-ui-theme-provider/native'
import { View } from 'react-native'

import { Button, ButtonText } from './styles'

/**
 * @param {{
 *  children: ReactNode
 *  startIcon?: ElementType
 *  onPress: () => void
 * }} props
 */
export const ButtonCreate = ({ children, startIcon, onPress }) => {
  const Icon = startIcon
  return (
    <Button activeOpacity={0.8} onPress={onPress}>
      {Icon && <Icon size="21" color={colors.black.mode1} />}
      {children && <ButtonText>{children}</ButtonText>}
      <View></View>
    </Button>
  )
}
