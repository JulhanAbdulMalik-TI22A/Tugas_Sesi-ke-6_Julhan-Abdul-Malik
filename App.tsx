import {
    View, Text, Image, TouchableOpacity,
    StyleSheet, FlatList, Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}

const App = () => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://reqres.in/api/users?per_page=2');
            setUsers(response.data.data);
        } catch (error) {
            console.log('Fetch Error:', error);
        }
    };

    // POST
    const postData = async () => {
        try {
            const newUsers = [
                {
                    first_name: 'Julhan',
                    last_name: 'A Malik',
                    email: 'julhan.abdul_ti22@nusaputra.ac.id',
                    avatar: 'https://i.pravatar.cc/150?img=12',
                },
                {
                    first_name: 'Abdul',
                    last_name: 'Malik',
                    email: 'abdul_ti22@nusaputra.ac.id',
                    avatar: 'https://i.pravatar.cc/150?img=2',
                },
                {
                    first_name: 'Malik',
                    last_name: 'Julhan',
                    email: 'malik_ti22@nusaputra.ac.id',
                    avatar: 'https://i.pravatar.cc/150?img=4',
                },
            ];

            const response = await axios.post('https://reqres.in/api/users', newUsers[0]);

            const usersWithID = [
                { id: response.data.id, ...newUsers[0] },
                { id: response.data.id + 1, ...newUsers[1] },
                { id: response.data.id + 2, ...newUsers[2] },
            ];

            setUsers((prevUsers) => [...prevUsers, ...usersWithID]);

            Alert.alert('Users Created', 'Users berhasil ditambahkan');
        } catch (error) {
            console.log('Post Error:', error);
        }
    };

    // PUT
    const updateData = async (id: number) => {
        try {
            const updatedUser = {
                first_name: 'Abdul',
                last_name: 'Malik',
                email: 'abdul_ti22@nusaputra.ac.id',
                avatar: 'https://i.pravatar.cc/150?img=55',
            };

            await axios.put(`https://reqres.in/api/users/${id}`, updatedUser);

            // Update state langsung tanpa fetch ulang
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, ...updatedUser } : user
                )
            );

            Alert.alert('User Updated', `User ID: ${id} berhasil di Update`);
        } catch (error) {
            console.log('Update Error:', error);
        }
    };

    // DELETE
    const deleteData = async (id: number) => {
        try {
            await axios.delete(`https://reqres.in/api/users/${id}`);

            // Hapus user dari state langsung
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

            Alert.alert('User Deleted', `User ID: ${id} berhasil di Delete`);
        } catch (error) {
            console.log('Delete Error:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    console.log(users)

    const renderItem = ({ item }: { item: User }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.avatar }}
                style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.name}>
                    {item.first_name} {item.last_name}
                </Text>
                <Text style={styles.email}>
                    {item.email}
                </Text>
                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={() => updateData(item.id)}
                    >
                        <Text style={styles.buttonText}>
                            Update
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteData(item.id)}
                    >
                        <Text style={styles.buttonText}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <>
                        <Text style={styles.header}>
                            API dari Reqres.in - Julhan
                        </Text>

                        <TouchableOpacity style={styles.createButton} onPress={postData}>
                            <Text style={styles.buttonText}>
                                Tambah User
                            </Text>
                        </TouchableOpacity>
                    </>
                }
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
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    createButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 13,
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
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    image: {
        width: 100,
        height: 125,
        marginRight: 12,
    },

    cardContent: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },

    name: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    email: {
        fontSize: 12,
        marginBottom: 4,
        color: '#777',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 17,
    },
    updateButton: {
        backgroundColor: '#FFA500',
        padding: 8,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        padding: 8,
        borderRadius: 5,
    },
})