import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'
import { Image, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './views/Home'
import { useCustomTheme } from './utils/Theme'

import QRCodeModal from './components/QRCode/QRCodeModal'
import { useToggle } from './hooks'
import ExhibitorStack from './components/Exhibitors/ExhibitorStack'
import CVTheque from './views/CVTheque'
import ViewCV from './views/ViewCV'
import ProgramStack from './views/Journeys/JourneyStack'

const logos = {
  dark: require('../assets/allwhite.png'),
  light: require('../assets/header_light.png'),
}

const Tab = createBottomTabNavigator()

function MyModalBackgroundScreen() {
  return null
}

function CV() {
  const CVStack = createNativeStackNavigator()

  return (
    <CVStack.Navigator initialRouteName="CV">
      <CVStack.Screen
        name="List"
        component={CVTheque}
        options={{
          headerShown: false,
        }}
      />
      <CVStack.Screen
        name="ViewCV"
        component={ViewCV}
        options={{
          headerBackVisible: true,
          headerShown: false,
        }}
      />
    </CVStack.Navigator>
  )
}

function Navigation() {
  const { colors } = useCustomTheme()
  const logo = logos.dark

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
          headerBackground: () => (
            <LinearGradient
              colors={[
                colors.gradient100,
                colors.gradient200,
                colors.gradient300,
                colors.primary200,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: '100%',
                height: 90,
                marginBottom: 24,
                backgroundColor: colors.primary,
                borderBottomEndRadius: 30,
                borderBottomStartRadius: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8,
              }}
            />
          ),
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
          name="Programs"
          component={ProgramStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="find"
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
          name="CV"
          component={CV}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="file1"
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
          name="Exhibitors"
          component={ExhibitorStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="isv"
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
