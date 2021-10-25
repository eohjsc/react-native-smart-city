import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Colors } from '../../../configs';

export default StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: Colors.White,
      },
      rightComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 18,
        paddingRight: 10
      },
      iconPlus:{
          marginRight: 22
      },
})