import { NhostClient } from "@nhost/nhost-js";
import { subdomain, region } from "../../env.js";

export const nhost = new NhostClient({
  subdomain,
  region,
});

export const nhostConfig = {
  subdomain,
  region,
};
