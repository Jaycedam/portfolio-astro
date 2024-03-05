import type { APIRoute } from "astro";
import { Resend } from "resend";
import { emailSchema } from "@/lib/zod-schema";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const email = import.meta.env.RESEND_EMAIL;

export const POST: APIRoute = async ({ params, request }) => {
  const data = await request.json();
  const parsedData = emailSchema.safeParse(data);

  if (!parsedData.success) {
    return new Response(
      JSON.stringify({
        message: "Incorrect data.",
      }),
      {
        status: 400,
        statusText: "Incorrect data.",
      }
    );
  }

  const send = await resend.emails.send({
    from: email,
    to: email,
    subject: parsedData.data.subject,
    react: EmailTemplate({
      email: parsedData.data.email,
      message: parsedData.data.message,
      subject: parsedData.data.subject,
    }) as React.ReactElement,
  });

  if (send.data) {
    return new Response(
      JSON.stringify({
        message: send.data,
      }),
      {
        status: 200,
        statusText: "OK",
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: send.error,
    }),
    {
      status: 500,
      statusText: "Internal Server Error",
    }
  );
};

export const GET: APIRoute = async ({ request }) => {
  return new Response(
    JSON.stringify({
      message: "API Route working",
    })
  );
};
