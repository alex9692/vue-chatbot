<template>
  <section class="chat-box" :class="mode">
    <p>{{ chat }}</p>
    <span v-if="mode === 'human'">
      <i class="fas fa-user-alt"></i>
    </span>
    <span v-else>
      <i class="fas fa-robot"></i>
    </span>
  </section>
</template>

<script>
export default {
  props: {
    chat: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="css" scoped>
.chat-box {
  padding: 1.25rem 1.75em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  margin-bottom: 1rem;
}

.human {
  color: #1f2630;
  background-color: #5e7399;
  box-shadow: 2px 2px 6px #1f2630;
}

.bot {
  color: #26381d;
  background-color: #74995e;
  box-shadow: 2px 2px 6px #26381d;
}

</style>