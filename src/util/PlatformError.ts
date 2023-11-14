import { Platform } from 'react-native'
import { toast as reactToast } from 'react-hot-toast'
import { default as NativeToast } from 'react-native-toast-message'
// import {Toast as reactNativeToast} from 'react-native-toast-message'
// import Toast from 'react-native-toast-message'

export const PlatformError = (error: any) => {
  const message = error.message || error
  console.log(error)
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    // Ensure that 'NativeToast' is defined before calling 'show'
    if (NativeToast) {
      NativeToast.show({ type: 'error', text1: 'Error', text2: message })
    } else {
      console.warn('NativeToast is not available.')
    }
  } else {
    reactToast.error(message, { position: 'bottom-center' })
  }
}
