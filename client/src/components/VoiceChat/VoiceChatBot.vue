<template>
  <div id="voice-chat">
    <h1 class="activate-voice" @click="startChat">
      Activate voice
    </h1>
    <section class="chat-container">
      <transition-group
        tag="div"
        id="chat-box-container"
        enter-active-class="animated fadeInUp"
        appear
      >
        <TextContainer
          v-for="(chat, index) in chats"
          :key="index"
          :chat="chat.text"
          :mode="chat.mode"
        ></TextContainer>
      </transition-group>
    </section>
  </div>
</template>

<script>
import TextContainer from "@/components/Text";
export default {
  name: "App",
  components: {
    TextContainer
  },
  data() {
    return {
      chats: []
    };
  },
  methods: {
    startChat() {
      this.recorder.start();
    },
    createBotMessage(text) {
      let message = "sorry, i did not understand that";
      if (text.includes("how are you")) {
        message = "i am fine, thanks. how are you?";
      }
      if (text.includes("fine")) {
        message = "nice to hear that, how can i assist you today?";
      }
      if (text.includes("weather")) {
        message = "of course. where are you currently?";
      }
      if (text.includes("rourkela")) {
        message = "it is 21 degrees and sunny";
      }
      const speech = new SpeechSynthesisUtterance();
      const voices = window.speechSynthesis.getVoices();
      speech.text = message;
      speech.volume = 1;
      speech.voice = voices[1];
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
      this.chats.push({ text: message, mode: "bot" });
    }
  },
  mounted() {
    const SpeechRecognition =
      window.speechRecognition || window.webkitSpeechRecognition;
    this.recorder = new SpeechRecognition();
    this.recorder.onstart = () => {
      console.log("Voice Chat activated");
    };
    this.recorder.onresult = event => {
      const resultIndex = event.resultIndex;
      const transcript = event.results[resultIndex][0].transcript;
      this.chats.push({ text: transcript, mode: "human" });
      setTimeout(() => {
        this.createBotMessage(transcript);
      }, 500);
    };
  }
};
</script>

<style scoped>
#voice-chat {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.activate-voice {
  text-transform: uppercase;
  font-weight: 300;
  padding: 1.25rem;
  letter-spacing: 0.75rem;
  transition: all 200ms;
  cursor: pointer;
  border-radius: 2px;
  margin: 1.75rem 0;
}
.activate-voice:hover {
  color: #2c3e50;
  background-color: #2196f3;
  box-shadow: 0 0 10px #2196f3, 0 0 50px #2196f3, 0 0 100px #2196f3;
}
.chat-container {
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#chat-box-container {
  width: 55%;
  max-width: 40rem;
}
@media (max-width: 768px) {
  #chat-box-container {
    width: 90%;
    max-width: unset;
  }
}
</style>
