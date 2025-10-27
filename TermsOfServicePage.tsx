import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8 pt-28">
      <Card className="max-w-3xl mx-auto p-6">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-4xl text-blue-900">Terms of Service</CardTitle>
          <CardDescription className="text-blue-700 mt-2">Last Updated: October 26, 2023</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-blue-800 text-base leading-relaxed">
          <p>
            Welcome to Gemini AI ImageCrafter! These Terms of Service ("Terms") govern your access to and use of our website and services, including any content, functionality, and services offered on or through the Gemini AI ImageCrafter website (the "Service").
          </p>
          <p>
            Please read the Terms carefully before you start to use the Service. By using the Service, you accept and agree to be bound and abide by these Terms and our Privacy Policy, found at [Privacy Policy Link]. If you do not want to agree to these Terms or the Privacy Policy, you must not access or use the Service.
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">1. Accessing the Service and Account Security</h2>
          <p>
            We reserve the right to withdraw or amend this Service, and any service or material we provide on the Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of the Service, or the entire Service, to users, including registered users.
          </p>
          <p>
            You are responsible for both:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Making all arrangements necessary for you to have access to the Service.</li>
              <li>Ensuring that all persons who access the Service through your internet connection are aware of these Terms and comply with them.</li>
            </ul>
          </p>
          <p>
            To access the Service or some of the resources it offers, you may be asked to provide certain registration details or other information. It is a condition of your use of the Service that all the information you provide on the Service is correct, current, and complete. You agree that all information you provide to register with this Service or otherwise, including, but not limited to, through the use of any interactive features on the Service, is governed by our Privacy Policy, and you consent to all actions we take with respect to your information consistent with our Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">2. Intellectual Property Rights</h2>
          <p>
            The Service and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p>
            These Terms permit you to use the Service for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service, except as generally and ordinarily permitted through the Service.
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">3. Prohibited Uses</h2>
          <p>
            You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information, or otherwise.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
              <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
            </ul>
          </p>
          <p>
            Additionally, you agree not to:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Use the Service in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Service.</li>
              <li>Use any robot, spider, or other automatic device, process, or means to access the Service for any purpose, including monitoring or copying any of the material on the Service.</li>
              <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">4. Disclaimer of Warranties</h2>
          <p>
            YOUR USE OF THE SERVICE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICE IS AT YOUR OWN RISK. THE SERVICE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICE.
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">5. Limitation on Liability</h2>
          <p>
            TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE SERVICE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
          </p>

          <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">6. Governing Law and Jurisdiction</h2>
          <p>
            All matters relating to the Service and these Terms, and any dispute or claim arising therefrom or related thereto (in each case, including non-contractual disputes or claims), shall be governed by and construed in accordance with the internal laws of the State of California without giving effect to any choice or conflict of law provision or rule.
          </p>

          <p className="pt-4 text-sm text-blue-600 italic">
            This is a sample Terms of Service. Please consult with a legal professional for terms specific to your application.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;