import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import {database} from '$lib/database'
import * as crypto from 'crypto'
import { Auth } from '$lib/implementations/SQLiteAuth';

export const actions: Actions = {
login: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		const result = await Auth(form)
		console.log(result)

		if(result.error) {
			return fail(result.error.code, result.error.data)
			
		} else if (result.success && result.success.session != null) {
			console.log("Successfully logged in!")
			console.log(result.success.session)
			cookies.set('userid', result.success.session, {

				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 3600

			})
			throw redirect(302, '/')

		}

		

	/* 	const username  = form.get("username").toString()

		const user = await database.user.findFirst({where: {username}})
		
		const attempt = crypto.pbkdf2Sync(form.get("password")?.toString()??"", user?.salt, 1000, 64, "sha512").toString("hex")

		if (user){
	console.log("Username was found!")
	if (user.hash == attempt) {
		console.log("Successfully logged in!")
		cookies.set('userid', user["username"], {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 3600
		})
	} else return invalid(400, {message:"Password was incorrect?"})
	
 }
 else {
	return invalid(400, { message: "Username doesn't exist!" })
 }
		if (form.get("username").toString == "Isac") {
			return invalid(400, { message: "username invalid" })
		}


		throw redirect(302, '/') */

	},
};
