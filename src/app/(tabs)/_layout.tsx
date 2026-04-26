import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'nativewind';

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const tabTintColor = isDark ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)";

  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }


  return <NativeTabs  tintColor={tabTintColor}>
      <NativeTabs.Trigger name="index">
        <Label>List</Label>
        <Icon sf="list.bullet.clipboard" drawable="list_24" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="planner">
        <Icon sf="plus.circle"  drawable="add_circle" />
        <Label >Planner</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="insights">
        <Icon sf="chart.bar" drawable="bar_chart" />
        <Label>Insights</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
}