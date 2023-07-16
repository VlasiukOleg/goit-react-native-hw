import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export const PostCard = ({ image, postName, postLocation, userLocation }) => {
  const navigation = useNavigation();

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={styles.image}>
        <Image source={{ uri: image }} style={{ flex: 1 }} />
      </View>

      <Text style={{ marginTop: 8, marginBottom: 8, fontWeight: 700 }}>
        {postName}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CommentsScreen")}
          >
            <Ionicons name="chatbubbles-outline" size={18} color={"#BDBDBD"} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 4, color: "#BDBDBD" }}>0</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              navigation.navigate("MapScreen", {
                userLocation: userLocation,
              })
            }
          >
            <Ionicons name="location-outline" size={18} color={"#BDBDBD"} />
            <Text>{postLocation}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: 240,
    borderRadius: 10,
    overflow: "hidden",
  },
});
