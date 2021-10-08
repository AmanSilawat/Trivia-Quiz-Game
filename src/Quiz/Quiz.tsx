import React, { useEffect, useState } from 'react';
import useNetworkCall from '../customHook/useNetworkCall';
import './style.css';

const Quiz: React.FC = () => {
	const {
		state: { status, response },
		networkRequest,
	} = useNetworkCall('https://jservice.io/api/random');

	const [answerStatus, setAnswerStatus] = useState('notAnswered');
	const [input, setInput] = useState('');
	const [isOnetimeSubmit, setIsOnetimeSubmit] = useState(false);

	const isBtnDisable = input === '' || isOnetimeSubmit === true;

	const handler_submit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (response instanceof Object) {
			setIsOnetimeSubmit(true);

			// when answer is correct
			if (input.toLowerCase() === response?.answer.toLowerCase()) {
				setAnswerStatus('rightAnswer');
			} else {
				setAnswerStatus('wrongAnswer');
			}

			// load next question and rest values
			setTimeout(() => {
				setAnswerStatus('notAnswered');
				setInput('');
				setIsOnetimeSubmit(false);
				networkRequest();
			}, 2000);
		}
	};

	useEffect(() => {
		networkRequest();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='box' id='box'>
			{answerStatus === 'rightAnswer' ? (
				<div className='msg msgGreen'>Correct Answer</div>
			) : answerStatus === 'wrongAnswer' ? (
				<div className='msg msgRed'>Wrong Answer</div>
			) : null}
			<h1>Trivia Quiz Game</h1>

			{status === 'FETCHING' ? (
				<div className='loader'>loading...</div>
			) : response instanceof Object ? (
				<div>
					<h2 className='question'>{response?.question}</h2>
					<input
						type='text'
						placeholder='Please, Enter your answer.'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setInput(e.target.value)
						}
					/>
					<button
						id='submitBtn'
						onClick={handler_submit}
						disabled={isBtnDisable}>
						Submit
					</button>
				</div>
			) : null}
		</div>
	);
};

export default Quiz;
