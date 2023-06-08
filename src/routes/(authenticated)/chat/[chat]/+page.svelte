<script lang="ts">
    import { browser } from "$app/environment";
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import { onDestroy } from "svelte";
    import type { ActionData, PageServerData } from "./$types";
    import ReconnectingEventSource from "reconnecting-eventsource";
    import type { LayoutServerData } from "../../$types";
  
    export let data: PageServerData;
    export let layoutData: LayoutServerData;
    export let form: ActionData;
  
    let inputRef: HTMLElement;
  
    $: messages = [...data.chat.messages].reverse();
  
    if (browser) {
      let es: ReconnectingEventSource;
  
      es = new ReconnectingEventSource(`/chat/${$page.params.chat}`);
      es.onmessage = (event) => {
        const message = JSON.parse(event.data);
  
        /* add the new message */
        if (message) {
          console.log(message )
          message.timestamp = new Date(message.timestamp.toString());
          messages = [message, ...messages];
        }
      };
  
      onDestroy(() => {
        es.close();
      });
    };

    const increaseMessageCount = () => {
      layoutData.messages = (layoutData.messages ?? 0) + 1;
    };
  </script>
  
  <h1>Messages</h1>
  <hr />
  {#if data?.chat}
    <div class="chat">
      {#each messages as message}
        <div class="message" class:own={message.own}>
          <p>
            {@html message.content}
          </p>
          <i
            >{message.own
              ? message.author?.username + " at "
              : ""}{message.timestamp.toDateString()}
          </i>
        </div>
      {/each}
    </div>
  {/if}
  
  <hr />
  
  <form
    use:enhance={({}) => {
      return async ({ update }) => {
        await update(); // Call the default behavior of a form submission response.
        inputRef.focus(); // focus the input field
      };
    }}
    method="post"
    action="?/write"
  >
    <input
      bind:this={inputRef}
      type="text"
      name="message"
      placeholder="Message"
      id=""
      class="rounded-input"
    />
    <button type="submit" class="custom-button button-click-effect" on:click={increaseMessageCount}>Send message</button>
    {#if form?.error}
      {form.error}
    {/if}
    <input type="submit" hidden />
  </form>
  
  <style>

    @keyframes ChatBoxes {
    0% {
      transform: scaleY(0.9);
    }
    50% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0.9);
    }
  }

  .button-click-effect {
    transition: transform 0.2s;
  }

  .button-click-effect:active {
    transform: scale(0.95);
  }

  .custom-button {
    margin-left: 5px;
    text-align: center;
    border-radius: 5px;
    background-color: lime;
    color: gray;
    padding: 0.5px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.5s;
  }

  .custom-button:hover {
    background-color: #2ecc71;
  }

    .rounded-input{
    border-radius: 5px;
    text-align: center;
    margin-left: 5px;
    }
    .chat {
      display: flex;
      flex-direction: column-reverse;
      max-height: 60vh;
      overflow-y: scroll;
    }
  
    .message {
      display: flex;
      flex-direction: column;
      gap: 0px;
      margin: 4px;
      padding: 8px;
      background-color: rgba(44, 93, 125, 0.3);
      animation: ChatBoxes 1.5s infinite;
    }
  
    .message.own {
      place-items: end;
      background-color: rgba(95, 158, 160, 0.3);
    }

  </style>