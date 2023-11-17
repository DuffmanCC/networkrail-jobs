const schema = {
  type: "object",
  properties: {
    description: {
      type: "string",
    },
    howToApply: {
      type: "string",
    },
    aboutTheRole: {
      type: "object",
      properties: {
        essential: {
          type: "array",
          items: {
            type: "string",
          },
        },
        desirable: {
          type: "array",
          items: {
            type: "string",
          },
        },
        keyAccountabilities: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["essential", "desirable", "keyAccountabilities"],
    },
  },
  required: ["description", "howToApply", "aboutTheRole"],
};

export default schema;
