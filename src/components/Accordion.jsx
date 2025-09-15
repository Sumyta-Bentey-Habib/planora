"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // shadcn accordion component

const faqs = [
  {
    question: "How do I register for an event?",
    answer: "Simply login or register, browse events, and click 'Join' to register.",
  },
  {
    question: "Can I create my own events?",
    answer: "Yes, if you are an event planner, you can create and manage your events.",
  },
  {
    question: "Are events free?",
    answer: "Some events are free, others may have a fee depending on the organizer.",
  },
];

export default function FAQAccordion() {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 py-2 text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
