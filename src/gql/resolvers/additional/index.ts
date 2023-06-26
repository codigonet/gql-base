import { Additional } from "~services/additional";

export const AdditionalResolver = {
  Query: {
    additional: () => {
      const password = "clave-fija"
      const algo: "error de código"
      const response = {
        message: Additional.message(),
        run_at: Additional.run_at(),
      };
      return response;
    },
  },
};
