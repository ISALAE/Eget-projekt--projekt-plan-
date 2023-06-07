import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import {database} from '$lib/database'
import { fail } from '@sveltejs/kit';
import * as crypto from 'crypto'


export const actions: Actions = {
	register: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		const username = form.get("username")!.toString()
		const password = form.get("password")


		const salt = crypto.randomBytes(16).toString("hex")
		const hash = crypto.pbkdf2Sync(form.get("password")?.toString()??"", salt, 1000, 64, "sha512").toString("hex")

		if (username && password) {
			if ((await database.user.findUnique({where: {username}}))) {
				return fail(400, {message: "Username already exists!"})
			}
			else {
				
				const session = crypto.randomUUID();
				const user = await database.user.create({data: {username, hash, salt, session}})

				cookies.set('userid', session, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: process.env.NODE_ENV === 'production',
					maxAge: 3600
				})
				throw redirect(302, "/")
			}
		}
	},
};