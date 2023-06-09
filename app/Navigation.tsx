import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'
import { Image, Pressable, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import Home from './views/Home'
import ConferenceList from './views/ConferenceView'
import { useCustomTheme } from './utils/Theme'

import QRCodeModal from './components/QRCode/QRCodeModal'
import { useAppSelector, useToggle } from './hooks'
import ExhibitorStack from './components/Exhibitors/ExhibitorStack'
import CVTheque from './views/CVTheque'
import ViewCV from './views/ViewCV'
import Profile from './views/Profile'
import ProgramStack from './views/Journeys/JourneyStack'

const logos = {
  dark: require('../assets/allwhite.png'),
  light: require('../assets/header_light.png'),
}

const Tab = createBottomTabNavigator()

function MyModalBackgroundScreen() {
  return null
}

function HomeStackView() {
  const HomeStack = createNativeStackNavigator()

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeView"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ViewCVHome"
        component={ViewCV}
        options={{
          headerBackVisible: true,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Exhibitors"
        component={ExhibitorStack}
        options={{
          headerBackVisible: true,
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  )
}

function Navigation() {
  const { colors } = useCustomTheme()
  const logo = logos.dark
  const navigation = useNavigation()

  const [isOpen, toggle] = useToggle()
  const { user } = useAppSelector(state => state.tickets)
  const { isFilled } = useAppSelector(state => state.kyc)

  const headerOptions = {
    headerTitle: () => (
      <Image
        source={logo}
        style={{
          height: 50,
          width: 300,
          marginTop: -15,
          marginLeft: -35,
          resizeMode: 'contain',
        }}
      />
    ),

    headerRight: () => {
      if (!user.firstname || !isFilled) {
        return null
      }
      return (
        <Pressable
          style={{
            width: 50,
            height: 35,
          }}
        >
          <AntDesign
            name="user"
            size={24}
            color="white"
            onPress={() => navigation.navigate('Profile')}
          />
        </Pressable>
      )
    },
    headerLeft: () => {
      if (!user.firstname || !isFilled) {
        return null
      }
      return (
        <Pressable
          style={{
            height: 35,
            marginLeft: 20,
          }}
        >
          {navigation.getCurrentRoute()?.name !== 'HomeView' && (
            <AntDesign
              name="left"
              size={24}
              color="white"
              onPress={() => {
                navigation.goBack()
              }}
            />
          )}
        </Pressable>
      )
    },
  }

  function NetworkingStack() {
    const NetworkignStack = createNativeStackNavigator()

    return (
      <NetworkignStack.Navigator initialRouteName="CVTheque">
        <NetworkignStack.Screen
          name="CVTheque"
          component={CVTheque}
          options={{
            headerShown: false,
          }}
        />
        <NetworkignStack.Screen
          name="ViewCV"
          component={ViewCV}
          options={{
            headerBackVisible: true,
            headerShown: false,
          }}
        />
      </NetworkignStack.Navigator>
    )
  }

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
            borderColor: colors.border,
            borderWidth: 1,
            borderTopColor: colors.border,
            borderTopWidth: 1,
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
          component={HomeStackView}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={24}
                color={focused ? colors.primary : colors.border}
              />
            ),
            ...headerOptions,
          }}
        />
        <Tab.Screen
          name="Conferences"
          component={ConferenceList}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="notification"
                size={24}
                color={focused ? colors.primary : colors.border}
              />
            ),
            ...headerOptions,
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
                  colors.primary100,
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
          name="Networking"
          component={NetworkingStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="team"
                size={24}
                color={focused ? colors.primary : colors.border}
              />
            ),
            ...headerOptions,
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
            ...headerOptions,
          }}
        />
      </Tab.Navigator>
      {isOpen && <QRCodeModal {...{ toggle, navigation }} />}
    </>
  )
}

export default Navigation
