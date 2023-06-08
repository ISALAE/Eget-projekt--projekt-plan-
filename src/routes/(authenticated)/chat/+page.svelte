<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

<style>
  .rounded-input{
    border-radius: 5px;
    text-align: center;
    margin-left: 5px;
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

  .button-click-effect {
    transition: transform 0.2s;
  }

  .button-click-effect:active {
    transform: scale(0.95);
  }
</style>

<h1>Chats</h1>
<hr />
{#each data.chats as chat}
  <div style="display:flex; margin-left: 5px;">
    <p><a href={"/chat/" + chat.id}>{chat.name}</a></p>
  </div>
{/each}
<hr />

<form use:enhance={(e) => e.form.reset()} method="post" action="?/add">
  <input type="text" name="chatname" placeholder="Chat name" id="" class="rounded-input"/>
  <button type="submit" class="custom-button button-click-effect">Add new chat</button>
  {#if form?.error}
    {form.error}
  {/if}
</form>
