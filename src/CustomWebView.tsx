import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import WebView, {WebViewNavigation} from 'react-native-webview';
import useStyles from './styles';

const CustomWebView = ({
  url,
  style,
  setUrl,
}: {
  url: string;
  style: ViewStyle;
  setUrl: Dispatch<SetStateAction<string>>;
}) => {
  const styles = useStyles();
  const webViewRef = useRef<WebView | null>();
  const [currentURI, setCurrentURI] = useState(url);

  const handleWebViewNavigationStateChange = useCallback(
    async (newNavState: WebViewNavigation) => {
      try {
        console.log('To url', newNavState.url);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  return (
    <View style={styles.flex1}>
      <WebView
        ref={ref => (webViewRef.current = ref)}
        source={{uri: url}}
        style={style}
        allowsBackForwardNavigationGestures
        onNavigationStateChange={handleWebViewNavigationStateChange}
        onShouldStartLoadWithRequest={request => {
          // not working
          console.log(request);
          // If we're loading the current URI, allow it to load
          if (request.url === currentURI) {
            return true;
          }
          // We're loading a new URL -- change state first
          setCurrentURI(request.url);
          return true;
        }}
      />
      <View style={styles.crossBtnContainer}>
        <TouchableOpacity
          onPress={() => {
            setUrl('');
          }}>
          <Text style={styles.crossBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomWebView;
