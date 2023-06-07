import type { PageServerLoad } from './$types';
import { database } from '$lib/database';

export const load = (async ({cookies}) => {
    const session = cookies.get("userid");
    if(!session)return;
    const user = await database.user.findFirst({where:{session}})
    const username = user?.username;
    return {
        username,
    };
}) satisfies PageServerLoad;