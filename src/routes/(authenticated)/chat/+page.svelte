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
  <button type="submit" style="margin-left: 5px; font-style: italic;">Add new chat</button>
  {#if form?.error}
    {form.error}
  {/if}
</form>
