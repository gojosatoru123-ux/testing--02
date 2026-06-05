'use client';
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen py-20">
            <div>
                <h1 className="text-5xl font-bold text-center text-purple-900 mb-4">
                    Privacy Policy
                </h1>

                <p className="text-center text-gray-500 mb-12">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <div className="bg-white/80 backdrop-blur-xl border border-purple-100 shadow-xl rounded-2xl p-10 space-y-10">

                    <section>
                        <h2 className="text-xl font-semibold text-purple-800 mb-3">
                            1. Information We Collect
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Currently, this platform does not require user accounts and does
                            not collect personal information such as names, emails, or
                            passwords.
                        </p>
                        <p className="text-gray-600 mt-2">
                            Basic technical data may be collected automatically by hosting
                            providers for security and performance purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-800 mb-3">
                            2. Future Data Collection
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            In the future, optional features such as accounts, bookmarks, or
                            learning progress tracking may be introduced. If implemented,
                            this privacy policy will be updated to clearly describe how user
                            data is collected and used.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-800 mb-3">
                            3. Data Sharing
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            We do not sell, rent, or share user data with third parties for
                            advertising or marketing purposes.
                        </p>
                        <p className="text-gray-600 mt-2">
                            Even if backend systems are introduced in the future, collected
                            information will only be used to operate and improve the
                            platform itself.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-800 mb-3">
                            4. Cookies
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            This platform currently does not use tracking cookies. If cookies
                            are introduced in the future (for authentication or preferences),
                            this policy will be updated accordingly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-800 mb-3">
                            5. Security
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            We take reasonable measures to ensure the security of the
                            platform and any systems used to store or process data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-800 mb-3">
                            6. Policy Updates
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            This Privacy Policy may be updated as the platform evolves.
                            Changes will be reflected on this page with an updated revision
                            date.
                        </p>
                    </section>

                </div>
            </div>
            <Footer/>
        </main>
    );
}