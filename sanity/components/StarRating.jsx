import { useEffect, useState } from "react";
import { set } from "sanity";
const Star = ({ selected = false, onSelect = (f) => f }) => (
  <span
    onClick={onSelect}
    style={{ cursor: "pointer", color: selected ? "gold" : "gray", fontSize: 32 }}
  >
    ★
  </span>
);

const StarRating = (props) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const totalStars = props.totalStars || 5;

  useEffect(() => {
    setSelectedStars(props.value || 0);
  }, []);

  return (
    <>
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < selectedStars}
          onSelect={() => {
            setSelectedStars(i + 1);
            props.onChange(set(i + 1))
          }}
        />
      ))}
      <p>
        {selectedStars} de {totalStars} estrellas
      </p>
    </>
  );
};

export default StarRating;
