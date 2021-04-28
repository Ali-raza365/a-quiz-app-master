import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { QuestionCardType } from '../../Type/types';
import styles from './questionCard.module.css';

const QuestionCard: React.FC<QuestionCardType> = ({ question, answer, option, totalQuestion, currentQuestion, callback }) => {

    const [selectedAns, setSelectedAns] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAns(e.target.value)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Quiz App</h1>
            <div className={styles.card}>
                <div className={styles.questionNo}>Question: {++currentQuestion} / {totalQuestion}</div>
                <div className={styles.question}>Q: {question}</div>
                <form className={styles.options} action='' onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="option" name="option" value={selectedAns} onChange={handleChange}>
                            {option.map((opt: string, ind: number) => {
                                return (
                                    <div key={ind}>
                                        <FormControlLabel value={opt} control={<Radio required={true} />} label={opt} />
                                    </div>
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                    <button className={styles.btn} type='submit'>Next Question</button>
                </form>
            </div>
        </div>
    )
}

export default QuestionCard;