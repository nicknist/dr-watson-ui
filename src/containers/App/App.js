import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../Header/Header';
import WelcomeModal from '../WelcomeModal/WelcomeModal';
import ChatBox from '../ChatBox/ChatBox';
import { removeUser, hasErrored, clearMessages, addMessage } from '../../actions';
import { endConversation } from '../../apiCalls';
import './App.css';

export class App extends Component {

  signOut = async () => {
    try {
      await endConversation();
      this.props.removeUser();
      this.props.clearMessages();
    } catch({ message }) {
      this.props.hasErrored(message);
    }
  }

  render() {
    const { user, messages } = this.props;
    return (
      <div className="App">
        <Header signOut={this.signOut} />
        {!user && <WelcomeModal addMessage={this.props.addMessage} />}
        {user && <ChatBox addMessage={this.props.addMessage} messages={messages} />}
      </div>
    );
  }
}

export const mapStateToProps = ({ user, messages }) => ({
  user,
  messages
});

export const mapDispatchToProps = dispatch =>  bindActionCreators({ removeUser, hasErrored, clearMessages, addMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
