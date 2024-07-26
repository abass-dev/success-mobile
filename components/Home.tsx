import React, { useEffect, useRef } from 'react'
import { Animated, ImageBackground, Dimensions, StyleSheet, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import HomeCard from "@/components/cards/HomeCard"
import { Colors } from "@/constants/Colors"

// Logo....
import Logo from '@/assets/images/success-logo.png';

const BGColor = "#4D4A95"

export default function Home() {

    // SafeArea Value...
    const edges = useSafeAreaInsets();

    // Animation Values....
    const startAnimation = useRef(new Animated.Value(0)).current;

    // Scaling Down Both logo and Title...
    const scaleLogo = useRef(new Animated.Value(1)).current;
    const scaleTitle = useRef(new Animated.Value(1)).current;

    // Offset Animation....
    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    // Animating COntent...
    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    // Animation Done....
    useEffect(() => {

        // Starting Animation after 500ms....
        setTimeout(() => {

            // Parallel Animation...
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        // For same Height for non safe Area Devices...
                        toValue: -Dimensions.get('window').height + (edges.top +
                        85),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        // Scaling to 0.35
                        toValue: 0.35,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleTitle,
                    {
                        // Scaling to 0.8
                        toValue: 0.8,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        // Moving to Right Most...
                        toValue: {
                            x: (Dimensions.get("window").width / 2) - 35,
                            y: (Dimensions.get('window').height / 2) - 10
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveTitle,
                    {
                        // Moving to Right Most...
                        toValue: {
                            x: 0,
                            // Since image size is 100...
                            y: (Dimensions.get('window').height / 2) - 90
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ])
                .start();

        }, 500);

    }, [])

    // Going to Move Up like Nav Bar...
    return (

        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }}>
            <Animated.View style={{
                flex: 1,
                backgroundColor: Colors.dark.background,
                zIndex: 1,
                transform: [
                    { translateY: startAnimation }
                ]
            }}>

                <Animated.View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Animated.Image source={Logo} style={{
                        width: 125,
                        height: 100,
                        marginBottom: 20,
                        transform: [
                            { translateX: moveLogo.x },
                            { translateY: moveLogo.y },
                            { scale: scaleLogo },

                        ]
                    }}></Animated.Image>

                    <Animated.Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'white',
                        transform: [
                            { translateY: moveTitle.y },
                            { scale: scaleTitle }
                        ]
                    }}>WELCOME</Animated.Text>

                </Animated.View>

            </Animated.View>

            <Animated.View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: Colors.dark.background,
                zIndex: 0,
                transform: [
                    { translateY: contentTransition }
                ]
            }}>
            
            <ImageBackground
            source={require("@/assets/images/home-bg.png")}
            imageStyle={{
             opacity:0.02
            }}
            style={{
            flex: 1, 
            }}
            
            >
                <ThemedView style={styles.mainContent}>
                	<ThemedText style={styles.title} type="title">Success Com Niger</ThemedText>
                	<ThemedText style={styles.title}>We Make The Difference</ThemedText>
                </ThemedView>
              {/**  
              **/}
              <HomeCard />
            </ImageBackground>

            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
	mainContent: {
	  marginTop: "58%",
	 backgroundColor: "transparent"
	},
	title: {
	  textAlign: "center",
	  color: "white"
	}
})