import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { database, streams } from "$lib/database";

export const GET: RequestHandler = async ({ locals, params }) => {
  if (params.chat) {
    try {
      const chat = await database.chat.findUniqueOrThrow({
        where: { id: Number(params.chat) },
      });
      if (chat && locals.userid) {
        const user = await database.user.findUniqueOrThrow({
          where: { session: locals.userid },
        });
 
        const stream = new ReadableStream({
          start(controller) {
            /* save the controller for the stream so that we can */
            /* enqueue messages into the stream */
            streams[locals.userid!] = { controller, chat: params.chat };
          },
          cancel() {
            /* remove the stream */
            delete streams[locals.userid!];
          },
        });

        return new Response(stream, {
          headers: {
            "content-type": "text/event-stream",
          },
        });
      }
    } catch {
      throw error(404, "database items not found");
    }
  }

  throw error(404, "database items not found");
};