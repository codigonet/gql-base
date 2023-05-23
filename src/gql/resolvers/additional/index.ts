import { Additional } from "~services/additional";

export const AdditionalResolver = {
  Query: {
    additional: () => {
      const response = {
        message: Additional.message(),
        run_at: Additional.run_at(),
      };
      return response;
    },
  },
};
