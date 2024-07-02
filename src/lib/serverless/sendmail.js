import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-north-1",
});

export const registrationCompleted = async ({ targetMail }) => {
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });

  try {
    await ses
      .sendEmail({
        Source: "admin@ic2025-belgium8.com",
        Destination: {
          ToAddresses: [targetMail],
        },
        Message: {
          Subject: {
            Data: "Registered to the Blue Knights 2025 International Convention",
            Charset: "UTF-8",
          },
          Body: {
            Html: {
              Data: `<div>
                      <img alt="convention logo" src="https://ic2025-belgium8.com/convention_small.png">
                      <h1>Congratulations !</h1>
                      <p>
                        Hello dear blue knights, you have completed the first step of your registration. To fulfil this, you still have to pay the intl. convention fee and eventual t-shirts.
                      </p>
                      <ul>
                        <li>Convention fee per person: 180€</li>
                        <li>T-shirt per piece: €19</li>
                      </ul>
                        <p>Payment informations :</p>
                        <p>
                          Blue Knight Belgium VIII<br />
                          Rue des frères 28<br />
                          7830 Thoricourt<br />
                          Bank name : Crelan<br />
                          <br />
                          Bank address: Belgium, 1070 Anderlecht, Bd sylvain Dupuis 251<br />
                          Bank Account IBAN: BE98 1030 7020 1493<br />
                          SWIFT/BIC: NICABEBBXXX<br />
                          COMMUNICATION: Registration Nr + Name (no aka) + Chapter
                        </p>
                        <p>
                          After the payment of the registration fee, you will receive a second confirmation email containing information to book the accommodation if necessary.
                        </p>
                        <p>For further details please contact us at international.convention.2025@gmail.com. Don't respond to this e-mail.</p>
                        <p>See you there !<p>
                    </div>`,
              Charset: "UTF-8",
            },
          },
        },
      })
      .promise();
  } catch (e) {
    console.error("Error while sending mail", e);
  }
};
