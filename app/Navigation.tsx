import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'
import Home from './views/Home'
import QRCode from './views/QRCode'
import Exhibitors from './views/Exhibitors'

const Tab = createBottomTabNavigator()

function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 30,
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
              color={focused ? '#000000' : '#666666'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="QRCode"
        component={QRCode}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="qrcode"
              size={24}
              color={focused ? '#000000' : '#666666'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Exhibitors"
        component={Exhibitors}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="isv"
              size={24}
              color={focused ? '#000000' : '#666666'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default Navigation
