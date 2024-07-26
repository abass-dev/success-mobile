import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors"

export default function WavyHeader({ customStyles }) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: Colors.successPrimary.background, height: 160 }}>
        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", top: 130 }}
        >
          <Path
            fill={Colors.successPrimary.background}
          d="M0,32L48,32C96,32,192,32,288,74.7C384,117,480,203,576,218.7C672,235,768,181,864,186.7C960,192,1056,256,1152,261.3C1248,267,1344,213,1392,186.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
          "
          />
          
        </Svg>
      </View>
    </View>
  );
}
