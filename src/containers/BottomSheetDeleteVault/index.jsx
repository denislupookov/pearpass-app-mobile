import { useState } from 'react'

import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useLingui } from '@lingui/react/macro'
import { DeleteIcon } from 'pearpass-lib-ui-react-native-components'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { DeviceSelectItem } from './DeviceSelectItem'
import { useBottomSheet } from '../../context/BottomSheetContext'

/**
 * @param {Object} props - Component props
 * @param {string} props.vaultId - The unique identifier of the vault to delete
 * @param {string} props.vaultName - The name of the vault to delete
 * @param {Function} props.onConfirmDelete - Callback when delete is confirmed
 * @returns {JSX.Element} Bottom sheet with vault deletion options
 */
export const BottomSheetDeleteVault = ({
  vaultId,
  vaultName,
  onConfirmDelete
}) => {
  const { t } = useLingui()
  const { collapse } = useBottomSheet()

  const [devices] = useState([
    { id: 'current', name: t`This device`, checked: true },
    { id: 'device1', name: t`Andrea's Iphone`, checked: false },
    { id: 'device2', name: t`Andrea's laptop`, checked: false }
  ])

  const [selectedDevices, setSelectedDevices] = useState(['current'])

  const handleDeviceToggle = (deviceId) => {
    setSelectedDevices((prev) => {
      if (prev.includes(deviceId)) {
        return prev.filter((id) => id !== deviceId)
      } else {
        return [...prev, deviceId]
      }
    })
  }

  const handleDelete = () => {
    onConfirmDelete?.(selectedDevices)
  }

  const handleCancel = () => {
    collapse()
  }

  return (
    <>
      <View style={styles.header}>
        <Text
          style={styles.title}
        >{t`Are you sure you want to delete this vault?`}</Text>
      </View>

      <BottomSheetScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.warningText}>
          {t`This will permanently delete all items in this vault. This action cannot be undone.`}
        </Text>

        <Text style={styles.sectionTitle}>
          {t`Select additional devices to delete the vault from`}
        </Text>

        <View style={styles.devicesContainer}>
          {devices.map((device) => (
            <DeviceSelectItem
              key={device.id}
              name={device.name}
              isSelected={selectedDevices.includes(device.id)}
              onToggle={() => handleDeviceToggle(device.id)}
            />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            testID="delete-vault-confirm-button"
            accessibilityLabel={t`Delete vault`}
          >
            <DeleteIcon color={colors.white.mode1} size="20" />
            <Text style={styles.deleteButtonText}>{t`Delete vault`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            testID="delete-vault-cancel-button"
            accessibilityLabel={t`Cancel`}
          >
            <Text style={styles.cancelButtonText}>{t`Cancel`}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white.mode1,
    textAlign: 'center',
    lineHeight: 28
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20
  },
  scrollContent: {
    paddingBottom: 40
  },
  warningText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.white.mode1,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
    opacity: 0.8
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.white.mode1,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 20,
    marginBottom: 16
  },
  devicesContainer: {
    gap: 12
  },
  buttonsContainer: {
    marginTop: 30,
    gap: 12
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  deleteButtonText: {
    color: colors.white.mode1,
    fontSize: 16,
    fontWeight: '600'
  },
  cancelButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  cancelButtonText: {
    color: colors.white.mode1,
    fontSize: 16,
    fontWeight: '600'
  }
})
