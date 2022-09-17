import Ajv from "ajv";

export default function () {
  const ajv = new Ajv({ allErrors: true });

  const schema = {
    type: "object",
    properties: {
      email: { type: "string" },
      phone: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      preferredFirstName: { type: "string", nullable: true },
      preferredLastName: { type: "string", nullable: true },
      preferredPronouns: { type: "string", nullable: true },
      address1: { type: "string" },
      address2: { type: "string", nullable: true },
      city: { type: "string" },
      state: { type: "string" },
      postalCode: { type: "string" },
      dateOfBirth: { type: "string" },
      ssn: { type: "string" },
      ipAddress: { type: "string" }
    },
    required: ["email", "phone", "firstName", "lastName", "address1", "city", "state", "postalCode", "dateOfBirth", "ssn", "ipAddress"],
    additionalProperties: false,
  }

  return { validate: ajv.compile(schema), ajv }
}