import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'

export default function HomeLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return null
  }

  // Если не авторизован — перенаправляем на вход
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }

  // Если авторизован — показываем стек экранов
  return <Stack screenOptions={{ headerShown: false }} />
}