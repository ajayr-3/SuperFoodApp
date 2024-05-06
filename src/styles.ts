import {StyleSheet, useWindowDimensions} from 'react-native';

const useStyles = () => {
  const {height: windowHeight, width: windowWidth} = useWindowDimensions();
  return StyleSheet.create({
    flex1: {flex: 1},
    mainContainer: {
      width: '100%',
      height: '100%',
      padding: 12,
      justifyContent: 'space-between',
    },
    listItemContainer: {
      borderWidth: 2,
      borderColor: 'yellow',
      width: (windowWidth - 25) * 0.48,
      margin: 2,
      borderRadius: 5,
      height: windowHeight * 0.17,
      maxHeight: 150,
    },
    appBtn: {flex: 1, alignContent: 'center', justifyContent: 'center'},
    appNameText: {
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20,
    },
    crossBtnContainer: {
      position: 'absolute',
      right: 0,
      top: 0,
      marginRight: 10,
      zIndex: 1,
      transform: [{rotate: '45deg'}],
    },
    crossBtnText: {
      fontSize: 50,
      color: 'black',
    },
  });
};

export default useStyles;
