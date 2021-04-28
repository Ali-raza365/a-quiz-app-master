export enum DIFFICULTY {
    EASY = "easy",
    MEDIUM = "medium",
    DIFFICULT = "difficult"
}

export type Quiz = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type Question = {
    question: string
    answer: string
    option: string[]
}

export type QuestionCardType = {
    question: string
    answer: string
    option: string[]
    totalQuestion: number
    currentQuestion: number
    callback: (
        e: React.FormEvent<EventTarget>,
        answer: string,
    ) => void;
}

export type inputPropType = {
    category: number,
    setCategory: (category: number) => void,
    totalQuestion: number,
    setTotalQuestion: (totalQuestion: number) => void,
    difficulty: DIFFICULTY,
    setDifficulty: (difficulty: DIFFICULTY) => void,
    callback: (
        e: React.FormEvent<EventTarget>,
        category: number,
        totalQuestion: number,
        difficulty: string
    ) => void;
}

export type CategoryType = {
    id: number,
    name: string
}

export type QuestionNoType = {
    question: number
}