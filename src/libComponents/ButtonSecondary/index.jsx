import { Button, ButtonText } from './styles'

/**
 * @param {{
 *  children: ReactNode
 *  startIcon?: ElementType
 *  size?: 'sm' | 'md'
 *  stretch: boolean
 *  onPress: () => void
 *  disabled?: boolean
 * }} props
 */
export const ButtonSecondary = ({
  children,
  onPress,
  size = 'md',
  stretch,
  disabled = false
}) => (
  <Button
    size={size}
    onPress={disabled ? undefined : onPress}
    stretch={stretch}
    disabled={disabled}
  >
    <ButtonText size={size}>{children}</ButtonText>
  </Button>
)
