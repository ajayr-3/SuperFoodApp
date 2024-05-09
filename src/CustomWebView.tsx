import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
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
  const handleMessage = (event: WebViewMessageEvent) => {
    // const requestInfo = JSON.parse(event.nativeEvent.data);
    console.log('event data is:', event);
    // You can process the network request data here
  };

  const INJECTED_JAVASCRIPT = `(function() {
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        this.addEventListener("load", function() {
            var message = {"status" : this.status, "response" : this.response}
            window.ReactNativeWebView.postMessage({message});
        });
        open.apply(this, arguments);
    };})();`;

  return (
    <View style={styles.flex1}>
      <WebView
        ref={ref => (webViewRef.current = ref)}
        source={{uri: url}}
        style={style}
        allowsBackForwardNavigationGestures
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={handleMessage}
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
