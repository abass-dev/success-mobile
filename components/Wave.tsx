// Wave.js
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const Wave = () => {
  return (
    <View style={styles.waveContainer}>
      <Svg height={height * 0.25} width={width} viewBox={`0 0 ${width} ${height * 0.25}`} style={styles.wave}>
        <Path
          d={`M0,0 Q${width * 0.5},${height * 0.25} ${width},0 L${width},${height * 0.25} L0,${height * 0.25} Z`}
          fill="#6BCB77"
        />
        <Path
          d={`M0,${height * 0.05} Q${width * 0.5},${height * 0.3} ${width},${height * 0.05} L${width},${height * 0.25} L0,${height * 0.25} Z`}
          fill="#4F6D7A"
        />
        <Path
          d={`M0,${height * 0.1} Q${width * 0.5},${height * 0.35} ${width},${height * 0.1} L${width},${height * 0.25} L0,${height * 0.25} Z`}
          fill="#2D5D7B"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  waveContainer: {
    position: 'absolute',
    width: '100%',
    height: height * 0.25,
  },
  wave: {
    position: 'absolute',
    top: 0,
  },
});

export default Wave;
