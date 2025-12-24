import { ButtonText, Button } from './styles'

/**
 * @param {{
 *  children: ReactNode
 *  startIcon?: ElementType
 *  size?: 'sm' | 'md'
 *  stretch: boolean
 *  onPress: () => void
 * }} props
 */
export const ButtonPrimary = ({
  children,
  onPress,
  size = 'md',
  stretch,
  disabled
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
