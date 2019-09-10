import * as Paho from './utils/paho-mqtt';

const HOST = '192.168.1.72';
const PORT = 9001;
const CLIENT_ID = 'Test-' + Math.floor(Math.random() * 100).toString()

export const client = new Paho.Client(HOST, PORT, CLIENT_ID);

export const connect = async () => {
    try {
        if (!client.isConnected()) {
            client.connect({ onSuccess: onConnect, onFailure: onFailure });
        }
    } catch {
        throw 'Error establecindo la conexión con el broker';
    }
}

export const onConnect = () => {
    console.log("%c ✔ Conexión exitosa ", 'background-color: #d7ffd7; color: #00c400');
}

export const onFailure = () => {
    console.log("%c ✗ Conexión exitosa ", 'background-color: #ffd8d8; color: #ff2727');
}

export const disconnect = () => {
    if (client.isConnected()) {
        client.disconnect();
        console.log("%c ✗ Desconectado del broker ", 'background-color: #ffd8d8; color: #ff2727');
    } else {
        console.error("No se encuentra conectado a un servidor mqtt");
    }
}

export const verifyConnection = () => {
    let response = false;
    if (client.isConnected()) {
        response = true;
    }
    return response;
}

export const subscribeTopic = (topic) => {
    if (client.isConnected()) {
        client.subscribe(topic);
        console.log(`%c ✔ Suscripción al topic ${topic} exitosa `, 'background-color: #d7ffd7; color: #00c400');
    } else {
        console.error("No está conectado al broker");
    }
}

export const unSuscribeTopic = (topic) => {
    if (client.isConnected()) {
        client.unsubscribe(topic);
        console.log(`%c ✗ Desuscripción al topic ${topic} exitosa `, 'background-color: #ffd8d8; color: #ff2727');
    } else {
        console.error("No está conectado al broker");
    }
}

export const sendMessage = (topic, message) => {
    let Newmessage;
    if (client.isConnected()) {
        Newmessage = new Paho.Message(message);
        Newmessage.destinationName = topic;
        client.send(Newmessage);
    } else {
        console.error("No está conectado al broker");
    }
}

export const publishMessage = (topics = [], message) => {
    let Newmessage;
    if (client.isConnected()) {
        topics.map((val) => {
            Newmessage = new Paho.Message(message);
            Newmessage.destinationName = val;
            client.publish(Newmessage);
        });
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
    if (message.payloadString == "battery/level") {
        console.log(`%c Mensaje: ${message.payloadString} - Topic ${message.topic}`, 'background-color: #d7ffd7; color: #00c400');
        sendMessage(message.topic, `sf/battery/${message.topic}/${Math.floor(Math.random() * 100).toString()}`);
    } else if (message.payloadString == "test/1") {
        console.log('Prueba 1 iniciada');
    }
}

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;