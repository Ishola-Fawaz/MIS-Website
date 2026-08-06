import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { EVENT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms",
  description: "Ticket terms for the Muslim Innovators Summit.",
};

const SECTIONS = [
  {
    title: "Tickets",
    body: "A ticket grants one person entry to MIS 1.0 on the date listed. Tickets are tied to the name they were purchased under and are checked at the door.",
  },
  {
    title: "Refunds & transfers",
    body: `Tickets are refundable up to 14 days before the event. Inside that window, tickets are transferable — email ${EVENT.ticketsEmail} with the new attendee's name and email.`,
  },
  {
    title: "Changes",
    body: "Dates, venue, and schedule details are shared in good faith based on current plans and may change as we get closer to the event. Ticket holders will be notified of any material change by email.",
  },
  {
    title: "Conduct",
    body: "Attendance is conditional on following the Code of Conduct. Organizers may remove anyone from the event, without refund, for violating it.",
  },
  {
    title: "Contact",
    body: `Questions about your ticket — email ${EVENT.ticketsEmail}.`,
  },
];

export default function TermsPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Policy"
            title="Terms"
            description="The terms your ticket is issued under."
          />
        </Reveal>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
          {SECTIONS.map((section, index) => (
            <Reveal key={section.title} delay={index * 60}>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-cream font-heading">
                  {section.title}
                </h2>
                <p className="text-sm leading-7 text-cream-dim">{section.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
