import { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return <h2 className="my-4 text-xl font-bold">{children}</h2>;
};
const SubTitle = ({ children }: { children: ReactNode }) => {
  return <h3 className="my-2 font-bold">{children}</h3>;
};

export default function Conditions() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        General Terms and Conditions (GTC) for Event Registration
      </h1>
      <Title>1. Subject</Title>
      <p>
        These General Terms and Conditions of Sale (GTCS) govern the terms and
        conditions of ticket sales for registration to International convention
        2025, organized by Blue Knights LEMC Belgium VIII (hereinafter referred
        to as &quot;the Organizer&quot;). By registering for the event, the
        participant unreservedly accepts these GTC.
      </p>

      <Title>2. Registration and Payment </Title>
      <SubTitle>2.1. Registration process </SubTitle>
      <p>
        Registration for the Event is exclusively online at
        https://ic2025-belgium8.com/. Participants must provide accurate and
        complete information when registering.
      </p>
      <SubTitle>2.2. Fees and payment terms</SubTitle>
      <p>
        Fees are indicated on the event website and are expressed in euros,
        inclusive of all taxes. Payment must be made by bank transfer to account
        BIC: BE98 1030 7020 1493, Swift: NICABEBBXXX, Account name: Blue Knights
        Belgium VIII, Address: Rue des frères 28, ZIP: 7830 Thoricourt, Country:
        Belgium
      </p>
      <SubTitle>2.3 Registration Confirmation</SubTitle>
      <p>
        Registration is confirmed upon receipt of payment. The participant will
        receive a confirmation e-mail with the link to the accommodation booking
        site.
      </p>

      <Title>3. Cancellation and Refund </Title>
      <SubTitle>3.1. Cancellation by the Participant </SubTitle>
      <p>
        All cancellations must be notified to the Organizer in writing. Refund
        conditions are as follows: Cancellation costs are borne by the
        participant (exchange and bank charges). - Cancellation up to 60 days
        before the event: full refund. - Cancellation between 60 and 30 days
        before the event: 80% refund. - Cancellation less than 29 days before
        the event: no refund.{" "}
      </p>
      <SubTitle>3.2. Cancellation or Modification by the Organizer</SubTitle>
      <p>
        The Organizer reserves the right to cancel or modify the event in the
        event of force majeure or other exceptional circumstances. In the event
        of cancellation, participants will receive a full refund. In the event
        of modification, participants will have the option of maintaining their
        registration or requesting a refund.
      </p>

      <Title>4. Right of withdrawal</Title>
      <p>
        In accordance with article L.221-28 of the French Consumer Code, the
        right of withdrawal does not apply to leisure services provided at a
        specific date or frequency. Consequently, registration fees cannot be
        exchanged or refunded, except under the conditions set out in article 3.
      </p>

      <Title>5. Liability </Title>
      <p>
        The Organizer declines all liability in the event of bodily injury,
        material or immaterial damage caused during the event, except in the
        event of gross negligence or intent on its part. Participation in the
        event is the sole responsibility of the participant.
      </p>

      <Title>6. Intellectual property rights </Title>
      <p>
        All content and materials used during the event are protected by
        copyright and any unauthorized use is strictly prohibited.
      </p>

      <Title>7. Personal data </Title>
      <p>
        Personal information collected during registration is processed in
        accordance with the Organizer&#39;s privacy policy. Participants have
        the right to access, rectify and delete their data in accordance with
        current regulations.
      </p>

      <Title>8. Disputes </Title>
      <p>
        These GCS are governed by Belgian law. In the event of a dispute, the
        parties shall endeavor to find an amicable solution. Failing this, the
        dispute will be referred to the competent courts.
      </p>

      <Title>9. Acceptance of the GCS </Title>
      <p>
        By registering for the event, the participant acknowledges having read
        these terms and conditions and accepts them unreservedly. If you have
        any questions about these terms and conditions, please contact Blue
        Knights LEMC Belgium VIII.
      </p>
    </div>
  );
}
