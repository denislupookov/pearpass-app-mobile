import { useState } from 'react'

import { TouchableOpacity } from 'react-native'

import { TextAreaComponent } from './styles'

export const TextAreaReport = ({
  value,
  onChange,
  placeholder,
  isDisabled,
  onClick
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleChangeText = (text) => {
    if (isDisabled) {
      return
    }
    onChange?.(text)
  }

  const handleClick = () => {
    onClick?.()
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <TextAreaComponent
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        editable={!isDisabled}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </TouchableOpacity>
  )
}
