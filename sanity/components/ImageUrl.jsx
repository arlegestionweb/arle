import { Stack, TextInput } from "@sanity/ui";
import { set } from "sanity";

const ImageUrl = ({ elementProps, onChange, value }) => {
  const handleChange = (event) => {
    onChange(set(event.target.value));
  };
  if (!value || value === "") {
    return (
      <Stack>
        <TextInput type="text" onChange={handleChange} value={value} />
      </Stack>
    );
  }
  return (
    <Stack>
      <TextInput type="text" onChange={handleChange} value={value} />
      <img src={value} alt="Imagen" style={{ marginTop: "10px" }} />
    </Stack>
  );
};

export default ImageUrl;

export const Image = ({ media, title }) => <img src={media} alt={title} />;
