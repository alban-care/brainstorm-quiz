import Icons from "./Icons";

type CategoryItemsProps = {
  category: CategoryType;
  setCategory: React.Dispatch<React.SetStateAction<CategoryType | undefined>>;
  results?: ResultType[];
};

const CategoryItem = ({
  category,
  results,
  setCategory,
}: CategoryItemsProps) => {
  const { score, questions } = results?.find(
    (r) => r.category === category.slug
  ) || { score: 0, questions: 0 };

  return (
    <li className="text-lg my-4">
      <button
        className="w-full flex items-center gap-x-4 p-4 text-white font-bold bg-primary-500 hover:bg-primary-700 rounded-xl"
        onClick={() => setCategory(category)}
      >
        <div className="flex justify-center items-center p-2 bg-slate-100 rounded-md">
          {Icons[category.icon]({ stroke: `${category.color}` })}
        </div>
        <p className="uppercase">{category.label}</p>
        {questions > 0 && (
          <span className="ml-auto text-sm">
            {score}/{questions} ({Math.round((score / questions) * 100)}%)
          </span>
        )}
      </button>
    </li>
  );
};

export default CategoryItem;
