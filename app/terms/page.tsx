'use client';
import Footer from "@/components/Footer";

export default function TermsAndConditionsPage() {
    return (
      <main className="min-h-screen py-20">
        <div>
  
          <h1 className="text-5xl font-bold text-center text-purple-900 mb-4">
            Terms & Conditions
          </h1>
  
          <p className="text-center text-gray-500 mb-12">
            Last updated: {new Date().toLocaleDateString()}
          </p>
  
          <div className="bg-white/80 backdrop-blur-xl border border-purple-100 shadow-xl rounded-2xl p-10 space-y-10">
  
            <section>
              <h2 className="text-xl font-semibold text-purple-800 mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using this website, you agree to comply with
                these Terms and Conditions. If you do not agree with any part of
                these terms, you should discontinue use of the website.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-purple-800 mb-3">
                2. Purpose of the Platform
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This platform provides educational resources focused on system
                design, software architecture, and engineering knowledge. The
                content is created to help developers understand complex concepts
                through structured explanations, diagrams, and examples.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-purple-800 mb-3">
                3. Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All articles, diagrams, and educational materials on this
                platform are the intellectual property of the website owner
                unless otherwise stated. You may read and share links to the
                content, but copying or redistributing the material without
                permission is not allowed.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-purple-800 mb-3">
                4. Accuracy of Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                While we strive to provide accurate and helpful educational
                content, the platform does not guarantee that all information is
                complete, accurate, or up to date.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-purple-800 mb-3">
                5. Future Features
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The platform may introduce additional features in the future,
                including user accounts, backend services, or personalized
                learning experiences. Any such changes will be reflected in
                updated terms and policies.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-purple-800 mb-3">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The website owner is not responsible for any damages resulting
                from the use of this platform or reliance on its content.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold text-purple-800 mb-3">
                7. Changes to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms may be updated periodically. Continued use of the
                platform after updates implies acceptance of the revised terms.
              </p>
            </section>
  
          </div>
        </div>
        <Footer/>
      </main>
    );
  }