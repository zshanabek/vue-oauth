<template>
  <div class="chat">
    <div v-if="chatLoading" class="chat-empty">Загрузка...</div>
    <div v-else-if="!chatLoading && !messages.length" class="chat-empty">
      Пусто...
    </div>
    <div v-else class="chat-messages">
      <div v-for="message in messages" :key="message.id" class="chat-message">
        <div class="message-content">
          <div class="author-name">{{ message.sender }}</div>
          <div class="chat-message-text">{{ message.content }}</div>
        </div>
      </div>
      <div ref="endMessage" />
    </div>
    <div class="chat-user-message">
      <form @submit.prevent="sendMessage">
        <textarea
          v-model.trim="newMessage"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="sendMessage"
          @keydown.ctrl.enter.exact="newlineForMessage"
          placeholder="Написать в чат..."
        />
        <button type="submit" class="btn btn-sm btn-primary">Send</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { usersService } from '@/services/users'
import { useRoute } from 'vue-router'

const route = useRoute()

let chatSocket = null
const chatLoading = ref(true)
const messages = ref([])
const newMessage = ref('')
const receiver_id = route.params.receiver_id;

function fetchMessages() {
  const payload = JSON.stringify({
    command: 'fetch_messages',
    sender: usersService.user.id,
    receiver: receiver_id,
  });
  chatSocket.send(payload);
}

function sendMessage() {
  if (!newMessage.value) return;
  const payload = JSON.stringify({
    message: newMessage.value,
    sender: usersService.user.id,
    receiver: receiver_id,
    command: 'new_message',
  });
  chatSocket.send(payload);
  newMessage.value = '';
}

function newlineForMessage() {
  newMessage.value = newMessage.value + "\n";
}

onMounted(() => {
  const url = `${process.env.VUE_APP_API_WS}/ws/chats/${usersService.user.id}/${receiver_id}/`
  chatSocket = new WebSocket(url);
  chatSocket.onopen = () => {
    fetchMessages();
  };
  chatSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.command === 'messages') {
      messages.value.push(...data.messages);
      chatLoading.value = false;
    } else {
      messages.value.push(data.message);
    }
  };
  chatSocket.onerror = (error) => {
    console.log(error);
  };
  chatSocket.onclose = () => {
    console.log('Websocket Connection Closed');
  };
})
</script>

<style lang="scss" scoped>
$white: #FFFFFF;
$dark: #292929;
$primary: #3863F6;
$gray: (
  200: #ECEEF0,
  400: #D7D7D7,
  500: #777777,
  700: #5C637B,
);
$layout-s: 720px;

.chat {
  padding-bottom: 70px;
  width: 330px;
  height: 575px;
  border-radius: 5px;
  position: relative;
  background-color: $white;
  border: 1px solid map-get($gray, 400);

  @media screen and (max-width: $layout-s) {
    height: 393px;
  }

  &-messages {
    max-height: 90%;
    overflow: auto;
  }

  &-message {
    display: flex;
    padding: 10px 16px;
    font-size: 13px;

    .author {
      &-content {
        display: flex;
        flex-direction: column;
      }

      &-name {
        margin-bottom: 5px;
        font-size: 12px;
        line-height: 14px;
        color: map-get($gray, 500);
      }

      &-text {
        word-break: break-all;
      }
    }
  }

  &-user-message {
    padding: 8px 16px;
    display: flex;
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    border-radius: 4px;
    background-color: $white;
    border-top: 1px solid map-get($gray, 400);

    &.hidden {
      display: none;
    }

    form {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    textarea {
      padding: 12px;
      width: 100%;
      border: none;
      border-radius: 5px;
      outline: none;
      resize: none;
      transition: box-shadow 0.2s;
      background-color: map-get($gray, 200);

      &:focus {
        box-shadow: 0 0 2px $primary;
      }
    }
  }

  &-empty {
    margin-top: 150px;
    color: map-get($gray, 500);
    text-align: center;
  }
}
</style>
