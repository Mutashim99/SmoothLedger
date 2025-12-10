import React from "react";
import {
  Html,
  Body,
  Container,
  Head,
  Heading,
  Text,
  Button,
  Img,
  Link,
  Section,
  Preview,
  Hr,
  Tailwind,
} from "@react-email/components";

export default function WeeklyUpdate({
  heading = "This Week's Update",
  bodyText = "Here is the content for the email.",
  buttonText = "Click Me",
  buttonUrl = "https://smoothledger.com",
}) {
  return (
    <Html>
      <Head />
      <Preview>SmoothLedger - {heading}</Preview>
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Section style={logoContainer}>
              {/* Update this src to your hosted logo! 
                e.g., https://www.smoothledger.com/logo.png
              */}
              <Img
                src="./SLlogo1.png" // <-- REPLACE THIS
                width="180"
                alt="SmoothLedger Logo"
                style={logo}
              />
            </Section>

            <Heading style={h1}>{heading}</Heading>
            
            <Text style={salutation}>Hi there,</Text>

            <Text style={paragraph}>
              {bodyText.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Text>

            {buttonUrl && buttonText && (
              <Section style={buttonContainer}>
                <Button style={button} href={buttonUrl}>
                  {buttonText}
                </Button>
              </Section>
            )}

            <Hr style={hr} />

            <Section style={footer}>
              <Text style={footerText}>
                You are receiving this email because you downloaded a document
                from SmoothLedger.com.
              </Text>
              <Text style={footerText}>
                © {new Date().getFullYear()} SmoothLedger. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

// --- Styles for Email (Must be inline) ---
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px", // More breathing room
  border: "1px solid #e0e0e0",
  borderRadius: "12px", // Softer corners
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)", // Subtle shadow
  width: "580px",
  maxWidth: "100%",
};

const logoContainer = {
  textAlign: "center",
  padding: "0 0 20px 0",
};

const logo = {
  margin: "0 auto",
};

const h1 = {
  color: "#1d1d1d",
  fontSize: "30px",
  fontWeight: "700",
  textAlign: "center",
  margin: "0 0 24px 0",
};

const salutation = {
  color: "#333",
  fontSize: "18px",
  lineHeight: "26px",
  fontWeight: "600",
  margin: "24px 0",
};

const paragraph = {
  color: "#444444",
  fontSize: "16px",
  lineHeight: "28px",
  whiteSpace: "pre-wrap",
};

const buttonContainer = {
  textAlign: "center",
  margin: "32px 0",
};

const button = {
  backgroundColor: "#3B82F6",
  borderRadius: "8px", // Rounded to match container
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center",
  padding: "14px 28px", // A bit larger
};

const hr = {
  borderColor: "#e0e0e0",
  margin: "28px 0",
};

const footer = {
  color: "#888888",
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "center",
  padding: "10px 0",
};

const footerText = {
  margin: "0",
};