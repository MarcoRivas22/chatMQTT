const userName = document.getElementById("userName");
const chatWindow = document.getElementById("chatWindow");
const messageInput = document.getElementById("messageInput");

const clientId = "clientEMQX" + Math.random().toString(36).substr(2, 5);

const options = {
  connectTimeout: 4000,
  // Authentication
  clientId,
  keepalive: 60,
  clean: true,
};

// WebSocket connect url
const webSocketURL = "ws://3.135.160.35:8083/mqtt";
const client = mqtt.connect(webSocketURL, options);

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Subscribe to the topic
  client.subscribe("chat", function (err) {
    if (!err) {
      console.log("Subscribed to the topic");
    } else {
      console.log("Error subscribing to the topic");
    }
  });
});

client.on("reconnect", (error) => {
  console.log("Reconnecting to MQTT broker", error);
});

client.on("error", (error) => {
  console.log("Error connecting to MQTT broker", error);
});

client.on("message", function (topic, message) {
  //string to object
  const msgReceived = JSON.parse(message.toString());

  //am I?
  if (msgReceived.name === userName.value) {
    chatWindow.innerHTML += `<p style = "color: blue;">${msgReceived.msg}</p>`;
  } else {
    chatWindow.innerHTML += `<p style = "color: red;">${msgReceived.name}: ${msgReceived.msg}</p>`;
  }

  //auto scroll
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

messageInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    if (userName.value == "") {
      chatWindow.innerHTML += `<div style="color:red">Please enter your name</div>`;
      return;
    }
    event.preventDefault();
    sendMessage();
  }
});

const sendMessage = () => {
  const message = {
    name: userName.value,
    msg: messageInput.value,
  };

  client.publish("chat", JSON.stringify(message));
  messageInput.value = "";
};


10, 14
3, 8, 11
1, 2, 4, 6, 5
    4, 11
    1, 2, 4, 6, 5,
    