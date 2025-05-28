
let input = document.getElementById('input');
let submit = document.getElementById('submit');
let taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(taskObj => createTask(taskObj.text, taskObj.completed, taskObj.rank || 'E'));
});

window.addEventListener('click', function (e) {
  const modal = document.getElementById('rankModal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});


// Add task when pressing Enter key
input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    submit.click();
  }
});

// Create and add a task item to the list
function createTask(taskText, completed, rank = 'E') {
  let li = document.createElement('li');

  let checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked = completed; 

  if (completed) {
    li.style.textDecoration = 'line-through';
    li.style.opacity = '0.5';
  }

  checkBox.addEventListener('click', () => {
    li.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
    li.style.opacity = checkBox.checked ? '0.5' : '1';
    saveTasks();
  });

  function getRankColor(rank) {
    switch (rank) {
      case 'E': return '#9e9e9e'; // Grey
      case 'D': return '#4caf50'; // Green
      case 'C': return '#2196f3'; // Blue
      case 'B': return '#ff9800'; // Orange
      case 'A': return '#f44336'; // Red
      case 'S': return '#9c27b0'; // Purple
      default: return '#ffffff';  // White fallback
    }
  }

  let rankTag = document.createElement('span');
  rankTag.textContent = `${rank}-Rank`;  // Removed square brackets
  rankTag.classList.add('rank-tag');
  rankTag.style.color = getRankColor(rank);


  let btn = document.createElement('button');
  btn.textContent = 'X';
  btn.style.marginLeft = '10px';
  btn.style.background = 'transparent';
  btn.style.color = 'red';

  btn.addEventListener('click', () => {
    taskList.removeChild(li);
    saveTasks();
  });

  li.appendChild(checkBox);
  li.appendChild(rankTag);
  li.appendChild(document.createTextNode(taskText));
  li.appendChild(btn);

  taskList.appendChild(li);
}

// Save all tasks to localStorage
function saveTasks() {
  let tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    let text = li.childNodes[2].nodeValue.trim();
    let completed = li.querySelector('input').checked;
    let rank = li.querySelector('span').textContent.split('-')[0]; // Updated rank parsing
    tasks.push({ text, completed, rank });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


let currentTaskInput = '';

submit.addEventListener('click', () => {
  let task = input.value.trim();
  if (task === '') {
    alert("Please enter a task");
    return;
  }
  currentTaskInput = task;
  document.getElementById('taskPreview').textContent = `"${task}"`;
  document.getElementById('rankModal').style.display = 'block';
});

document.querySelectorAll('.rankBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    let selectedRank = btn.getAttribute('data-rank');
    document.getElementById('rankModal').style.display = 'none';
    createTask(currentTaskInput, false, selectedRank); // ← pass rank
    saveTasks();
    input.value = '';
  });
});
