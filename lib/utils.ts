const API_URL = "https://alban-care.github.io/data/brainstorm-quiz";

export const getCategories = async () => {
  const path = `${API_URL}/categories.json`;
  const response = await fetch(path);

  return response.json();
};

export const getQuestionsByCategory = async (
  category: string,
  length?: number
) => {
  const count = await getCountCategory(category);
  const shuffleArray = createShuffleArray(0, count, length);

  const path = `${API_URL}/${category}.json`;
  const response = await fetch(path);
  const data = await response.json();

  const questions = shuffleArray.map((item) => data.results[item]);

  const questionsWithSuffleAnswers = questions.map((question) => {
    const answersShuffleArray = createShuffleArray(0, 4);

    const answersShuffled = answersShuffleArray.map((item) => {
      return question.answers[item];
    });

    return {
      ...question,
      answers: answersShuffled,
    };
  });

  return questionsWithSuffleAnswers;
};

const getCountCategory = async (category: string) => {
  const path = `${API_URL}/${category}.json`;
  const response = await fetch(path);
  const data = await response.json();

  return data.count;
};

const createShuffleArray = (
  min: number | 0,
  max: number,
  length?: number
): number[] => {
  const array = Array.from({ length: max - min }, (_, i) => i + min);
  const shuffleArray = array.sort(() => Math.random() - 0.5);

  if (!length) return shuffleArray.slice(0, max);

  return shuffleArray.slice(0, length);
};
