import { extendTheme } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export default extendTheme({
    components: {
        Icon: {
            defaultProps: {
                as: MaterialIcons,
            },
        },
    },
});


export const NavigationTheme = {
    Dark: DarkTheme,
    Light: DefaultTheme
}
