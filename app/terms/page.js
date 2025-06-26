"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";
import Link from "next/link";
export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            By using EasyCart, you agree to our terms of service.
          </p>
        </section>
        <Separator />
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Terms of Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Use of Our Site</h3>
              <p className="mt-2 text-muted-foreground">
                You agree to use EasyCart for lawful purposes only. Unauthorized
                use, including hacking or reselling products without permission,
                is prohibited.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Purchases and Payments</h3>
              <p className="mt-2 text-muted-foreground">
                All purchases are subject to availability. We accept major
                credit cards and digital wallets. Prices are listed in USD and
                include applicable taxes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Returns and Refunds</h3>
              <p className="mt-2 text-muted-foreground">
                Refer to our{" "}
                <Link href="/returns" className="text-primary hover:underline">
                  Returns
                </Link>{" "}
                page for details on our 30-day return policy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Limitation of Liability</h3>
              <p className="mt-2 text-muted-foreground">
                EasyCart is not liable for damages arising from the use of our
                site or products, except as required by law. Products are
                provided "as is."
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <p className="mt-2 text-muted-foreground">
                For questions about these terms, contact us at{" "}
                <Link
                  href="/contact-us"
                  className="text-primary hover:underline"
                >
                  support@easycart.com
                </Link>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
