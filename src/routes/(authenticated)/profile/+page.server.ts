import type { PageServerLoad } from './$types';

import {database} from "$lib/database";
import type { Actions } from '@sveltejs/kit';

export const load = (async ({cookies}) => {
    const session = cookies.get("userid");
    const user = await database.user.findFirst({where:{session}})
    let profileURL = "";
    if (user != null) {
      profileURL = user.profileimage;
    }
    return {profileURL}

}) satisfies PageServerLoad;

export const actions:Actions = {
  ChangeImage:async ({request, locals}) => {
    const form = await request.formData()
    const url = form.get("url")?.toString()
    const result = await database.user.update({where: {session: locals.userid}, data: {profileimage: url}})
  }
}