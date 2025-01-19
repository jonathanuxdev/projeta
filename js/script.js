// Função para adicionar uma tarefa a uma etapa
function addTask(phase) {
    // Pega o input da etapa correspondente
    const input = document.getElementById(`${phase}-input`);
    const task = input.value.trim();

    if (task === "") {
        alert("Por favor, insira uma tarefa!");
        return;
    }

    // Cria um novo item da lista (li)
    const li = document.createElement("li");

    // Texto da tarefa
    const taskText = document.createElement("span");
    taskText.textContent = task;

    // Botão de exclusão
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.backgroundColor = "#ff5252";
    deleteButton.style.color = "#fff";
    deleteButton.style.border = "none";
    deleteButton.style.borderRadius = "5px";
    deleteButton.style.cursor = "pointer";

    // Adiciona evento de clique ao botão de exclusão
    deleteButton.onclick = () => {
        li.remove(); // Remove o item da lista
        saveTasks(phase); // Atualiza o LocalStorage
    };

    // Monta o item da lista
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    // Adiciona a tarefa na lista correspondente
    const list = document.getElementById(`${phase}-list`);
    list.appendChild(li);

    // Salva no LocalStorage
    saveTasks(phase);

    // Limpa o campo de input
    input.value = "";
}
// Função para salvar tarefas no LocalStorage
function saveTasks(phase) {
    const list = document.getElementById(`${phase}-list`);
    const tasks = [];

    // Percorre os itens da lista e salva o texto das tarefas
    list.querySelectorAll("li").forEach((li) => {
        tasks.push(li.querySelector("span").textContent);
    });

    // Salva no LocalStorage
    localStorage.setItem(`${phase}-tasks`, JSON.stringify(tasks));
}

// Função para carregar tarefas do LocalStorage
function loadTasks(phase) {
    const tasks = JSON.parse(localStorage.getItem(`${phase}-tasks`)) || [];
    const list = document.getElementById(`${phase}-list`);

    tasks.forEach((task) => {
        const li = document.createElement("li");

        // Texto da tarefa
        const taskText = document.createElement("span");
        taskText.textContent = task;

        // Botão de exclusão
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.style.marginLeft = "10px";
        deleteButton.style.backgroundColor = "#ff5252";
        deleteButton.style.color = "#fff";
        deleteButton.style.border = "none";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.cursor = "pointer";

        // Adiciona evento de clique ao botão de exclusão
        deleteButton.onclick = () => {
            li.remove(); // Remove o item da lista
            saveTasks(phase); // Atualiza o LocalStorage
        };

        // Monta o item da lista
        li.appendChild(taskText);
        li.appendChild(deleteButton);

        // Adiciona na lista
        list.appendChild(li);
    });
}
// Carrega as tarefas de todas as fases ao carregar a página
window.onload = () => {
    loadTasks("discover");
    loadTasks("define");
    loadTasks("develop");
    loadTasks("deliver");
};

