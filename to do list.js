var ul = document.getElementById("list-container");
        var input = document.getElementById("input");
        var searchInput = document.getElementById("search");

        window.onload = function() {
            var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.forEach(task => {
                addTaskToList(task.text, task.completed);
            });
        };

        function add() {
            if (input.value.trim() === "") return;
            var taskText = input.value;

            addTaskToList(taskText, false);

            saveTaskToLocalStorage(taskText, false);

            input.value = "";
        }

        function addTaskToList(text, completed) {
            var listitem = document.createElement("li");
            listitem.className = completed ? "completed" : "";
            listitem.innerHTML = `
                <span>${text}</span>
                <div>
                    <input type="checkbox" onchange="toggleComplete(this)" ${completed ? 'checked' : ''}>
                    <button onclick='editTask(this)'>Edit</button>
                    <button onclick='deleteitem(event)'>Delete</button>
                </div>
            `;
            ul.append(listitem);
        }

        function toggleComplete(checkbox) {
            var listItem = checkbox.parentElement.parentElement;
            listItem.classList.toggle("completed");
            updateLocalStorage();
        }

        function editTask(button) {
            var listItem = button.parentElement.parentElement;
            var taskText = listItem.querySelector("span").innerText;
            var newTaskText = prompt("Edit your task:", taskText);
            if (newTaskText) {
                listItem.querySelector("span").innerText = newTaskText;
                updateLocalStorage();
            }
        }

        function deleteitem(event) {
            event.target.parentElement.parentElement.remove();
            updateLocalStorage();
        }

        function clearAll() {
            ul.innerHTML = ""; 
            localStorage.removeItem("tasks"); 
        }

        function saveTaskToLocalStorage(text, completed) {
            var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push({ text: text, completed: completed });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        function updateLocalStorage() {
            var tasks = [];
            var items = ul.getElementsByTagName("li");
            for (var i = 0; i < items.length; i++) {
                var taskText = items[i].querySelector("span").innerText;
                var taskCompleted = items[i].classList.contains("completed");
                tasks.push({ text: taskText, completed: taskCompleted });
            }
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        function searchTasks() {
            var filter = searchInput.value.toLowerCase();
            var items = ul.getElementsByTagName("li");
            for (var i = 0; i < items.length; i++) {
                var taskText = items[i].querySelector("span").innerText.toLowerCase();
                items[i].style.display = taskText.includes(filter) ? "" : "none";
            }
        }

        function toggleDarkMode() {
            document.body.classList.toggle("dark-mode");
            var section = document.querySelector("section");
            section.classList.toggle("dark-mode");
        }
