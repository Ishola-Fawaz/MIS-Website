import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CallForm from "@/components/CallForm";
import Reveal from "@/components/Reveal";
import { EVENT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Call for Speakers",
  description:
    "Apply to speak at MIS 1.0, the founding edition of the Muslim Innovators Summit.",
};

export default function SpeakPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Call for Speakers"
            title="MIS 1.0's lineup isn't decided yet — that's where you come in."
            description="We're looking for builders with a real story to tell: a product shipped, a lesson learned the hard way, a hard problem you're still working on. Tell us what you'd bring to the room."
          />
        </Reveal>
        <Reveal delay={100} className="flex w-full justify-center">
          <CallForm
            recipientEmail={EVENT.speakersEmail}
            subjectPrefix="Speaker application"
            submitLabel="Apply to Speak"
            fields={[
              { name: "name", label: "Full name", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              {
                name: "phone",
                label: "Phone number",
                type: "tel",
                required: true,
              },
              {
                name: "topic",
                label: "Proposed talk title or topic",
                type: "text",
                required: true,
              },
              {
                name: "pitch",
                label: "Why this talk, why you",
                type: "textarea",
                placeholder: "A few sentences on the talk and your background.",
                required: true,
              },
              {
                name: "links",
                label: "Portfolio, LinkedIn, or X",
                type: "text",
                placeholder: "https://",
              },
            ]}
          />
        </Reveal>
      </Container>
    </div>
  );
}
