import { View, Image, StyleSheet, Text } from "react-native"

import { auth } from "../../firebase/config";


export const CommentCard = ({userAvatar, comment, date, userId}) => {

    const isCurrentUser = userId === auth.currentUser.userId;

    const newDate = new Date(date);

    const dateOptions = {
        year: 'numeric',
        month: 'long', 
        day: '2-digit', 
      };
      
      const timeOptions = {
        hour: '2-digit', 
        minute: '2-digit', 
      };
      
      const ukrainianDate = new Date(newDate).toLocaleDateString('uk-UA', dateOptions);
      const time = new Date(newDate).toLocaleTimeString('uk-UA', timeOptions);
      const formattedDate = `${ukrainianDate} | ${time}`;

    return (
        <View style={{...styles.commentWrap, flexDirection: isCurrentUser ? "row" : "row-reverse" }}>
            <Image source={{uri: userAvatar}} style={{...styles.avatar, marginRight: isCurrentUser ? 16 : 0, marginLeft: isCurrentUser ? 0 : 16 }}></Image>
            <View style={styles.textWrap}><Text>{comment}</Text><Text style={styles.date}>{formattedDate}</Text></View>
        </View>
    )
}


const styles = StyleSheet.create({
    commentWrap: {
        flexDirection: "row",
        marginBottom: 10,
    },
    textWrap: {
        width: "88%",
        backgroundColor: "#F6F6F6",
        padding: 16,
        borderRadius: 10,
    },
    date: {
        fontSize: 10,
        color: "#BDBDBD",
        alignSelf: "flex-end",
        marginTop: 8,
        
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 16,
      },
})