import React, {Dispatch, SetStateAction, useCallback, useRef} from 'react';
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
        onNavigationStateChange={handleWebViewNavigationStateChange}
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
