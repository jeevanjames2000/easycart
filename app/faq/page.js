"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Find answers to common questions about shopping with EasyCart.
          </p>
        </section>
        <Separator />
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive a tracking number via
                  email. You can also check your order status in your account
                  under "Orders."
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What are your shipping options?
                </AccordionTrigger>
                <AccordionContent>
                  We offer standard (3-5 business days), express (1-2 business
                  days), and free shipping on orders over $50. Shipping costs
                  are calculated at checkout.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Can I change or cancel my order?
                </AccordionTrigger>
                <AccordionContent>
                  You can modify or cancel your order within 24 hours of
                  placement. Contact our support team at support@easycart.com
                  for assistance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We accept returns within 30 days of delivery for unused items
                  in original packaging. Visit our{" "}
                  <Link
                    href="/returns"
                    className="text-primary hover:underline"
                  >
                    Returns
                  </Link>{" "}
                  page for details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  How do I contact customer support?
                </AccordionTrigger>
                <AccordionContent>
                  Reach out via email at support@easycart.com, call +1 (800)
                  123-4567, or use our{" "}
                  <Link
                    href="/contact-us"
                    className="text-primary hover:underline"
                  >
                    Contact Us
                  </Link>{" "}
                  form.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
