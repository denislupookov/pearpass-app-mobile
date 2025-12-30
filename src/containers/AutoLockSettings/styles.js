import { StyleSheet } from 'react-native'

import { colors } from 'pearpass-lib-ui-theme-provider/native'

export const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  description: {
    color: colors.white.mode1,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '300',
    marginTop: 5
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  settingLabel: {
    color: colors.white.mode1,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700'
  },
  timeoutSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.grey400.mode1,
    borderRadius: 8,
    marginTop: 8
  },
  timeoutText: {
    color: colors.white.mode1,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700'
  }
})

