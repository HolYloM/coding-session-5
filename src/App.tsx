import React from 'react';
import logo from './logo.svg';
import {Header, Divider} from 'semantic-ui-react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/firestore";
import { timingSafeEqual } from 'crypto';

const firebaseConfig = {
  apiKey: "AIzaSyCm60kMZo4ayzEOUTEIM_XjOmeilrWI_Rw",
  authDomain: "simplechatapp-481e5.firebaseapp.com",
  databaseURL: "https://simplechatapp-481e5.firebaseio.com",
  projectId: "simplechatapp-481e5",
  storageBucket: "simplechatapp-481e5.appspot.com",
  messagingSenderId: "625311044714",
  appId: "1:625311044714:web:8b6b429eefdb5adbc06613"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

interface ChatMessage {
  author: string;
  message: string;
  timestamp: number;
}

 interface AppProps {
  headerText: string
}

interface AppState {
  loadedChatMessages: Array<ChatMessage>;
}

class App extends React.Component<AppProps,AppState> {  
  state = {
    loadedChatMessages: [{
      author: 'moritz',
      message: 'Test message until DB is loaded',
      timestamp: Date.now(),
    }]
  } as AppState

  componentDidMount() {
    db.collection('ChatMessages').onSnapshot((query) => {
     const chatPostDbDocs =query.docs;
     const chatPosts: Array<ChatMessage> =[];
     for (let i = 0; i <chatPostDbDocs.length; i++) {
       const chatPost = chatPostDbDocs[i].data() as ChatMessage;
       chatPosts.push(chatPost)
     }
     this.setState({
       loadedChatMessages: chatPosts
     })
    })
  }

  render() {
    const chatMessageDivs = [];
    for (let i = 0; i < this.state.loadedChatMessages.length; i++) {
      const chatMessage = this.state.loadedChatMessages[i];
      chatMessageDivs.push(<div>{chatMessage.message}</div>);
    }
    return (
      <div className="App">
      <Header color='red'>{this.props.headerText}</Header>
      {chatMessageDivs}
        
      </div>
    );
    }
  }
 export default App;
