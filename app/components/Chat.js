import React, {Component} from 'react';
import {Text, ListItem, Left, Thumbnail, Body, Right, SwipeRow, Button, Icon} from 'native-base';
import Meteor, {createContainer} from 'react-native-meteor';
import moment from 'moment';
import {MO} from '../MO';
import Avatar from './Avatar';

class Chat extends Component{

  handleGoToMessages(chatName){
    const {chat, user, navigator, toUser} = this.props;


    navigator.push({
      screen: 'push.Messages',
      passProps: {
        chatId: chat._id,
        chatName: chatName,
        toUser: toUser
      },
    })
  }

  render(){
      const {key, chat, user} = this.props;

      //use default chat.name if type==public, else type==private use username (members) who is not currentLoggedInUser
      let chatName = chat.name;
      let toUser = null;
      let avatarUri = null;
      if(chat.type == "private" && chat.members){
        if(chat.members[0]._id != user._id){
          chatName = chat.members[0].profile.firstName + " " + chat.members[0].profile.lastName;
          toUser = chat.members[0];
        }else{
          chatName = chat.members[1].profile.firstName + " " + chat.members[1].profile.lastName;
          toUser = chat.members[1];
        }
        avatarUri = toUser.profile.picture? toUser.profile.picture: null;
      }

      return (
        <ListItem avatar key={key} onPress={()=>this.handleGoToMessages(chatName, toUser)}>
          <Left>
            <Avatar
              uri={avatarUri? avatarUri: null}
              text={avatarUri? null: chatName}
            />
          </Left>
          <Body>
            <Text>{chatName}</Text>
            <Text note>{chat.lastMessage.message}</Text>
          </Body>
          <Right>
            <Text note>{moment(chat.lastMessage.date).format("hh:mm A")}</Text>
          </Right>
        </ListItem>
      )
  }

}

export default createContainer((props) => {

  return {
    user: MO.user()
  }

}, Chat);
