import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator color="#999" size="large" />
  </View>
);

export default Loading;
