import {
    View, Text, Image, ScrollView, TouchableOpacity,
    StyleSheet, FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Data {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const App = () => {
    const [datas, setData] = useState<Data[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products?limit=5');
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const postData = async () => {
        try {
            const newData = {
                title: 'Le Mineral',
                price: 10.5,
                description: 'A Good Water',
                image: 'https://i.pravatar.cc',
                category: 'water',
            };
            const response = await axios.post(
                'https://fakestoreapi.com/products',
                newData
            );
            console.log(response.data);
            console.log(response.status);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderItem = ({ item }: { item: Data }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.category}>Category: {item.category}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Hello World!</Text>

            <TouchableOpacity style={styles.button} onPress={postData}>
                <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>

            <FlatList
                data={datas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f3f4f6',
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 16,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 12,
    },
    cardContent: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#4CAF50',
    },
    description: {
        fontSize: 14,
        marginBottom: 4,
        color: '#777',
    },
    category: {
        fontSize: 12,
        color: '#999',
    },
})