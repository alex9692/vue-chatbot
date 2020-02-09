<template>
  <div id="app">
    <Header @setPage="setComponent"></Header>
    <keep-alive>
      <component :is="comp"></component>
    </keep-alive>
  </div>
</template>
<script>
import VoiceChatBot from "@/components/VoiceChat/VoiceChatBot";
import SmartChatBot from "@/components/VoiceChat/SmartChatBot";
import Header from "@/components/shared/Header";
export default {
  components: {
    VoiceChatBot,
    SmartChatBot,
    Header
  },
  data() {
    return {
      comp: "VoiceChatBot"
    };
  },
  methods: {
    setComponent(data) {
      this.comp = data;
    }
  }
};
</script>

<style>
#app {
  font-family: consolas;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  background-color: #031321;
  color: #2196f3;
}
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
}
.spinner {
  width:max-content;
  text-align: center;
}

.spinner > div {
  width: 10px;
  height: 10px;
  background-color: #2196f3;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>