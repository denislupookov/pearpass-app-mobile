import { colors } from 'pearpass-lib-ui-theme-provider/native'

import { Button, ButtonText } from './styles'

export const ButtonLittle = ({
  children,
  startIcon,
  variant = 'primary',
  borderRadius = 'sm',
  onPress
}) => {
  const Icon = startIcon
  return (
    <Button
      activeOpacity={0.8}
      variant={variant}
      onPress={onPress}
      borderRadius={borderRadius}
    >
      {Icon && (
        <Icon
          size="21"
          color={
            variant === 'primary' ? colors.black.mode1 : colors.primary400.mode1
          }
        />
      )}
      {children && <ButtonText variant={variant}>{children}</ButtonText>}
    </Button>
  )
}
