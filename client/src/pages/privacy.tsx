import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import SimpleFooter from "@/components/SimpleFooter";

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-foreground mb-8" data-testid="heading-privacy">
            Privacy Policy
          </h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: December 2025
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Your privacy is important to us. This Privacy Policy explains how MyProfile ("we", "us", or "our") 
              collects, uses, discloses, and safeguards your information when you use our service. Please read 
              this policy carefully to understand our practices regarding your personal data.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you use MyProfile, we collect the following types of information:
              </p>
              
              <h3 className="text-lg font-medium text-foreground mb-3">1.1 Account Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Your chosen username and display name</li>
                <li>Profile information you provide</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mb-3">1.2 Profile Content</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Display name and username you choose</li>
                <li>Bio, tagline, and about section text</li>
                <li>Profile pictures and banner images you upload</li>
                <li>Social media links you add</li>
                <li>Background music URLs</li>
                <li>Color preferences and theme settings</li>
                <li>Privacy settings for your profile</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mb-3">1.3 Technical Data</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Local storage data for draft profiles</li>
                <li>Basic usage analytics (page views, feature usage)</li>
                <li>Browser type and version</li>
                <li>Device information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Service Provision:</strong> To create, maintain, and display your profile page</li>
                <li><strong>Profile Display:</strong> To show your profile to visitors when you share your link</li>
                <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our features</li>
                <li><strong>Communication:</strong> To respond to your inquiries and provide support</li>
                <li><strong>Security:</strong> To detect and prevent fraud, abuse, and security threats</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Data Storage and Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We take data security seriously and implement appropriate measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Your data is stored securely in encrypted databases</li>
                <li>We use industry-standard security protocols (HTTPS/TLS)</li>
                <li>Profile images are stored as base64 encoded data directly in our secure database</li>
                <li>Session data is encrypted and stored securely</li>
                <li>We regularly review and update our security practices</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to protect your personal information, no method of transmission over the Internet 
                is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your data in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Public Profile:</strong> When you publish your profile and share its URL, the content 
                    becomes publicly accessible to anyone with the link</li>
                <li><strong>Legal Requirements:</strong> If required by law, court order, or legal process</li>
                <li><strong>Safety:</strong> To protect the rights, property, or safety of our users or others</li>
                <li><strong>Service Providers:</strong> With trusted third-party providers who assist in 
                    operating our service (hosting, analytics), under strict data protection agreements</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar tracking technologies for the following purposes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Session cookies to keep you logged in and maintain your session</li>
                <li><strong>Preference Cookies:</strong> To remember your settings and preferences (like dark mode)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Our cookies are essential for the service to function and do not track you across other websites. 
                You can control cookies through your browser settings, but disabling them may affect service functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Your Rights and Choices</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li><strong>Access:</strong> Request access to your personal data</li>
                <li><strong>Correction:</strong> Edit or update your information at any time through your profile</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a machine-readable format</li>
                <li><strong>Privacy Settings:</strong> Control who can view your profile through privacy settings</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for data processing at any time</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                To exercise any of these rights, please contact us through our Discord support server.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your profile may contain links to third-party social media platforms. These platforms have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of these external services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We retain your personal data for as long as your account is active or as needed to provide 
                you with services. We may also retain and use your information as necessary to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce our agreements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                MyProfile is not intended for children under the age of 13. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe 
                your child has provided us with personal information, please contact us immediately, 
                and we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">10. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country 
                of residence. These countries may have data protection laws different from your country. 
                By using our service, you consent to such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">11. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any significant 
                changes by updating the "Last updated" date at the top of this policy. We encourage you to 
                review this policy periodically to stay informed about how we protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, want to exercise your data rights, 
                or have concerns about how we handle your information, please contact us through:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
               
                <li>Discord Support Server: <a href="https://discord.gg/wX32zc6V9" className="text-purple-600 dark:text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">discord.gg/Myprofile</a></li>
                <li>GitHub: <a href="https://github.com/Ronnie 8822" className="text-purple-600 dark:text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">github.com/Myprofile</a></li>
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
