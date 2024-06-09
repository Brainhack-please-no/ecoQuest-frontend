import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import {
  CompassIcon,
  HomeIcon,
  ListMinusIcon,
  TrophyIcon,
  UserIcon,
} from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FAEDCD",
          borderTopWidth: 2,
          borderTopColor: "#D4A373",
        },
      }}
    >
      <Tabs.Screen
        name="discover/index"
        options={{
          title: "Discover",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <CompassIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="timeline/index"
        options={{
          title: "Timeline",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <ListMinusIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard/index"
        options={{
          title: "Leaderboard",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <TrophyIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile/[user]"
        options={{
          title: "Profile",
          tabBarLabel: "",
          href: "/profile/evanbacon",
          tabBarIcon: ({ color }) => <UserIcon color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
