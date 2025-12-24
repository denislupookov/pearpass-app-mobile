import { CompoundFieldComponent } from './styles'

/**
 * @param {{
 * children: ReactNode
 * isDisabled: boolean
 * }} props
 */
export const CompoundField = ({ children, isDisabled }) => (
  <CompoundFieldComponent isDisabled={isDisabled}>
    {children}
  </CompoundFieldComponent>
)
