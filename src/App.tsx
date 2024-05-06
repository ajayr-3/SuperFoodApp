import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
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
