import React from 'react';
import { ConnectionConsumer, ChannelConsumer } from './App';
import MainWrapper from './MainWrapper';

const ContextWrapper = () => {
  return (
    <ConnectionConsumer>
      {({ connection, updateConnection }) => (
        <ChannelConsumer>
          {({ channel, updateChannel }) => (
            <MainWrapper
              currentConnection={connection}
              currentChannel={channel}
              updateCurrentConnection={updateConnection}
              updateCurrentChannel={updateChannel}></MainWrapper>
          )}
        </ChannelConsumer>
      )}
    </ConnectionConsumer>
  );
};

export default ContextWrapper;
