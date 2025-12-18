import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import SimpleFooter from "@/components/SimpleFooter";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">
                <span className="text-foreground">My</span>
                <span className="text-purple-600 dark:text-purple-400">Profile</span>
              </span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-8" data-testid="heading-terms">
            Terms of Service
          </h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: December 2025
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing or using MyProfile ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
                If you do not agree to these terms, please do not use our service. These Terms apply to all visitors, 
                users, and others who access or use the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to update or modify these Terms at any time without prior notice. Your continued 
                use of the Service after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                MyProfile is a free platform that allows users to create customizable profile pages 
                with the following features:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Social media links aggregation</li>
                <li>Custom color themes and gradients</li>
                <li>Custom typography and font selection</li>
                <li>Profile picture and banner image uploads</li>
                <li>Background music for profile visitors</li>
                <li>Shareable unique profile URLs</li>
                <li>Privacy settings for profile visibility</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Users can share their unique profile URL with others to showcase all their social links in one place.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Using the Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By using MyProfile, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Provide accurate and complete information in your profile</li>
                <li>Be responsible for all content you create and share</li>
                <li>Not use the service for fraudulent purposes</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 13 years of age to use this Service. By using MyProfile, you represent 
                that you meet this age requirement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. User Content and Conduct</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are solely responsible for all content you upload, post, or display on your profile. 
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Upload illegal, harmful, threatening, abusive, or offensive content</li>
                <li>Post content that is defamatory, obscene, or sexually explicit</li>
                <li>Infringe on others' intellectual property rights, trademarks, or copyrights</li>
                <li>Use the service for spam, phishing, or malicious purposes</li>
                <li>Impersonate others or provide misleading information</li>
                <li>Upload malware, viruses, or any harmful code</li>
                <li>Attempt to gain unauthorized access to systems</li>
                <li>Violate any applicable local, state, national, or international law</li>
                <li>Harass, abuse, or harm another person or group</li>
                <li>Promote violence, discrimination, or hate speech</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to remove any content that violates these Terms or is otherwise 
                objectionable at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Your Content:</strong> You retain full ownership of all content you create and upload to MyProfile. 
                By using our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, 
                display, and distribute your content solely for the purpose of operating and providing the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Our Content:</strong> The MyProfile platform, including its design, code, features, and branding, 
                remains our exclusive property. You may not copy, modify, distribute, sell, or lease any part of 
                our Service or included software.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Feedback:</strong> Any feedback, suggestions, or ideas you provide about the Service may be used 
                by us without any obligation to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Music and Media Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When adding background music to your profile, you are responsible for ensuring you have 
                the legal right to use that audio content. This includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Only using music you own or have permission to use</li>
                <li>Respecting copyright laws and licensing agreements</li>
                <li>Not using copyrighted music without proper authorization</li>
                <li>Understanding that we may remove content that violates copyright</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Account Termination</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to suspend or terminate accounts that violate these Terms, at our sole discretion, 
                without prior notice. Reasons for termination may include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Violation of these Terms of Service</li>
                <li>Engaging in illegal activities</li>
                <li>Uploading prohibited content</li>
                <li>Abusive behavior towards other users or staff</li>
                <li>Creating multiple accounts for malicious purposes</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You may delete your account at any time by contacting us through our Discord support server.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Service Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to maintain high availability of the Service, but we do not guarantee 
                uninterrupted or error-free operation. We may modify, suspend, or discontinue any part 
                of the Service at any time without notice. We shall not be liable for any modification, 
                suspension, or discontinuation of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                MyProfile is provided "as is" and "as available" without warranties of any kind, either 
                express or implied, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Implied warranties of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy or reliability of content</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We do not warrant that the Service will meet your requirements, be uninterrupted, secure, 
                or error-free.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">10. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, MyProfile and its creators shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages, including but 
                not limited to loss of profits, data, use, or goodwill, arising out of or related to your 
                use of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">11. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless MyProfile and its operators from and 
                against any claims, liabilities, damages, losses, and expenses arising out of or in any 
                way connected with your access to or use of the Service or your violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">12. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws, 
                without regard to conflict of law provisions. Any disputes arising from these Terms 
                shall be resolved through good-faith negotiation or, if necessary, through appropriate 
                legal channels.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">13. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision 
                shall be limited or eliminated to the minimum extent necessary, and the remaining provisions 
                shall remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">14. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us through:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Discord Support Server: <a href="https://discord.gg/wX32zc6V9" className="text-purple-600 dark:text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">discord.gg/Myprofile</a></li>
                <li>GitHub: <a href="https://github.com/Ronnie8822" className="text-purple-600 dark:text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">github.com/Myprofile</a></li>
                <li>X (Twitter): <a href="https://x.com/rommu_uwu" className="text-purple-600 dark:text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">x.com/Myprofile</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <SimpleFooter />
    </div>
  );
}
