<script lang="ts">
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<form method="POST" action="?/register">
	<input style="margin-left: 5px;" type="username" name="username" />
	<input type="password" name="password" />
	<button>REGISTER</button>
	{#if form?.message}
		<p>{form?.message}</p> 
	{/if}
</form>