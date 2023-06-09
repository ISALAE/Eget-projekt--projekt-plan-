import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { database } from '$lib/database';
import type { Actions } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
    if (locals.userid) {
        const user = await database.user.findFirst({ where: { session: locals.userid } })
        const username = user?.username.toString();
        const messages = user?.SentMessages || 0;
        
        return {
            userid: locals.userid,
            username: username,
            profileURL: user?.profileimage,
            messages: messages,
        };
    } else {
        throw redirect(302, '/login')
    }
}

