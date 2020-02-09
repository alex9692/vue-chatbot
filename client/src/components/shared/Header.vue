<template>
  <nav class="header">
    <ul class="items">
      <li class="item" @click="setPage('VoiceChatBot')">VoiceChat</li>
      <li class="item chat" @click="setPage('SmartChatBot')">ChatBot<span>with Diaglogflow</span></li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    setPage(data) {
      this.$emit("setPage", data);
    }
  }
};
</script>

<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #2196f3;
  height: 4.5rem;
}
.items {
  list-style: none;
  margin: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  margin: 0 1rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms;
  cursor: pointer;
  font-size: 1.25rem;
}
.item span {
  font-size: 0.75rem;
}
.item:hover {
  color: #487fac;
  border-bottom: 2px solid #487fac;
}
</style>