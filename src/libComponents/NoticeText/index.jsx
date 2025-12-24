import {
  ErrorIcon,
  OkayIcon,
  YellowErrorIcon
} from 'pearpass-lib-ui-react-native-components'

import { NoticeTextComponent, NoticeTextWrapper } from './styles'

/**
 * @param {{
 *  text: string;
 *  type: 'success' | 'error' | 'warning';
 * }} props
 */
export const NoticeText = ({ text, type = 'success' }) => {
  const getIconByType = () => {
    switch (type) {
      case 'success':
        return <OkayIcon size="14" />
      case 'error':
        return <ErrorIcon size="14" />
      case 'warning':
        return <YellowErrorIcon size="14" />
      default:
        return null
    }
  }

  return (
    <NoticeTextWrapper>
      {getIconByType()}
      <NoticeTextComponent type={type}>{text}</NoticeTextComponent>
    </NoticeTextWrapper>
  )
}
