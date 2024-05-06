import React, {Dispatch, SetStateAction} from 'react';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import WebView from 'react-native-webview';
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
  return (
    <View style={styles.flex1}>
      <WebView source={{uri: url}} style={style} />
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
