import * as Paho from './utils/paho-mqtt';

const HOST = '192.168.1.72';
const PORT = 9001;

const client = new Paho.Client(HOST, PORT, 'client-id');

export const connect = () => {
    if(!client.isConnected()) {
        client.connect({onSuccess:onConnect});
    }
}

export const onConnect = () => {
    console.log("%c ✔ Conexión exitosa ", 'background-color: #d7ffd7; color: #00c400');
}

export const disconnect = () => {
    if(client.isConnected()) {
        client.disconnect();
        console.log("%c ✗ Desconectado del broker ", 'background-color: #ffd8d8; color: #ff2727');
    } else {
        console.error("No se encuentra conectado a un servidor mqtt");
    }
}

export const verifyConnection = () => {
    let response = false;
    if(client.isConnected()) {
        response = true;
    }
    return response;
}

export const suscribeTopic = (topic) => {
    if(client.isConnected()) {
        client.subscribe(topic);
        console.log(`%c ✔ Suscripción al topic ${topic} exitosa `, 'background-color: #d7ffd7; color: #00c400');
    } else {
        console.error("No está conectado al broker");
    }
}

export const sendMessage = (message) => {
    let Newmessage;
    if(client.isConnected()) { 
        Newmessage = new Paho.Message(message);
        Newmessage.destinationName = "/test";
        client.publish(Newmessage);
    } else {
        console.error("No está conectado al broker");
    }
}

export const onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
        console.log(`%c Conexión perdida ${responseObject.errorMessage}`, 'background-color: #ffd8d8; color: #ff2727');
    }
}

export const onMessageArrived = (message) => {
    console.log(`%c Mensaje: ${message.payloadString} - Topic ${message.topic}`, 'background-color: #d7ffd7; color: #00c400');
}

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;