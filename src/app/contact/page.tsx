import { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
    title: "Contact Us — ResumeLens",
    description: "Have a question or feedback? Get in touch with the ResumeLens team. We typically respond within 24 hours on business days.",
    openGraph: {
        title: "Contact Us — ResumeLens",
        description: "Have a question or feedback? Get in touch with the ResumeLens team.",
        url: "https://resumelens.ai/contact",
        siteName: "ResumeLens",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us — ResumeLens",
        description: "Have a question or feedback? Get in touch with the ResumeLens team.",
    },
    alternates: {
        canonical: "https://resumelens.ai/contact",
    },
};

export default function ContactPage() {
    return <ContactForm />;
}
