import TopBar from "@/components/top-bar";
import { useAuth, useIsFirstTime } from "@/core";
import { Redirect, SplashScreen, Tabs } from "expo-router";
import {
  CompassIcon,
  HomeIcon,
  ListMinusIcon,
  TrophyIcon,
  UserIcon,
} from "lucide-react-native";
import React, { useCallback, useEffect } from "react";

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== "idle") {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === "signOut") {
    return <Redirect href="/auth/select" />;
  }

  return (
    <>
      <TopBar xp={100} points={200} />
      <Tabs
        screenOptions={{
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
            tabBarIcon: ({ color }) => (
              <ListMinusIcon color={color} size={24} />
            ),
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
    </>
  );
}
