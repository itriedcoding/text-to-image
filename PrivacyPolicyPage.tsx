import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8 pt-28">
      <Card className="max-w-3xl mx-auto p-6">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-4xl text-blue-900">Privacy Policy</CardTitle>
          <CardDescription className="text-blue-700 mt-2">Last Updated: October 26, 2023</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-blue-800 text-base leading-relaxed">
          <p>
            Your privacy is important to us. This Privacy Policy explains how Gemini AI ImageCrafter ("we", "us", or "our") collects, uses, and discloses information about you when you use our website (the "Service").
          </p>
          <p>
            By accessing or using the Service, you agree to this Privacy Policy. If you do not agree with our policies and practices, your choice is not to use our Service.
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">1. Information We Collect</h2>
          <p>
            We collect information from and about users of our Service, including:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>
                <strong>Information you provide to us:</strong> This includes information you provide by filling in forms on our Service, such as when you create an account (username and password), generate images (text prompts), or contact us.
              </li>
              <li>
                <strong>Usage details:</strong> When you access and use the Service, we may automatically collect certain details of your access to and use of the Service, including traffic data, location data, logs, and other communication data and the resources that you access and use on or through the Service.
              </li>
              <li>
                <strong>Device information:</strong> We may collect information about your mobile device and internet connection, including the device’s unique device identifier, IP address, operating system, browser type, mobile network information, and the device’s telephone number.
              </li>
            </ul>
          </p>
          <p>
            <strong>Note on API Keys:</strong> The Gemini AI ImageCrafter application utilizes your Google Gemini API Key via a securely managed environment variable (`process.env.API_KEY`). We do not collect, store, or have direct access to your API key. All API calls are made directly from your browser to the Google Gemini API using the key provided by your environment.
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">2. How We Use Your Information</h2>
          <p>
            We use information that we collect about you or that you provide to us, including any personal information:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>To provide you with the Service and its contents, and any other information, products, or services that you request from us.</li>
              <li>To fulfill the purposes for which you provide it, e.g., to generate images based on your prompts.</li>
              <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
              <li>To notify you about changes to our Service or any products or services we offer or provide through it.</li>
            </ul>
          </p>
          <p>
            <strong>Local Storage:</strong> We use your browser's local storage to save your image generation history, simulated user login status, and user-provided prompts. This data is stored directly on your device and is not transmitted to our servers. You can clear this data through your browser settings or directly within the application (e.g., "Clear All History" button).
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">3. Disclosure of Your Information</h2>
          <p>
            We do not share, sell, or otherwise disclose your personal information or image generation prompts to third parties, except as described in this privacy policy. We may disclose personal information that we collect or you provide:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request.</li>
              <li>To enforce or apply our Terms of Service and other agreements.</li>
              <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of Gemini AI ImageCrafter, our customers, or others.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">4. Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our Service, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.
          </p>
          <p>
            Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Service. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the Service.
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">5. Changes to Our Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. If we make material changes to how we treat our users' personal information, we will post the new Privacy Policy on this page. The date the Privacy Policy was last revised is identified at the top of the page. You are responsible for periodically visiting this Privacy Policy to check for any changes.
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">6. Contact Information</h2>
          <p>
            To ask questions or comment about this privacy policy and our privacy practices, contact us at: <a href="mailto:support@imagecrafter.com" className="text-blue-600 hover:underline">support@imagecrafter.com</a>.
          </p>

          <p className="pt-4 text-sm text-blue-600 italic">
            This is a sample Privacy Policy. Please consult with a legal professional for a privacy policy specific to your application.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;