import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Produto from "../Produto/produto";

function HomeScreen() {
  return <View style={styles.container}></View>;
}

function ListScreen() {
  return <View style={styles.container}></View>;
}

function PostScreen() {
  return (<Produto/>);
}

function NotificationsScreen() {
  return <View style={styles.container}></View>;
}

function SettingsScreen() {
  return <View style={styles.container}></View>;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Listar":
                iconName = "list";
                break;
              case "Produtos":
                iconName = "code";
                break;
              default:
                iconName = "";
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#96BB48",
          inactiveTintColor: "#777",
          showLabel: true,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Listar" component={ListScreen} />
        <Tab.Screen name="Produtos" component={PostScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E2F0C4",
  },
  iconTabRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#96BB48",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
