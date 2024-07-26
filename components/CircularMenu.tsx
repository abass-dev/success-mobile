import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from "@/constants/Colors"

const CircularMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <View style={styles.container}>
      <ActionButton
        style={styles.actionButton}
        buttonColor="#03325e"
        outRangeScale={0.8}
        
        buttonTextStyle={styles.menuText}
        icon={<Icon name="add" style={styles.menuIcon} />}
        onPress={() => setMenuOpen(!menuOpen)}
        bgColor="rgba(0,0,0,0.7)"
        radius={100}
        offsetY={-60}
        offsetX={-30}
        spacing={25}
        active={menuOpen}
      >
        <ActionButton.Item
          buttonColor={Colors.successPrimary.text}
          title="Add"
          onPress={() => console.log('Add button pressed')}
        >
          <Icon name="add" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={Colors.successPrimary.text}
          title="Edit"
          onPress={() => console.log('Edit button pressed')}
        >
          <Icon name="edit" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={Colors.successPrimary.text}
          title="Delete"
          onPress={() => console.log('Delete button pressed')}
        >
          <Icon name="delete" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={Colors.successPrimary.text}
          title="Delete"
          onPress={() => console.log('Delete button pressed')}
        >
          <Icon name="delete" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={Colors.successPrimary.text}
          title="Delete"
          onPress={() => console.log('Delete button pressed')}
        >
          <Icon name="delete" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={Colors.successPrimary.text}
          title="Delete"
          onPress={() => console.log('Delete button pressed')}
        >
          <Icon name="delete" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={Colors.successPrimary.text}
          title="Delete"
          onPress={() => console.log('Delete button pressed')}
        >
          <Icon name="delete" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={Colors.successPrimary.text}
          title="Delete"
          onPress={() => console.log('Delete button pressed')}
        >
          <Icon name="delete" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );

<ViewView url="httlfk">
	
</ViewView>
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "8.5%",
    left: 50,
    right: 50,
  },
  menuIcon: {
    fontSize: 24,
    color: '#fff',
  },
  menuText: {
    color: '#fff',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  
});

export default CircularMenu;