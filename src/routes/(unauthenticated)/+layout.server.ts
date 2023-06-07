import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { database } from '../../lib/database';


export const load: LayoutServerLoad = async ({ locals, cookies }) => {

    if (locals.userid) {
        throw redirect(302, '/')

}}