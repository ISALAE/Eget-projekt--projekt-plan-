import { database } from "../database"
import * as crypto from 'crypto'


export async function Auth(form: FormData) {
    const username = form.get("username")?.toString()

    const user = await database.user.findFirst({ where: { username } })
    
    if (user) {
        const attempt = crypto.pbkdf2Sync(form.get("password")?.toString() ?? "", user!.salt, 1000, 64, "sha512").toString("hex")
        console.log("Username was found!")
        if (user.hash == attempt) {
            return { success: { session: user.session } }
        } else return {error: {code: 302, data: {you: "skill issue"}}}

    }
    else {
        return {error: {code: 302, data: {server: "no user found"}}}
    }
}