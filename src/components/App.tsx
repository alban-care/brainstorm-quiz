import { useEffect, useState } from "react";
import Layout from "./Layout";
import { getCategories, getQuestionsByCategory } from "../../lib/utils";
import CategoryItem from "./CategoryItem";
import AnswerItem from "./AnswerItem";
import ResponseItem from "./ResponseItem";
import ProgressBar from "./ProgressBar";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Icons from "./Icons";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState<CategoryType | undefined>();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [question, setQuestion] = useState<QuestionType>();
  const [response, setResponse] = useState<AnswerType>();
  const [progress, setProgress] = useState(0);

  const [results, setResults] = useLocalStorage<ResultType[]>(
    "remue-meninges-results",
    []
  );

  useEffect(() => {
    const clearResults = (e: KeyboardEvent) => {
      if (e.key === "Delete" && questions.length === 0) {
        setResults([]);
      }
    };

    window.addEventListener("keydown", clearResults);

    return () => window.removeEventListener("keydown", clearResults);
  }, [setResults, questions]);

  useEffect(() => {
    const setResultsByCategory = (
      category: CategoryType | undefined,
      score: number
    ) => {
      const resultsByCategory = results.find(
        (r) => r.category === category?.tag
      );

      if (resultsByCategory) {
        resultsByCategory.score += score;
        resultsByCategory.questions += 1;
      } else {
        results.push({
          category: category?.tag,
          score,
          questions: 1,
        });
      }

      setResults([...results]);
    };

    if (response) {
      setResultsByCategory(category, response.isCorrect ? 1 : 0);
    }
  }, [response]);

  useEffect(() => {
    if (category) {
      const fetchQuestions = async (category: CategoryType) => {
        const q = (await getQuestionsByCategory(
          category.tag,
          5
        )) as QuestionType[];
        setQuestions(q);
      };

      fetchQuestions(category);
    }

    setQuestions([]);
  }, [category]);

  useEffect(() => {
    const question = questions.pop();
    setQuestion(question);
  }, [questions]);

  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => {
        const question = questions.pop();

        if (!question) {
          setCategory(undefined);
          setProgress(0);
        }

        setQuestion(question);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [question, response, questions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponse(undefined);
    }, 2000);

    return () => clearTimeout(timer);
  }, [response]);

  useEffect(() => {
    if (response) setProgress((p) => p + 1);
  }, [response, setProgress]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, [categories]);

  if (categories.length === 0) {
    return (
      <Layout>
        <p className="text-3xl font-bold">Chargement des catégories...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center w-full lg:flex-row lg:items-start lg:gap-x-32 mt-12">
        <div className="w-full">
          {category && (
            <div className="w-full flex items-center gap-x-4 text-white font-bold rounded-xl">
              <div className="flex justify-center items-center p-2 bg-slate-100 rounded-md">
                {Icons[category.icon]({ stroke: `${category.color}` })}
              </div>
              <p className="uppercase">{category.label}</p>
            </div>
          )}
          {question ? (
            <>
              <p className="text-lg text-gray-500 italic font-bold mt-4">
                {question && !response && (progress >= 0 || progress <= 5)
                  ? `Question ${progress + 1} sur 5`
                  : `Question ${progress} sur 5`}
              </p>
              <p className="text-3xl font-bold mt-4">{question.question}</p>
              {category && <ProgressBar total={5} current={progress} />}
            </>
          ) : (
            <>
              <h1 className="text-5xl">
                Bienvenue dans le{" "}
                <span className="font-extrabold whitespace-nowrap">
                  Remue-Méninges!
                </span>
              </h1>
              <p className="text-xl italic my-12">
                Choisissez une catégorie pour commencer
              </p>
            </>
          )}
        </div>
        <div className="w-full">
          {!category && (
            <ul className="mt-4">
              {categories.map((c: CategoryType) => (
                <CategoryItem
                  key={c.id}
                  category={c}
                  setCategory={setCategory}
                  results={results}
                />
              ))}
            </ul>
          )}
          {category && !question && (
            <p className="text-3xl font-bold">Chargement des questions...</p>
          )}
          {question && (
            <ul className="mt-4">
              {!response &&
                question.answers.map((a: AnswerType) => (
                  <AnswerItem key={a.id} answer={a} setResponse={setResponse} />
                ))}
              {response &&
                question.answers.map((a: AnswerType) => (
                  <ResponseItem key={a.id} answer={a} response={response} />
                ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
