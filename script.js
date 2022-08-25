const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0; //se "inputElement.value.trim.length > 0" vc retorna true, senao retorna false ,

const handleAddTask = () => {
	const inputIsValid = validateInput();

	if (!inputIsValid) {
		return inputElement.classList.add("error");
	}
	// aqui criamos a div para fazer a lista
	const taskItemContainer = document.createElement("div");
	taskItemContainer.classList.add("task-item");

	// agora fizemos o parágrafo dentro da div
	const taskContent = document.createElement("p");
	taskContent.innerText = inputElement.value;

	//ativando  a função para marcar a task como Done
	taskContent.addEventListener("click", () => handleClick(taskContent));

	// Aqui é o Icone
	const deleteItem = document.createElement("i");
	deleteItem.classList.add("far");
	deleteItem.classList.add("fa-trash-alt");

	// criando a função para o icone da lixeira excluir
	deleteItem.addEventListener("click", () =>
		HandleDeleteClick(taskItemContainer, taskContent)
	);

	// criando os filhos
	taskItemContainer.appendChild(taskContent);
	taskItemContainer.appendChild(deleteItem);
	tasksContainer.appendChild(taskItemContainer);

	inputElement.value = "";

	updateLocalStorage();
};

const handleClick = (taskContent) => {
	const tasks = tasksContainer.childNodes;

	for (const task of tasks) {
		const currentTaskIsBeingClicked =
			task.firstChild.isSameNode(taskContent);
		//leia-se: "para cada task da lista de tasks"
		if (currentTaskIsBeingClicked) {
			task.firstChild.classList.toggle("completed"); // se "task" já tiver a classe "completed", ele vai tirar, senão ele vai colocar, porisso toggle"
		}
	}
	updateLocalStorage();
};

const HandleDeleteClick = (taskItemContainer, taskContent) => {
	const tasks = tasksContainer.childNodes;

	for (const task of tasks) {
		const currentTaskIsBeingClicked =
			task.firstChild.isSameNode(taskContent);
		if (currentTaskIsBeingClicked) {
			taskItemContainer.remove();
		}
	}
	updateLocalStorage();
};

const handleInputChange = () => {
	const inputIsValid = validateInput();

	if (inputIsValid) {
		return inputElement.classList.remove("error");
	}
};

const updateLocalStorage = () => {
	const tasks = tasksContainer.childNodes;

	const localStorageTasks = [...tasks].map((task) => {
		//esse aq é o JSON
		const content = task.firstChild; // esse task.firstChild é o <p>
		const isCompleted = content.classList.contains("completed"); // se contem completed

		return { description: content.innerText, isCompleted };
	});
	// console.log({ localStorageTasks }) até aqui funcionou
	// agora precisamos armazenar no local storage

	localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
	// deu certo, elas ficaram salvas no Local Storage
};

const refreshTaskUsingLocalStorage = () => {
	const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
	// console.log({ tasksFromLocalStorage }) até aqui funcionou

	if(!tasksFromLocalStorage) return;

	for (const task of tasksFromLocalStorage) {
		const taskItemContainer = document.createElement("div");
		taskItemContainer.classList.add("task-item");

		const taskContent = document.createElement("p");
		taskContent.innerText = task.description;

		if (task.isCompleted) {
			taskContent.classList.add("completed");
		}

		taskContent.addEventListener("click", () => handleClick(taskContent));

		const deleteItem = document.createElement("i");
		deleteItem.classList.add("far");
		deleteItem.classList.add("fa-trash-alt");

		deleteItem.addEventListener("click", () =>
			HandleDeleteClick(taskItemContainer, taskContent)
		);

		// criando os filhos
		taskItemContainer.appendChild(taskContent);
		taskItemContainer.appendChild(deleteItem);
		tasksContainer.appendChild(taskItemContainer);
	}
};

refreshTaskUsingLocalStorage();
addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());
