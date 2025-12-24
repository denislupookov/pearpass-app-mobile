import { colors } from 'pearpass-lib-ui-theme-provider/native'

import { Button, ButtonText } from './styles'

export const ButtonFilter = ({
  children,
  startIcon,
  variant = 'primary',
  onPress
}) => {
  const Icon = startIcon
  return (
    <Button activeOpacity={0.8} variant={variant} onPress={onPress}>
      {Icon && (
        <Icon
          size="21"
          color={
            variant === 'primary'
              ? colors.secondary400.mode1
              : colors.white.mode1
          }
        />
      )}
      {children && <ButtonText variant={variant}>{children}</ButtonText>}
    </Button>
  )
}
