import React, { useEffect, useState ,FunctionComponent} from 'react'
import { Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import { CategoryDetails } from '../../Services/quizServices';
import {  CategoryType, DIFFICULTY } from '../../Type/types';
import styles from './inputCard.module.css';

const questions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
 interface inputPropType {
    category: number,
    setCategory: (category: number  |((prevVar: number) => number)) => void,
    totalQuestion: number,
    setTotalQuestion: (totalQuestion: number  |((prevVar: number) => number))=> void,
    difficulty: DIFFICULTY,
    setDifficulty: (difficulty: any) => void,
    callback: (
        e: React.ChangeEvent <EventTarget>,
        category: number,
        totalQuestion: number,
        difficulty: string
    ) => void;
}

const InputCard:FunctionComponent<inputPropType> = ({category, setCategory, totalQuestion, setTotalQuestion, difficulty, setDifficulty, callback }) => {
    let [categoryData, setCategoryData] = useState<CategoryType[]>([]);
    useEffect(() => {
        async function Categories() {
            const categoryData = await CategoryDetails();
            setCategoryData(categoryData);
        }
        Categories();
    }, [])

    return  ( <>
        <div className={styles.container}>
            <form
                action=''
                onSubmit={(e: React.FormEvent<EventTarget>) =>
                    callback(e, category, totalQuestion, difficulty)
                }
            >
                <h1 className={styles.heading}>Quiz App</h1>
                <div className={styles.card}>
                    <div className={styles.configuration}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel className={styles.color} id="demo-simple-select-outlined-label">Category</InputLabel>
                            <Select
                                className={styles.color}
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={category}
                                defaultValue={category}
                                required
                                onChange={(event) => setCategory(Number(event.target.value))}
                                label="Category"
                            >
                                {categoryData.map((option: CategoryType, ind: number) => (
                                    <MenuItem key={ind} value={option.id}>{option.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={styles.configuration}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel className={styles.color} id="demo-simple-select-outlined-label">No of Questions</InputLabel>
                            <Select
                                className={styles.color}
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={totalQuestion}
                                defaultValue={totalQuestion}
                                required
                                onChange={(event) => setTotalQuestion(Number(event.target.value))}
                                label="No of Questions"
                            >
                                {questions.map((question: number, ind: number) => (
                                    <MenuItem key={ind} value={question}>{question}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={styles.configuration}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel className={styles.color} id="demo-simple-select-outlined-label">Difficulty Level</InputLabel>
                            <Select
                                className={styles.color}
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={difficulty}
                                defaultValue={difficulty}
                                required
                                onChange={(event) => setDifficulty(event.target.value as DIFFICULTY)}
                                label="Difficulty Level"
                            >
                                <MenuItem value={DIFFICULTY.EASY}>Easy</MenuItem>
                                <MenuItem value={DIFFICULTY.MEDIUM}>Medium</MenuItem>
                                <MenuItem value={DIFFICULTY.DIFFICULT}>Hard</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <button className={styles.btn} type='submit'>Start Quiz</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default InputCard;