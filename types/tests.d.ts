export type TTestQuestion = {
  question: string;
  answer: string;
  wrong_options: string[];
};

export type TTest = {
  id: string;
  userId: string;
  title: string;
  test_questions: TTestQuestion[];
};
