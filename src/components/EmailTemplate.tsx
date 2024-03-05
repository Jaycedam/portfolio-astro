import { type EmailForm } from "@/lib/zod-schema";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const image: string = import.meta.env.EMAIL_LOGO_URL;

export const EmailTemplate = ({ email, subject, message }: EmailForm) => (
  <Html>
    <Head />
    <Preview>{subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img style={logo} src={image} width={48} height={48} alt="logo" />
        <Heading style={heading}>New email sent from jordancortes.dev</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={`mailto:${email}`}>
              Reply to {email}
            </Link>
          </Text>
        </Section>
        <Text style={paragraph}>
          Message:
          <br />
          {message}
        </Text>
        <Hr style={hr} />
        <Text style={footer}>jordancortes.dev</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const logo = {
  borderRadius: "25%",
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
