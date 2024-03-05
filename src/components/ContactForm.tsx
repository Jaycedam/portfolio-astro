import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { emailSchema } from "@/lib/zod-schema";
// import { sendEmail } from "@/actions/email";
import { Textarea } from "@components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import SpinnerSVG from "@components/svg/spinner-svg";
import { type EmailForm } from "@/lib/zod-schema";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function ContactForm() {
  // form definition
  const form = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  // form on submit
  const handleSubmit = async (data: EmailForm) => {
    const result = await fetch("/api/contact.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log(result);

    if (result.status === 200) {
      toast.success("Email sent successfully!");
      form.reset();
      return;
    }
    toast.error("Something went wrong, please try again.");
  };

  return (
    <section id="contact" className="py-16">
      <Toaster richColors position="top-center" />
      <div className="container">
        <Card className="mx-auto max-w-4xl bg-gradient-to-tl from-muted/20">
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea className="resize-y" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-24"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  {form.formState.isSubmitting ? (
                    <p>Loading...</p>
                  ) : (
                    <>Enviar</>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
