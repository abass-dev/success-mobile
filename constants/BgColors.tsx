import { useColorScheme } from 'react-native';
import { Colors } from "@/constants/Colors"

const BgColors = () => {
	  const theme = useColorScheme()
    const bgColor = theme === "dark"? Colors.dark.background : Colors.light.background
}

export default BgColors