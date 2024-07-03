import { formatPrice } from "@/lib/utils";
import {
  REGISTRATION_FEE,
  T_SHIRT_UNIT_PRICE,
} from "@/constants/accommodations";
import {
  tShirtSizeTranslation,
  TShirtsSizes,
} from "@/lib/schemas/registerFormSchema";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

type RegistrationCompletedParams = {
  targetMail: string;
  name: string;
  tshirtsAmount: string;
  size: TShirtsSizes | null;
};

export const registrationCompleted = async ({
  targetMail,
  name,
  tshirtsAmount,
  size,
}: RegistrationCompletedParams) => {
  if (!process.env.BREVO_API_KEY) {
    return null;
  }

  try {
    const hasTshirts = tshirtsAmount !== "" && Number(tshirtsAmount) > 0;
    const TshirtsTotal = Number(tshirtsAmount || 0) * T_SHIRT_UNIT_PRICE;

    const apiInstance = new TransactionalEmailsApi();
    apiInstance.setApiKey(0, process.env.BREVO_API_KEY);
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.templateId = 1;
    sendSmtpEmail.to = [{ email: targetMail }];
    sendSmtpEmail.replyTo = {
      email: "international.convention.2025@gmail.com",
      name: "Belgium VII Admin",
    };
    sendSmtpEmail.params = {
      name,
      fee: formatPrice(REGISTRATION_FEE),
      hasTshirts,
      size: size ? tShirtSizeTranslation[size] : "",
      tshirtsAmount,
      tshirtsUnitPrice: formatPrice(T_SHIRT_UNIT_PRICE),
      tshirtsTotal: formatPrice(TshirtsTotal),
      total: formatPrice(TshirtsTotal + REGISTRATION_FEE),
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (e) {
    console.error("Error while sending mail", e);
  }
};
