import { CheckIcon, PhoneIcon } from 'pearpass-lib-ui-react-native-components'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

/**
 * @param {Object} props
 * @param {string} props.name - Device name
 * @param {boolean} props.isSelected - Whether the device is selected
 * @param {Function} props.onToggle - Callback when device is toggled
 */
export const DeviceSelectItem = ({ name, isSelected, onToggle }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onToggle}
    activeOpacity={0.7}
  >
    <View style={styles.leftContent}>
      {isSelected ? (
        <View style={styles.checkContainer}>
          <CheckIcon color={colors.black.mode1} size="16" />
        </View>
      ) : (
        <View style={styles.iconContainer}>
          <PhoneIcon color={colors.white.mode1} size="18" />
        </View>
      )}
      <Text style={styles.deviceName}>{name}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey400.mode1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  checkContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.white.mode1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white.mode1,
    flex: 1
  }
})
