import { useNavigate } from "react-router-dom";

const categories = [
  { label: "Brunch", value: "brunch" },
  { label: "Fusion", value: "fusion" },
  { label: "Light Lunch", value: "light-lunch" },
  { label: "Sweet & Savoury", value: "sweet-savoury" }
];

const CategoryBar = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex gap-3 my-4 overflow-auto">
      {categories.map((c) => (
        <div
          key={c.value}
          className="px-4 py-2 border rounded bg-light"
          style={{ cursor: "pointer", whiteSpace: "nowrap" }}
          onClick={() => navigate(`/category/${c.value}`)}
        >
          🍽 {c.label}
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
