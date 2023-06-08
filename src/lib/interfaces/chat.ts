import type { Message, user } from "@prisma/client";
export type loadResult = {members: user[], messages: Message[]}
export const _streams: Record<string, {controller: ReadableStreamDefaultController<string>, dm: string}> = {}

export type chatLoadResult = {messages: Message[], members: {username: string, profileimage: string, profileURL: string }[]} 

export interface chater {
    /**
     * Returns an object containing both the messages and users in a chat. 
     * @param slug for the page which data should be accessed.
     * @param session of the current user. 
     */
    Load ( session: string): Promise<chatLoadResult>
    /**
     * Saves the new message to Database. 
     * @param slug for the page which data should be accessed.
     * @param session of the current user. 
     * @param form Formdata of the user's input. 
     */
    Message (form: FormData, session: string): Promise<boolean>
}