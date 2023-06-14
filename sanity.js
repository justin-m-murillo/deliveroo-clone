import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: 'f6bbyrdy',
  dataset: 'production',
  useCdn: true,
  apiVersion: "2023-06-13",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;