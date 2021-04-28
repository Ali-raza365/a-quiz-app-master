import React, { useEffect, useState } from 'react';
import InputCard from './Components/InputCard/inputCard';
import QuestionCard from './Components/QuestionCard/questionCard';
import { QuizDetails } from './Services/quizServices';
import { DIFFICULTY, Question } from './Type/types';
import styles from './App.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
function App() {

  let [quiz, setQuiz] = useState<Question[]>([]);
  let [totalQuestion, setTotalQuestion] = useState<number>(5);
  let [category, setCategory] = useState<any>(9);
  let [difficulty, setDifficulty] = useState<DIFFICULTY>(DIFFICULTY.EASY);
  let [submited, setSubmited] = useState<boolean>(false);
  let [per, setPer] = useState<string>('');
  let [loading, setloading] = useState<boolean>(false);
  let [score, setScore] = useState(0);
  let [step, setStep] = useState(0);
  let [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    setloading(true)
    const data: Question[] = await QuizDetails(totalQuestion, category, difficulty);
    console.log({data})
    if(data !== []){
      setQuiz(data)
    }
    setloading(false)

  }
  const handelSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    const currentQuestion: Question = quiz[step];
    if (userAns === currentQuestion.answer) {
      setScore(++score);
    }
    if (step !== quiz.length - 1) {
      setStep(++step);
    }
    else {
      setShowResult(true);
      let num= (score / quiz.length) * 100
      let nom:string = num.toFixed(2);
      setPer(nom)
    }
  };

  const handleInputSubmit =async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
   await  fetchData()
    setSubmited(true);
  }

  const startAgain =  () => {
    console.log(submited,showResult)
    setShowResult(false)
    setSubmited(false);
    setScore(0)
    setStep(0)

    // window.location.reload();
  }
console.log(quiz,'aap ts')

  if (loading) {
    return (
      <div className={styles.loader}><CircularProgress color="inherit" size={200} /></div>
    )
  }

  if (showResult) {
    return (
      <div className={styles.container} >
        <h1 className={styles.heading}>Quiz App</h1>
        <div className={styles.card}>
          <h1 className={styles.result}>Result</h1> 
          <div className={styles.score}>
            <h2>Total :</h2>
            <h2>{quiz.length}</h2>
          </div>
          <div className={styles.score}>
            <h2>Your Score :</h2>
            <h2>{score}</h2>
          </div>
          <div className={styles.score}>
            <h2>Percentage :</h2>
            <h2>{per}%</h2>
          </div>
          <button className={styles.btn} type='submit' onClick={startAgain}>Start Again</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {submited && quiz.length  ?
        <QuestionCard
          question={quiz[step].question}
          answer={quiz[step].answer}
          option={quiz[step].option}
          totalQuestion={quiz.length}
          currentQuestion={step}
          callback={handelSubmit}
        />
        :
        <InputCard
          category={category}
          setCategory={setCategory}
          totalQuestion={totalQuestion}
          setTotalQuestion={setTotalQuestion}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          callback={handleInputSubmit}
        />}
    </div>
  );
}

export default App;
