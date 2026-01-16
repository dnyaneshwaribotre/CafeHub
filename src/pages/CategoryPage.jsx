import { useNavigate } from "react-router-dom";

const categories = [
  { label: "Brunch", value: "brunch" },
  { label: "Fusion", value: "fusion" },
  { label: "Light Lunch", value: "light-lunch" },
  { label: "Sweet & Savoury", value: "sweet-savoury" },
];

const CategoryBar = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex gap-3 my-4 overflow-auto">
      {categories.map((cat) => (
        <div
          key={cat.value}
          className="category-chip"
          onClick={() => navigate(`/category/${cat.value}`)}
        >
          🍽 {cat.label}
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
