import { getCollection } from "astro:content";

export const reactLearningPages = await getCollection(
  "reactLearning",
  (entry) => {
    return true;
  }
);
