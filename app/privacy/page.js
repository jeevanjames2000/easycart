"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";
import Link from "next/link";
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Your privacy matters to us. Learn how we protect your information.
          </p>
        </section>
        <Separator />
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              EasyCart Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Information We Collect</h3>
              <p className="mt-2 text-muted-foreground">
                We collect personal information such as your name, email, and
                shipping address when you register, place an order, or contact
                us. We also collect browsing data via cookies to improve your
                shopping experience.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                How We Use Your Information
              </h3>
              <p className="mt-2 text-muted-foreground">
                Your information is used to process orders, personalize your
                experience, and send promotional emails (with your consent). We
                do not sell or share your data with third parties except as
                required for order fulfillment.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Data Security</h3>
              <p className="mt-2 text-muted-foreground">
                We use industry-standard encryption to protect your data during
                transmission and storage. However, no method is 100% secure, and
                we strive to continuously improve our security measures.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Your Rights</h3>
              <p className="mt-2 text-muted-foreground">
                You can access, update, or delete your personal information via
                your account or by contacting us at support@easycart.com. You
                may also opt out of marketing emails at any time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <p className="mt-2 text-muted-foreground">
                For questions about our privacy practices, reach out at{" "}
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
