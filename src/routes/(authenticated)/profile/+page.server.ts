import type { PageServerLoad } from './$types';

import {database} from "$lib/database"

export const load = (async ({cookies}) => {
    const session = cookies.get("userid");
    const user = await database.user.findFirst({where:{session}})
    let profileURL = "";
    if (user != null) {
      profileURL = user.profileimage;
    }
    return {profileURL}

}) satisfies PageServerLoad;