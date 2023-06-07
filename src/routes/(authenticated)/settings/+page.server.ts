import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import {database} from '$lib/database'

export const actions: Actions = {
	logout: async ({ request, cookies }) => {
		const currentPath = new URL(request.url).pathname;

		cookies.delete('userid')
		// Temporary redirection fix (fungerar så klart inte) (kan inte logga ut på /chat/nummer sidorna för någon anledning.)
		const redirectUrls = ['/chat/1', '/chat/2', '/chat/3', '/chat/4', '/chat/5', '/chat/6', '/chat/7', '/chat/8', '/chat/9', '/chat/10', '/chat/11', '/chat/12', '/chat/13', '/chat/14', '/chat/15', '/chat/16', '/chat/17', '/chat/18', '/chat/19', '/chat/20'];

		if (redirectUrls.includes(currentPath)) {
			throw redirect(302, '/login');
		} else {
			throw redirect(302, '/');
		}
	},
	deleteaccount: async ({ request, locals, cookies }) => {
		
		const result = await database.user.delete({where: {session: locals.userid}})

		cookies.delete('userid')
		throw redirect(302, '/register')
	},
};

