import React, { useContext } from 'react'
import RightSec from './RightSec'
import LeftSec from './LeftSec'
import Chat from './Chat'
import './ChatBox.css'
import { Component, captureOwnerStack } from 'react'
import { Appcontext } from '../../Context/Context'

const ChatBox = () => {

  class ErrorBoundary extends Component {
    constructor (props) {
      super (props);
      this.state = {hasError:false};
    };

    static getDerivedStateFromError (error) {
      return {hasError:true};
    }

    // componentDidCatch (error,info) {
    //   logErrorToMyService (
    //     error,
    //     info.componentStack,captureOwnerStack ());
    // }

    render () {
      if (this.state.hasError) {
        return this.props.fallback;
      } else {
        return this.props.children;
      }
    }
  };
  return (
    <div className='chat-box'>
      <ErrorBoundary fallback={<div class="spinner center">
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
</div>}>
      <LeftSec/>
      <Chat/>
      <RightSec/>      
        </ErrorBoundary>
    </div>
  )
}

export default ChatBox
