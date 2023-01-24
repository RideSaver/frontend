import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Screens from "@RideSaver/screens";


const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Screens.Home} />
    </Drawer.Navigator>
    )
  };
