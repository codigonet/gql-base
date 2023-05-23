import { Core } from "~services/core";

export const CoreResolver = {
  Query: {
    core: () => {
      const ok = "ok";
      const response = {
        version: Core.version(),
        run_at: Core.run_at(),
        ok,
      };
      return response;
    },
  },
};
