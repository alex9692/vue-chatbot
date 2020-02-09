<template>
  <div id="smart-chat">
    <section class="smart-chat-header">
      <h1 class="smart-chat-header-title">Smart chat bot</h1>
      <p class="smart-chat-header-subtitle">I am customer support chat bot</p>
    </section>
    <section class="smart-chat-body">
      <div class="smart-chat-container">
        <article
          class="message-box"
          :class="chat.type === 'bot' ? 'bot' : 'human'"
          v-for="(chat, index) in chats"
          :key="index"
        >
          <span v-if="chat.type === 'bot'" class="message-box-icon">
            <i class="fas fa-robot"></i>
          </span>
          <div class="message-box-text">
            <div
              v-if="loading && isBot(chat) && isLastEmpty(index)"
              class="spinner"
            >
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
            <span v-if="!isLast(index) || !loading">{{ chat.text }}</span>
          </div>
        </article>
      </div>
    </section>
    <section class="smart-chat-footer">
      <div class="smart-chat-input-container">
        <input
          type="text"
          class="smart-chat-input"
          v-model="text"
          @keyup.enter="displayChat(text)"
          :disabled="loading"
          ref="inputRef"
          placeholder="Type message..."
        />
        <span @click="sendMessage" class="microphone">
          <i class="fas fa-microphone"></i>
        </span>
      </div>
      <div>
        <button class="button" @click="displayChat(text)">Send</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      text: "",
      loading: false,
      chats: []
    };
  },
  computed: {},
  methods: {
    isBot(chat) {
      return chat.type === "bot";
    },
    isLast(index) {
      return index === this.chats.length - 1;
    },
    isLastEmpty(index) {
      return this.chats[index].text === "";
    },
    getLastBotAndUpdate(text) {
      const chatIndex = this.chats.findIndex(
        el => el.type === "bot" && el.text === ""
      );
      this.chats[chatIndex].text = text;
    },
    async getReply(text) {
      const response = await axios.post("http://localhost:3000/send-msg", {
        text
      });
      return response.data.text;
    },
    async displayChat(text) {
      this.chats.push({
        type: "human",
        text: text
      });
      this.text = "";
      this.chats.push({
        type: "bot",
        text: ""
      });
      this.loading = true;
      const reply = await this.getReply(text);
      this.replyHuman(reply);
      this.loading = false;
      this.$nextTick(() => this.$refs.inputRef.focus());
    },
    replyHuman(message = "hello") {
      const speech = new SpeechSynthesisUtterance();
      const voices = window.speechSynthesis.getVoices();
      speech.text = message;
      speech.volume = 1;
      speech.voice = voices[1];
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
      this.getLastBotAndUpdate(message);
    },
    sendMessage() {
      this.recorder.start();
    }
  },
  mounted() {
    this.chats.push({
      type: "bot",
      text: ""
    });
    this.replyHuman("hello i am customer support bot. how may i help you?");
    const SpeechRecognition =
      window.speechRecognition || window.webkitSpeechRecognition;
    this.recorder = new SpeechRecognition();
    this.recorder.onstart = () => {
      console.log("Voice Chat activated");
    };
    this.recorder.onresult = event => {
      const resultIndex = event.resultIndex;
      const transcript = event.results[resultIndex][0].transcript;
      this.displayChat(transcript);
    };
  }
};
</script>

<style lang="css" scoped>
#smart-chat {
  height: 50rem;
  width: 70%;
  margin: 1.75rem auto;
  background-color: #34404e5e;
  border-radius: 15px;
  display: grid;
  grid-template-rows: [chat-header-start] 3.5rem [chat-header-end chat-main-start] 1fr [chat-main-end chat-footer-start] 2.5rem [chat-footer-end];
}
.smart-chat-header {
  grid-row: chat-header;
  border-radius: 15px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: #20364e7c;
  padding: 0 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.smart-chat-header-title {
  margin: 0.25rem 0;
  font-size: 1rem;
  text-transform: uppercase;
}
.smart-chat-header-subtitle {
  margin: 0.25rem 0;
  font-size: 0.75rem;
  text-transform: uppercase;
}
.smart-chat-footer {
  grid-row: chat-footer;
  border-radius: 15px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: #20364e7c;
  padding: 0 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.smart-chat-input-container {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}
.smart-chat-input {
  width: 100%;
  color: #2196f3;
  background-color: transparent;
  border: none;
}
.smart-chat-input:focus {
  outline: none;
}
.button {
  background-color: #2196f3;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  margin-left: 0.5rem;
  cursor: pointer;
}
.button:focus {
  outline: none;
}
.button:hover {
  transform: scale(1.08);
}
.smart-chat-body {
  overflow: hidden;
}
.smart-chat-container {
  overflow-y: auto;
  height: 100%;
}
.message-box {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}
.message-box.bot {
  justify-content: flex-start;
}
.message-box.human {
  justify-content: flex-end;
}
.message-box-icon {
  padding: 0.5rem;
  border-radius: 50%;
  border: 1px solid #7795b6;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  margin-top: 1.5rem;
}
.message-box-text {
  padding: 0.5rem 1rem;
  background-color: #20364e;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 300;
  border-bottom-left-radius: 0;
  text-align: left;
  position: relative;
}
.bot .message-box-text::before {
  content: "";
  position: absolute;
  bottom: -6px;
  border-top: 6px solid #20364e;
  left: 0;
  border-right: 7px solid transparent;
}
.human .message-box-text {
  margin-right: 0.75rem;
  border-radius: 10px;
  border-bottom-right-radius: 0;
}
.human .message-box-text::before {
  content: "";
  position: absolute;
  bottom: -6px;
  border-top: 6px solid #20364e;
  right: 0;
  border-left: 7px solid transparent;
}
.microphone {
  cursor: pointer;
}
.microphone:hover {
  color: #487fac;
  transform: scale(1.08);
}
</style>