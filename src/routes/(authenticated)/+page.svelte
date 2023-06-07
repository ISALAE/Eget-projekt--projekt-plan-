<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData
</script>
<div
    class="w-1/3 m-auto text-center my-40 mb-4 rounded-lg bg-gray-900 px-6 py-5 text-base text-neutral-50 dark:bg-gray-800"
    role="alert"
    style="font-style: italic; font-weight: bold;">

    {#if data}
        <p style="color: White"> Hello {data.username}!</p>
    {/if}
</div>