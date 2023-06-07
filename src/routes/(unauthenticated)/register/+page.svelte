<script lang="ts">
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<style>
	.placeholder {
		border-radius: 5px;
		padding-left: 5px;
	}
</style>

<form method="POST" action="?/register">
	<input style="margin-left: 5px;" type="username" name="username" placeholder="username" class="placeholder" />
	<input type="password" name="password" placeholder="password" class="placeholder"/>
	<button>REGISTER</button>
	{#if form?.message}
		<p>{form?.message}</p> 
	{/if}
</form>