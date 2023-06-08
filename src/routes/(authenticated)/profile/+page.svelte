<script>

  export let data

  let imageURL = data.profileURL;
  let newimageURL = "";
  let status = "hidden";

  function ChangeProfileImg() {
    imageURL = newimageURL;
    if (status === "hidden") {
            status = "block"
        } else if (status === "block") {
            status = "hidden"
        }
    }
</script>

<div class="h-screen flex justify-center align-middle bg-white">
    <div class="w-1/3 m-auto flex flex-col items-center gap-4 rounded-lg border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-800 sm:justify-between h-1/2">
        <p class="text-sm text-gray-500 dark:text-gray-400">Your profile</p>
        <img class="h-20 w-20 rounded-full hover:blur-sm cursor-pointer" on:click={ChangeProfileImg} src={data.profileURL} alt="">
        <form class="{status}" action="?/ChangeImage" method="POST">
          <input
            type="text"
            name="url"
            class=" w-full border border-gray-300 px-3 py-2 rounded-md"/>
            <button type="submit">Submit</button>
        </form>
        <div class="mb-3">
            <p style="color: white; -webkit-text-stroke: black 0.25px">{data.username}</p>     
          </div>
        <p class="text-2xl font-medium text-gray-900 dark:text-white">{data.messages}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">Messages sent</p>
    </div>
</div>  