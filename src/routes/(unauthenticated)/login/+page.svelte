<script lang="ts">
    import type { ActionData } from "./$types";

	export let form: ActionData

	let showerrormessage = true

	console.log("SHIT MAN")
	
</script>

<style>
	.placeholder {
		border-radius: 5px;
		padding-left: 5px;
	}
</style>

<form method="POST" action="?/login">
	<input style="margin-left: 5px;" type="username" name="username" placeholder="username" class="placeholder"/>
	<input type="password" name="password" placeholder="password" class="placeholder"/>
	<button>LOGIN</button>
</form>

{#if form?.server && showerrormessage}

<div class="block bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" style="margin-top: 10px">
	<strong class="font-bold">Skill issue!</strong>
	<span class="block sm:inline">No user found.</span>
</div>

{/if}