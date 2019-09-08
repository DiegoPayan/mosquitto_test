import React, { useState } from 'react';
import './App.css';
import * as mqtt from './mqtt'

function App() {
  let [topic, setTopic] = useState('');
  let [message, setMessage] = useState('');
  return (
    <div className="App">
      {!mqtt.verifyConnection() ? console.warn("No se encuentra conectado a un servidor mqtt") : ''}
      <div className="flex-row">
        <button onClick={() => mqtt.connect()}>Conectar a broker</button>
      </div>
      <div className="flex-row">
        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="span" placeholder="Topic" />
        <button onClick={() => mqtt.subscribeTopic(topic)}>Suscribir a topic</button>
      </div>
      <div className="flex-row">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="span" placeholder="Mensaje" />
        <button onClick={() => mqtt.publishMessage(['test1', 'test2'], message)}>Enviar mensaje</button>
      </div>
      <div className="flex-row">
        <button onClick={() => mqtt.unSuscribeTopic(topic)}>Desuscribir topic</button>
      </div>
      <div className="flex-row">
        <button onClick={() => mqtt.disconnect()}>Desconectar</button>
      </div>
    </div>
  );
}

export default App;
