import { extendTheme } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default extendTheme({
    components: {
        Icon: {
            defaultProps: {
                as: MaterialIcons,
            },
        },
    },
});
