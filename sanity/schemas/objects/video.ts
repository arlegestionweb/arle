import { defineField } from "sanity";

export const videoSchema = defineField({
  name: "video",
  title: "Video",
  type: "file",
  options: {
    accept: "video/*",
  },
})