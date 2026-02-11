import { useEffect, useState } from 'react'

import {
  BottomSheetScrollView,
  BottomSheetTextInput
} from '@gorhom/bottom-sheet'
import { useLingui } from '@lingui/react/macro'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import { DeleteIcon, PhoneIcon } from 'pearpass-lib-ui-react-native-components'
import { colors } from 'pearpass-lib-ui-theme-provider'
import {
  authoriseCurrentProtectedVault,
  useUserData,
  useVault
} from 'pearpass-lib-vault/src'
import {
  clearBuffer,
  stringToBuffer
} from 'pearpass-lib-vault/src/utils/buffer'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { useBottomSheet } from '../../context/BottomSheetContext'
import { InputPasswordPearPass } from '../../libComponents'

/**
 * Confirmation bottom sheet for vault deletion with password verification
 * @param {Object} props
 * @param {string} props.vaultId - The vault ID to delete
 * @param {string} props.vaultName - The vault name
 * @param {Array<string>} props.selectedDevices - Array of selected device IDs
 * @param {Array<Object>} props.devices - Array of all devices with their info
 * @param {Function} props.onConfirmDelete - Called when delete is confirmed with passwords
 */
export const BottomSheetDeleteVaultConfirm = ({
  vaultId,
  vaultName,
  selectedDevices,
  devices,
  onConfirmDelete
}) => {
  const { t } = useLingui()
  const { collapse } = useBottomSheet()
  const { logIn } = useUserData()
  const { isVaultProtected } = useVault()
  const [isProtected, setIsProtected] = useState(false)

  useEffect(() => {
    const checkProtection = async () => {
      try {
        const isProtectedVault = await isVaultProtected(vaultId)
        setIsProtected(isProtectedVault)
      } catch (error) {
        setIsProtected(false)
      }
    }
    checkProtection()
  }, [vaultId, isVaultProtected])

  const schema = Validator.object({
    masterPassword: Validator.string().required(t`Master password is required`),
    vaultPassword: isProtected
      ? Validator.string().required(t`Vault password is required`)
      : Validator.string()
  })

  const { register, handleSubmit, values, setErrors } = useForm({
    initialValues: {
      masterPassword: '',
      vaultPassword: ''
    },
    validate: (values) => schema.validate(values)
  })

  const selectedDevicesList = devices.filter((d) =>
    selectedDevices.includes(d.id)
  )

  const handleDelete = async (values) => {
    const passwordBuffer = stringToBuffer(values.masterPassword)

    try {
      await logIn({ password: passwordBuffer })

      if (isProtected) {
        if (!values.vaultPassword) {
          setErrors({
            vaultPassword: t`Vault password is required`
          })
          clearBuffer(passwordBuffer)
          return
        }

        try {
          await authoriseCurrentProtectedVault(values.vaultPassword)
        } catch (error) {
          setErrors({
            vaultPassword: t`Invalid vault password`
          })
          clearBuffer(passwordBuffer)
          return
        }
      }

      onConfirmDelete?.({
        selectedDevices,
        masterPassword: values.masterPassword,
        vaultPassword: values.vaultPassword
      })
      collapse()
    } catch (error) {
      setErrors({
        masterPassword: t`Invalid master password`
      })
    } finally {
      clearBuffer(passwordBuffer)
    }
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
          {t`By confirming, this vault will be permanently deleted from the devices listed below. This action cannot be undone.`}
        </Text>

        <View style={styles.devicesContainer}>
          {selectedDevicesList.map((device) => (
            <View key={device.id} style={styles.deviceItem}>
              <PhoneIcon color={colors.white.mode1} size="18" />
              <Text style={styles.deviceName}>{device.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.passwordsContainer}>
          <InputPasswordPearPass
            placeholder={t`Insert master password`}
            isPassword
            as={BottomSheetTextInput}
            testID="delete-vault-master-password"
            {...register('masterPassword')}
          />
          {isProtected && (
            <InputPasswordPearPass
              placeholder={t`Insert vault password`}
              isPassword
              as={BottomSheetTextInput}
              testID="delete-vault-vault-password"
              {...register('vaultPassword')}
            />
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.deleteButton,
              (!values.masterPassword ||
                (isProtected && !values.vaultPassword)) &&
                styles.deleteButtonDisabled
            ]}
            onPress={handleSubmit(handleDelete)}
            disabled={
              !values.masterPassword || (isProtected && !values.vaultPassword)
            }
            testID="delete-vault-final-confirm-button"
            accessibilityLabel={t`Delete vault`}
          >
            <DeleteIcon color={colors.white.mode1} size="20" />
            <Text style={styles.deleteButtonText}>{t`Delete vault`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            testID="delete-vault-final-cancel-button"
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
    marginBottom: 20,
    opacity: 0.8
  },
  devicesContainer: {
    gap: 12,
    marginBottom: 20
  },
  deviceItem: {
    backgroundColor: colors.grey400.mode1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white.mode1,
    flex: 1
  },
  passwordsContainer: {
    gap: 12,
    marginBottom: 20
  },
  buttonsContainer: {
    marginTop: 10,
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
  deleteButtonDisabled: {
    opacity: 0.6
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
