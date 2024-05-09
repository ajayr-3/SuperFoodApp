import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomWebView from './CustomWebView';
import appsListData from './Data';
import useStyles from './styles';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [webViewUrl, setWebViewUrl] = useState<string>('');
  const styles = useStyles();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const requestLocation = useCallback(async () => {
    try {
      const locationPermRes = await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      if (!['granted', 'limited'].includes(locationPermRes)) {
        Alert.alert('No Location Permission');
      }
    } catch (error) {
      console.log('Error fetching location', error);
    }
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (webViewUrl) {
        setWebViewUrl('');
      } else {
        BackHandler.exitApp();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [webViewUrl]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  if (webViewUrl) {
    return (
      <CustomWebView
        url={webViewUrl}
        style={styles.flex1}
        setUrl={setWebViewUrl}
      />
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <FlatList
        contentContainerStyle={styles.mainContainer}
        data={appsListData}
        numColumns={2}
        renderItem={({item}) => (
          <View key={item.id} style={styles.listItemContainer}>
            <TouchableOpacity
              style={styles.appBtn}
              onPress={() => {
                if (!item.supportWeb) {
                  return Alert.alert(
                    "This site doesn't support ordering from mobile app",
                  );
                }
                setWebViewUrl(item.homePage);
              }}>
              <Text style={styles.appNameText}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default App;
