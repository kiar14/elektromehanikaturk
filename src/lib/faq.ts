export type FaqItem = {
  question: string;
  answer: string;
};

export function getMeaningfulFaqItems(items: FaqItem[]) {
  return items.filter(
    (item) => item.question.trim().length > 0 && item.answer.trim().length > 0,
  );
}
