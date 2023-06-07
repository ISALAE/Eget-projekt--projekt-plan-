import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import {database} from '$lib/database'

export const actions: Actions = {
	logout: async ({ request, cookies }) => {
		const url = new URL(request.url);
 		const chatId = url.pathname.split('/')[2];
		
		cookies.delete('userid')
		
		if (chatId) {
			throw redirect(302, `/chat/${chatId}/login`);
		  } else {
			throw redirect(302, '/login');
		  }

	},
	deleteaccount: async ({ request, locals, cookies }) => {
		
		const result = await database.user.delete({where: {session: locals.userid}})

		cookies.delete('userid')
		throw redirect(302, '/register')
	},
};

