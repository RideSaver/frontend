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
        Text: {
            variants: {
                info: {
                    _light: { color: 'muted.500' },
                    _dark: { color: 'muted.300' },
                }
            }
        },
        Divider: {
            baseStyle: {
                mt: 4
            }
        }
    },
});


export const NavigationTheme = {
    Dark: DarkTheme,
    Light: DefaultTheme
}
