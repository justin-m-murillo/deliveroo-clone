import { SanityClient } from "@sanity/client";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

import defineCliConfig from './sanity';

const client = SanityClient({
  projectId: defineCliConfig.api.projectId,
  dataset: defineCliConfig.api.dataset,
  useCdn: true,
  apiVersion: "2023-6-13",
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;