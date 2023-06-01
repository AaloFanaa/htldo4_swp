import React, { useState, createContext } from 'react';
import ContextWrapper from './ContextWrapper';

const ConnectionContext = createContext({
  connection: null,
  updateConnection: (connection: any) => {},
});
const ChannelContext = createContext({
  channel: null,
  updateChannel: (channel: any) => {},
});

const App = () => {
  const [connection, setconnection] = useState(null);
  const [channel, setChannel] = useState(null);
  const updateConnection = (conct: any) => {
    setconnection(conct);
  };
  const updateChannel = (chnnl: any) => {
    setChannel(chnnl);
  };

  return (
    <ConnectionContext.Provider value={{ connection, updateConnection }}>
      <ChannelContext.Provider value={{ channel, updateChannel }}>
        <ContextWrapper />
      </ChannelContext.Provider>
    </ConnectionContext.Provider>
  );
};

export const ConnectionConsumer = ConnectionContext.Consumer;
export const ChannelConsumer = ChannelContext.Consumer;
export default App;
