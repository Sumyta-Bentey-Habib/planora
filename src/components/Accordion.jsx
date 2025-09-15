"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; 

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
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <h2
        className="text-3xl font-bold text-center mb-12"
        data-aos="fade-up"
      >
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-purple-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            <AccordionTrigger className="px-5 py-4 text-left font-medium hover:text-purple-700 transition-colors duration-300">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-5 py-3 text-gray-600 border-t border-purple-100">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
