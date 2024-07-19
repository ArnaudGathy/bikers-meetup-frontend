import { formatPrice, getTotal, getTshirtsTotal } from "@/lib/utils";
import {
  REGISTRATION_FEE,
  T_SHIRT_UNIT_PRICE,
} from "@/constants/accommodations";
import {
  tShirtSizeTranslation,
  TShirtsSizes,
} from "@/lib/schemas/registerFormSchema";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

const configEmail = ({
  templateId,
  targetMail,
}: {
  templateId: number;
  targetMail: string;
}) => {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("API Key not found");
  }

  const apiInstance = new TransactionalEmailsApi();
  apiInstance.setApiKey(0, process.env.BREVO_API_KEY);
  const sendSmtpEmail = new SendSmtpEmail();
  sendSmtpEmail.templateId = templateId;
  sendSmtpEmail.to = [{ email: targetMail }];
  sendSmtpEmail.replyTo = {
    email: "international.convention.2025@gmail.com",
    name: "Belgium VII Admin",
  };
  return { sendSmtpEmail, apiInstance };
};

type RegistrationCompletedParams = {
  targetMail: string;
  name: string;
  tshirtsAmount: number | null;
  size?: TShirtsSizes;
  id: number;
};

export const registrationCompleted = async ({
  targetMail,
  name,
  tshirtsAmount,
  size,
  id,
}: RegistrationCompletedParams) => {
  const hasTshirts = tshirtsAmount !== null && tshirtsAmount > 0;
  const TshirtsTotal = getTshirtsTotal(tshirtsAmount);

  const { sendSmtpEmail, apiInstance } = configEmail({
    templateId: 1,
    targetMail,
  });
  sendSmtpEmail.params = {
    name,
    id,
    fee: formatPrice(REGISTRATION_FEE),
    hasTshirts,
    size: size ? tShirtSizeTranslation[size] : "",
    tshirtsAmount,
    tshirtsUnitPrice: formatPrice(T_SHIRT_UNIT_PRICE),
    tshirtsTotal: formatPrice(TshirtsTotal),
    total: formatPrice(getTotal(tshirtsAmount)),
  };

  await sendMail({ sendSmtpEmail, apiInstance });
};

export const paymentReceived = async ({
  targetMail,
  isBooking,
}: {
  targetMail: string;
  isBooking: boolean;
}) => {
  const { sendSmtpEmail, apiInstance } = configEmail({
    templateId: isBooking ? 2 : 3,
    targetMail,
  });
  await sendMail({ sendSmtpEmail, apiInstance });
};

const sendMail = async ({
  sendSmtpEmail,
  apiInstance,
}: {
  sendSmtpEmail: SendSmtpEmail;
  apiInstance: TransactionalEmailsApi;
}) => {
  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (e) {
    console.error("Error while sending mail", e);
  }
};
