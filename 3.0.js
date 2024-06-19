
let input = document.getElementById('input');
let submit = document.getElementById('submit');
let taskList = document.getElementById('taskList');

// Add task when pressing Enter key
input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        submit.click();
    }
});

// Add task when clicking the submit button
submit.addEventListener('click', () => {
    let task = input.value.trim();

    // Check if the input value is not empty
    if (task === '') {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement('li');

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    checkBox.addEventListener('click', () => {
        if (checkBox.checked) {
            li.style.textDecoration = 'line-through';
            li.style.opacity = '0.5';
        } else {
            li.style.textDecoration = 'none';
            li.style.opacity = '1';
        }
    });

    let btn = document.createElement('button');
    btn.textContent = 'X';
    btn.style.marginLeft = '10px';

    btn.addEventListener('click', () => {
        taskList.removeChild(li);
    });




    li.appendChild(checkBox);
    li.appendChild(document.createTextNode(task));
    li.appendChild(edit);
    li.appendChild(btn);

    taskList.appendChild(li);

    // Clear the input field after adding the task
    input.value = '';
});



let body = document.querySelector('body');
let togle = document.querySelector('.btn');
let icon = document.querySelector('.icon');
let img = document.querySelector('img');

btn.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        icon.style.left = '-2%';
        img.src = '/icons8-moon-50.png';
    } else {
        body.classList.add('dark');
        icon.style.left = '50%';
        img.src = '/icons8-sun-50.png';
    }
});

