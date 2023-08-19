import React from "react";
import "./index.scss";

const questions = [
	{
		title: "Мое отчество?",
		variants: ["Анатольевна", "Анатольевич", "Анатолий"],
		correct: 1,
	},
	{
		title: "Откуда я родом?",
		variants: ["США", "Россия", "Китай", "Доминиканы"],
		correct: 0,
	},
	{
		title: "Какой у меня размер ноги?",
		variants: ["Большой", "Маленький", "Хуй через плечо"],
		correct: 2,
	},
	{
		title: "Keep calm and ...",
		variants: [
			"stay positive.",
			"realize your dreams.",
			"love real madrid.",
			"love cocks.",
		],
		correct: 2,
	},
	{
		title: "When dogs bark...",
		variants: [
			"the lion stays still.",
			"I am gay.",
			"очкошник за стеной только.",
		],
		correct: 0,
	},
	{
		title: "Я левша или правша?",
		variants: ["Большой", "Маленький", "Правша", "Левша"],
		correct: 2,
	},
	{
		title: "Какой вуз я окончил",
		variants: ["Хогвартс", "РЛИ", "Кэмбридж", "СПБГУ"],
		correct: 3,
	},
	{
		title: "Я ...",
		variants: ["STRAIGHT MAN", "fUCKING GAY", "ВОЛК", "WALK"],
		correct: 2,
	},
	{
		title: "Любимый вид спорта",
		variants: ["Футбол", "Гачи Мучи", "Борьба", "Хоббихорсинг"],
		correct: 0,
	},
	{
		title: "Ладно.",
		variants: ["Ладно.", "Жак Фреско.", "че сказать то блять?"],
		correct: 1,
	},
];

function Result({ correct }) {
	return (
		<div className="result">
			<img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
			<h2>
				Ваш результат {correct}/{questions.length}
			</h2>
			<a href="/">
				<button>Попробовать снова</button>
			</a>
		</div>
	);
}

function Game({ step, question, onClickVariant, onClickNext, varClass }) {
	const percentage = Math.round((step / questions.length) * 100);

	return (
		<>
			<div className="progress">
				<div
					style={{ width: `${percentage}%` }}
					className="progress__inner"
				></div>
			</div>
			<h1>{question.title}</h1>
			<ul>
				{question.variants.map((text, index) => (
					<li
						className={"var"}
						onClick={(event) => onClickVariant(event, index)}
						key={text}
					>
						{text}
					</li>
				))}
			</ul>
			<div className="next">
				<button onClick={() => onClickNext()}>Next</button>
			</div>
		</>
	);
}

function App() {
	const [step, setStep] = React.useState(0);
	const [correct, setCorrect] = React.useState(0);
	const question = questions[step];
	const [varClass, setVarClass] = React.useState("");

	const onClickVariant = (event, index) => {
		if (index == question.correct) {
			event.currentTarget.classList.add("correct");
			setCorrect(correct + 1);
		} else {
			event.currentTarget.classList.add("wrong");
		}

		let btn = document.querySelectorAll(".var");

		console.log(btn);

		for (let i = 0; i < btn.length; i++) {
			btn[i].style.pointerEvents = "none"; //off click
		}
	};

	const onClickNext = () => {
		setStep(step + 1);
		setVarClass("");
	};

	return (
		<div className="App">
			{step != questions.length ? (
				<Game
					step={step}
					question={question}
					onClickVariant={onClickVariant}
					onClickNext={onClickNext}
					varClass={varClass}
				/>
			) : (
				<Result correct={correct} />
			)}
		</div>
	);
}

export default App;
