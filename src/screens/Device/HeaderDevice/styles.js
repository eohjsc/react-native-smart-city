import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from '../../../configs/Constants';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 7,
    paddingRight: 10,
    paddingBottom: 6,
    paddingTop: getStatusBarHeight(),
  },
  button: {
    width: 35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    flexDirection: 'row',
  },
  buttonStar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});