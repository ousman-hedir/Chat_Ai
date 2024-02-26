import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");
let loadInterval;

// dot loading
function loader(element) {
	element.textContent = "";
	loadInterval = setInterval(() => {
		element.textContent += ".";
		if (element.textContent === "....") {
			element.textContent = "";
		}
	}, 300);
}

// answer writing
function typeText(element, text) {
	let index = 0;
	let interval = setInterval(() => {
		if (index < text.length) {
			element.innerHTML += text.charAt(index);
			index++;
		} else {
			clearInterval(interval);
		}
	}, 20);
}

// mapping all questions
function generateUniqueId() {
	const timeStamp = Date.now();
	const randomNumber = Math.random();
	const hexaDecimalString = randomNumber.toString(16);
	return `id-${timeStamp}-${hexaDecimalString}`;
}

// identify ask and answer
function chatStrip(isAi, value, uniqueId) {
	return React.createElement(
		"div",
		{ className: `wrapper ${isAi ? "ai" : ""}` },
		React.createElement(
			"div",
			{ className: "chat" },
			React.createElement(
				"div",
				{ className: "profile" },
				React.createElement("img", {
					src: isAi ? bot : user,
					alt: isAi ? "bot" : "user",
				})
			),
			React.createElement("div", { className: "message", id: uniqueId }, value)
		)
	);
}

// answer summit
const handleSummit = (e) => {
	e.preventDefault();
	const data = new FormData(form);
	// user's chatstrip
	chatContainer.innerHTML += chatStrip(false, data.get("prompt"));
	form.reset();
	// bot's chatStrip
	const uniqId = generateUniqueId();
	chatContainer.innerHTML += chatStrip(true, " ", uniqId);
	chatContainer.scrollTop = chatContainer.scrollHeight;
	const messageDiv = document.getElementById(uniqId);
	loader(messageDiv);
};

form.addEventListener("submit", handleSummit);
form.addEventListener("keyup", (e) => {
	if (e.keyCode === 13) {
		handleSummit(e);
	}
});


form.addEventListener("submit", handleSummit);
form.addEventListener("keyup", (e) => {
	if (e.keyCode === 13) {
		handleSummit(e);
	}
});
