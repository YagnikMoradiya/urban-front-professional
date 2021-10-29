import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { CustomAvatar } from '.';
import { COLORS } from '../utils/theme';

const CustomListItem = ({ data, navigation }) => {
  const [ messages, setMessages ] = useState([]);
  const { shop } = useSelector(state => state.shopData);

  const friendsId = data.members.find(x => x !== shop.id);

  const friendsData = {
    image: data[ `${friendsId}_image` ],
    name: data[ `${friendsId}_name` ],
  };


  useEffect(() => {
    //
  }, []);

  return (
    <ListItem
      bottomDivider={true}
      onPress={() =>
        navigation.navigate('Chat', {
          id: data._id,
          image: friendsData.image,
          chatName: friendsData.name,
          friendsId,
        })
      }>
      <Avatar
        rounded
        source={{
          uri: friendsData.image,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          {friendsData.name}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {data.lastMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
