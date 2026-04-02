import { useUser } from '@clerk/expo'
import { useClerk } from '@clerk/expo'
import { UserButton, UserProfileView } from '@clerk/expo/native'
import { Text, View, Pressable, StyleSheet } from 'react-native'

export default function HomePage() {
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>Hello {user?.emailAddresses[0]?.emailAddress}</Text>
      
      <Pressable style={styles.button} onPress={() => signOut()}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>

      <View style={{ width: 36, height: 36, borderRadius: 18, overflow: 'hidden', marginTop: 20 }}>
        <UserButton />
      </View>

      <UserProfileView style={{ flex: 1, marginTop: 20 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
})