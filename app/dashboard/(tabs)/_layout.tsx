import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import ByDashboardAnalyticsIcon from '@/components/svgs/DashboardAnalytics';
import ByDashboardHomeIcon from '@/components/svgs/DashboardHomeIcon';
import ByDashboardProfileIcon from '@/components/svgs/DashboardProfile';
import Colors from '@/constants/Colors';

// Custom tab button component
const CustomTabButton = ({ children, onPress, accessibilityState }: BottomTabBarButtonProps) => {
  return (
    <Pressable
      className="flex-row justify-center items-center p-2 rounded-full"
      onPress={onPress}
      style={({ pressed }) => [
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 8,
          borderRadius: 8,

          backgroundColor:
            pressed || accessibilityState?.selected ? Colors.secondary[200] : 'transparent',
        },
      ]}
      android_ripple={{ color: Colors.secondary[300], borderless: false, radius: 50 }}
    >
      {children}
    </Pressable>
  );
};

// Dashboard layout
export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        title: '',
        tabBarActiveTintColor: Colors.secondary.base,
        tabBarInactiveTintColor: Colors.secondary[600],
        headerPressColor: Colors.secondary[100],
        tabBarButton: props => <CustomTabButton {...props} />,
        tabBarStyle: {
          paddingTop: 18,
          paddingBottom: 18,
          paddingHorizontal: 48,
          borderTopWidth: 1,
          elevation: 0,
          borderColor: Colors.secondary[300],
          backgroundColor: Colors.secondary[100],
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ tabBarIcon: ({ color }) => <ByDashboardHomeIcon color={color} /> }}
      />

      <Tabs.Screen
        name="analytics"
        options={{ tabBarIcon: ({ color }) => <ByDashboardAnalyticsIcon color={color} /> }}
      />

      <Tabs.Screen
        name="profile"
        options={{ tabBarIcon: ({ color }) => <ByDashboardProfileIcon color={color} /> }}
      />
    </Tabs>
  );
}
