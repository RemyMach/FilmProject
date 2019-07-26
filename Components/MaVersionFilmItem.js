import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class FilmItem extends React.Component {
  render() {
    return (
        <View style={styles.main_container}>
            <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
            style={{ flex: 1}} />
            <View style={ styles.text_contenu }>
                <View style={ styles.title_container }>
                    <View style={styles.title_text}><Text>Titre du film</Text></View>
                    <View style={styles.title_vote}><Text>Vote</Text></View>
                </View>
                <View style={styles.description}><Text>Description</Text></View>
                <View style={styles.date}><Text>Sortie le 00/00/0000</Text></View>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row',
        borderWidth: 3,
        marginTop: 20
    },
    title_container: {
        flexDirection: 'row',
        flex: 0.5
    },
    title_text: {
        flex: 2,
        borderWidth: 1,
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        textAlign: 'left'
    },
    title_vote: {
        flex: 1,
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    text_contenu: {
        flex: 1
    },
    description: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    date: {
        flex: 0.5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderWidth: 1
    }
})

export default FilmItem