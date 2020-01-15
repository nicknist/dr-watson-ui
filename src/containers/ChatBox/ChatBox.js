import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hasErrored, addMessage } from '../../actions';
import { postMessage } from '../../apiCalls';
import Message from '../../components/Message/Message'

import "./ChatBox.css"

export class ChatBox extends Component {
  constructor() {
    super();
    this.state = { message: '' }
    this.convo = createRef();
  }

  componentDidUpdate() {
    this.convo.scrollTop = this.convo.scrollHeight;
  }

  handleChange = e => {
    this.setState({ message: e.target.value });
  }

  handleSubmit = e => {
    if (e.key === 'Enter' || e.button === 0) {
      const { message } = this.state;
      this.props.addMessage(message, true);
      this.setState({ message: '' });
      this.messageChatBot();
    }
  }

  messageChatBot = async () => {
    try {
      const messageResponse = await postMessage(this.state.message);
      this.props.addMessage(messageResponse.message, false);
    } catch({ message }) {
      this.props.hasErrored(message)
    }
  }

  render() {
    const { message } = this.state;
    const { messages, errorMsg } = this.props;
    const survey = messages.map((message, i) => {
      return <Message
        key={`message${i}`}
        message={message.message}
        isUser={message.isUser}
      />
    })
    return (
      <main className="chat-container">
        <section className="conversation" ref={node => this.convo = node}>
          {survey}
          {errorMsg && <p className="message watson error">{errorMsg}</p>}
        </section>
        <section className="messenger">
          <input
            placeholder='Chat with Survey Bot here...'
            value={message}
            onChange={this.handleChange}
            onKeyPress={this.handleSubmit}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </section>
      </main>
    )
  }
}

export const mapStateToProps = ({ errorMsg, messages }) => ({
  errorMsg,
  messages
})

export const mapDispatchToProps = dispatch => bindActionCreators({ hasErrored, addMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
