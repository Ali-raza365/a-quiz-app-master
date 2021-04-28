import axios from 'axios';
import { DIFFICULTY, Question, Quiz } from '../Type/types';
import shuffleArray from '../utils';

export const QuizDetails = async (questions: number, category: number, difficulty: DIFFICULTY): Promise<Question[]> => {
    try {
        let url :string =`https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}&type=multiple`
        console.log(url)
        const res = await axios.get(url);
            const { results } = await res.data;
            const quiz = results.map((questionObj: Quiz) => {
                return {
                    question: questionObj.question,
                    answer: questionObj.correct_answer,
                    option: shuffleArray([...questionObj.incorrect_answers, questionObj.correct_answer])
                }
            })
            console.log(results,'api',res)
            return quiz;
        } catch (error) {
            console.log(error)
            return []
        }
}

export const CategoryDetails = async () => {
    const res = await fetch(`https://opentdb.com/api_category.php`);
    const {trivia_categories} = await res.json();
    console.log(trivia_categories)
    return trivia_categories;
}