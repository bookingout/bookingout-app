"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title: string
  faqs: FAQItem[]
}

export default function FAQSection({ title, faqs }: FAQSectionProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{title}</h2>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-700">
            <AccordionTrigger className="text-left font-medium py-4 text-lg hover:text-pink-500">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 pb-4">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

