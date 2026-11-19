import type { FormComponentProps } from "./ThriftHappensApp";
import type { Fit, ClothingCategory, ClothingSize } from "../../src/data/data";

const fit: Fit[] = ["men", "women", "kids"];
const clothingCategory: ClothingCategory[] = [
  "hoodie",
  "pants",
  "shirt",
  "shorts",
  "t-shirt",
];
const clothingSize: ClothingSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

export default function FormComponent({
  clothingArticle,
  handleOnSubmit,
  handleOnChange,
}: FormComponentProps) {
  return (
    <div>
      <form action="" onSubmit={handleOnSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={clothingArticle.name}
          onChange={handleOnChange}
        />
        <br />
        <label htmlFor="image">Image:</label>
        <input
          type="text"
          name="image"
          id="image"
          value={clothingArticle.image}
          onChange={handleOnChange}
        />
        <br />
        <label htmlFor="fit">Fit:</label>
        <select
          name="fit"
          id="fit"
          value={clothingArticle.fit}
          onChange={handleOnChange}
        >
          {fit.map((fit) => (
            <option key={fit} value={fit}>
              {fit}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="category">Category:</label>
        <select
          name="category"
          id="category"
          value={clothingArticle.category}
          onChange={handleOnChange}
        >
          {clothingCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
