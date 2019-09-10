import React, { useState } from 'react';
import './App.css';
import * as mqtt from './mqtt'


let connection = () => {
  let topics = ['b4:6b:fc:13:12:cc', /*'b4:6b:fc:13:12:aa'*/, 'b4:6b:fc:13:12:ab', 'b4:6b:fc:13:12:ac', /*'b4:6b:fc:13:12:ad'*/, 'b4:6b:fc:13:12:ae', 'b4:6b:fc:13:12:af',
                'b4:6b:fc:13:12:b0', 'b4:6b:fc:13:12:b1', 'b4:6b:fc:13:12:b2'];
  mqtt.connect();
  setTimeout(() => {
    topics.map((val) => {
      mqtt.subscribeTopic(val);
    });
  },1000);
}

function App() {
  let [topic, setTopic] = useState('');
  let [message, setMessage] = useState('');

  return (
    <div className="App">
      {connection()}
      {!mqtt.verifyConnection() ? console.warn("No se encuentra conectado a un servidor mqtt") : ''}
      <div className="flex-row">
        <button onClick={() => mqtt.connect()}>Conectar a broker</button>
      </div>
      <div className="flex-row">
        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="span" placeholder="Topic" />
        <button onClick={() => mqtt.subscribeTopic(topic)}>Suscribir a topic</button>
      </div>
      <div className="flex-row">
        <button onClick={() => mqtt.sendMessage('b4:6b:fc:13:12:cc', 'sf/touch')}>SF1</button>
      </div>
      <div className="flex-row">
        <button onClick={() => mqtt.sendMessage('b4:6b:fc:13:12:ab', 'sf/touch')}>SF2</button>
      </div>
      <div className="flex-row">
        <button onClick={() => mqtt.sendMessage('b4:6b:fc:13:12:ac', 'sf/touch')}>SF3</button>
      </div>
      <div className="flex-row">
        <button onClick={() => mqtt.sendMessage('b4:6b:fc:13:12:ae', 'sf/touch')}>SF4</button>
      </div>
    </div>
  );
}

export default App;
