import React from 'react';
import {View, FlatList, Image, StyleSheet, Dimensions} from 'react-native';

const HorizontalGallery = ({style, gallery}) => {
    const dimensions = Dimensions.get('window').width;

    const renderItem = ({item}) => {
        return (
            <Image
                style={{
                    width: style && style.width ? style.width : dimensions - 30,
                    height: style && style.height ? style.height : 200,
                    resizeMode: 'cover',
                }}
                source={{uri: item}}
            />
        );
    };

    return (
        <View style={[style]}>
            <FlatList
                style={styles.imageContainer}
                data={gallery}
                renderItem={renderItem}
                keyExtractor={(_, indx) => `${indx}`}
                horizontal={true}
                snapToAlignment={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
    },
    // image: {
    //     width: dimensions - 30,
    //     height: 200,
    //     resizeMode: 'cover',
    // },
});

export default HorizontalGallery;
