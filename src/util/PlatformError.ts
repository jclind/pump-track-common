// import { Platform } from 'react-native'
// import { toast as reactToast } from 'react-hot-toast'
// import Toast from 'react-native-toast-message'
import { ENVIRONMENT_KEY } from '..'
// import {Toast as reactNativeToast} from 'react-native-toast-message'
// import Toast from 'react-native-toast-message'

interface ToastModule {
  show: (options: { type: string; text1: string; text2?: string }) => void
}

export const PlatformError = async (error: any) => {
  try {
    const message = error.message || error
    console.log(error)

    if (ENVIRONMENT_KEY && ENVIRONMENT_KEY === 'mobile') {
      const { default: Toast }: { default: ToastModule } = await import(
        'react-native-toast-message'
      )
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: 'Please try again',
      })
    } else {
      const toast = await import('react-hot-toast')
      toast.default.error(message, { position: 'bottom-center' })
    }
  } catch (error: any) {
    console.error('Error handling platform error:', error)
  }
}
