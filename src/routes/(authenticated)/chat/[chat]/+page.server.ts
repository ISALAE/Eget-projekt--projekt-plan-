import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { database, streams } from "$lib/database";

export const load: PageServerLoad = async ({ params, locals }) => {
  if (params.chat) {
    try {
      const chat = await database.chat.findUniqueOrThrow({
        where: { id: parseInt(params.chat) },
        include: {
          messages: {
            include: {
              author: { select: { username: true, id: true } },
            },
          },
        },
      });
      if (chat) {
        const user = await database.user.findUnique({
          where: { session: locals.userid },
        });

        chat.messages.forEach((e) => {
          e.own = e.authorId == user?.id;
        });

        return { chat };
      }
    } catch (e) {
      console.log(e);
      throw error(404, "database items not found");
    }
  }

  throw error(404, "chat not found");
};

export const actions: Actions = {
  write: async ({ request, params, locals }) => {
    if (params.chat) {
      const form = await request.formData();
      const message = form.get("message")?.toString();
      if (!message) {
        return fail(400, { error: "missing message" });
      } else {
        const chat = await database.chat.findUnique({
          where: { id: Number(params.chat) },
        });
        if (chat?.id == Number(params.chat)) {
          const user = await database.user.findUnique({
            where: { session: locals.userid },
          });
          try {
            /*            const markdownmessage = (
              await compile(
                message,
                remarkPlugins,
                // @ts-ignore
                rehypePlugins
              )
            )?.code
              // https://github.com/pngwn/MDsveX/issues/392
              .replace(
                />{@html `<code class="language-/g,
                '><code class="language-'
              )
              .replace(/<\/code>`}<\/pre>/g, "</code></pre>"); */

            const msg = await database.message.create({
              data: {
                authorId: user?.id,
                chatId: chat.id,
                content: /* markdownmessage ??  */ message,
              },
              include: {
                author: { select: { username: true, id: true } },
              },
            });

            const encoder = new TextEncoder();
            const encoded = encoder.encode(
              "data: " + JSON.stringify(msg) + "\n\n"
            );

            console.log(streams);

            for (const session in streams) {
              /* Send messages to all other streams except own for this chat */

              const connection = streams[session];

              if (connection.chat == params.chat && session != locals.userid) {
                /* Enqueue messages to all streams for this chat */
                try {
                  connection.controller.enqueue(encoded);
                } catch (e) {
                  console.error("Failure sending sse over connection : " + e);
                }
              }
            }
          } catch (e) {
            console.log(e);
            return fail(400, { error: "message creation error" });
          }
        }
      }
    } else throw error(404, "chat not found");
  },
}