"use server";

import { fakerFR as faker } from "@faker-js/faker";
import prisma from "@/lib/prisma";
import {
  BookingModes,
  TravelModes,
  TShirtsSizes,
} from "@/lib/schemas/registerFormSchema";

export const seed = async () => {
  const code = faker.location.countryCode();
  const firstName = faker.person.firstName();
  const lastName = faker.person.firstName();

  await prisma.registration.create({
    data: {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number().replace(" ", ""),
      birthdate: faker.date.birthdate().toISOString(),
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
      box: faker.location.buildingNumber(),
      country: code,
      zip: faker.location.zipCode(),
      city: faker.location.city(),
      emergencyName: faker.person.fullName(),
      emergencyPhone: faker.phone.number(),
      chapter: `${code} ${faker.number.int({ min: 1, max: 8 })}`,
      chapterFunction: faker.helpers.arrayElement([
        "President",
        "Vice President",
        "Member",
        "Sgt at arms",
        "Treasurer",
        "Chairman",
        "Prospect",
        "Secretary",
        "Board member",
        "Founder",
        "Chaplain",
      ]),
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      licencePlate: faker.vehicle.vrm(),
      travelMode: faker.helpers.enumValue(TravelModes),
      booking: faker.helpers.enumValue(BookingModes),
      willShareRoom: faker.helpers.arrayElement([true, false]),
      staysWith: faker.helpers.arrayElement([null, faker.person.fullName()]),
      languages: faker.helpers.arrayElement([
        null,
        faker.helpers
          .arrayElements(
            [
              "English",
              "Italian",
              "Romanian",
              "German",
              "Spanish",
              "Finnish",
              "French",
              "Dutch",
              "Catalan",
              "Basque",
              "Portuguese",
              "Polish",
              "Czech",
              "Slovak",
              "Slovenian",
              "Croatian",
            ],
            { min: 1, max: 6 },
          )
          .join(", "),
      ]),
      tshirtsAmount: faker.helpers.arrayElement([
        null,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
      ]),
      tshirtsSize: faker.helpers.arrayElement([
        undefined,
        faker.helpers.enumValue(TShirtsSizes),
      ]),
      hasAgreedToPay: true,
      hasAgreedToData: true,
      hasAgreedToPicture: faker.helpers.arrayElement([true, false]),
    },
  });
};
