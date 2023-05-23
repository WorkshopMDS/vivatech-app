import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'
import { View, Image, useColorScheme } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Home from './views/Home'
import ConferenceList from './views/ConferenceList'
import { useCustomTheme } from './utils/Theme'

import QRCodeModal from './components/QRCode/QRCodeModal'
import useToggle from './utils/useToggle'

const logos = {
  dark: require('../assets/header_dark.png'),
  light: require('../assets/header_light.png'),
}

const Tab = createBottomTabNavigator()

function MyModalBackgroundScreen() {
  return null
}

function Navigation() {
  const { colors } = useCustomTheme()
  const scheme = useColorScheme()
  const isDarkMode = scheme === 'dark'
  const logo = logos[isDarkMode ? 'dark' : 'light']

  const [isOpen, toggle] = useToggle()

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 30,
            borderTopWidth: 0,
            paddingBottom: 0,
            height: 56,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={24}
                color={focused ? colors.primary : colors.border}
              />
            ),
            headerTitle: () => (
              <Image
                source={logo}
                style={{
                  height: 50,
                  width: 300,
                  marginTop: -15,
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Conferences"
          component={ConferenceList}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="meh"
                size={24}
                color={focused ? colors.primary : colors.border}
              />
            ),
            headerTitle: () => (
              <Image
                source={logo}
                style={{
                  height: 50,
                  width: 300,
                  marginTop: -15,
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="QRCode"
          component={MyModalBackgroundScreen}
          options={{
            tabBarIcon: () => (
              <LinearGradient
                colors={[
                  colors.gradient100,
                  colors.gradient200,
                  colors.gradient300,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  height: 64,
                  width: 64,
                  marginBottom: 24,
                  backgroundColor: colors.primary,
                  borderRadius: 500,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 8,
                }}
              >
                <View style={{}}>
                  <AntDesign name="qrcode" size={40} color="white" />
                </View>
              </LinearGradient>
            ),
          }}
          listeners={() => ({
            tabPress: event => {
              event.preventDefault()
              toggle()
            },
          })}
        />
        <Tab.Screen
          name="BUFFER"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={24}
                color={focused ? colors.primary : colors.border}
              />
            ),
            headerTitle: () => (
              <Image
                source={logo}
                style={{
                  height: 50,
                  width: 300,
                  marginTop: -15,
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
      {isOpen && <QRCodeModal {...{ toggle }} />}
    </>
  )
}

export default Navigation
