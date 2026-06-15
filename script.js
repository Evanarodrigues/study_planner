const addSubjectBtn = document.getElementById("addSubjectBtn");
const subjectInput = document.getElementById("subjectInput");
const subjectList = document.getElementById("subjectList");

const subjectSelect = document.getElementById("subjectSelect");

const assignmentInput = document.getElementById("assignmentInput");
const deadlineInput = document.getElementById("deadlineInput");
const addAssignmentBtn = document.getElementById("addAssignmentBtn");
const assignmentList = document.getElementById("assignmentList");

let subjects =
    JSON.parse(localStorage.getItem("subjects")) || [];

let assignments =
    JSON.parse(localStorage.getItem("assignments")) || [];



// CREATE SUBJECT

function createSubject(subjectName) {

    const li = document.createElement("li");

    li.innerHTML = `
        <div class="subject-name">
            ${subjectName}
        </div>

        <progress
            id="progress-${subjectName}"
            value="0"
            max="100">
        </progress>

        <span id="percent-${subjectName}">
            0%
        </span>
    `;

    subjectList.appendChild(li);

    const option = document.createElement("option");

    option.value = subjectName;
    option.textContent = subjectName;

    subjectSelect.appendChild(option);
}



// CREATE ASSIGNMENT

function createAssignment(data) {

    const li = document.createElement("li");

    li.classList.add("assignment-item");

    li.innerHTML = `
        <div>
            <strong>${data.name}</strong>
            <br>
            Subject: ${data.subject}
            <br>
            Deadline: ${data.deadline}
        </div>

        <input
            type="checkbox"
            data-subject="${data.subject}"
            ${data.completed ? "checked" : ""}
        >
    `;

    assignmentList.appendChild(li);

    const checkbox = li.querySelector("input");

    checkbox.addEventListener("change", () => {

        data.completed = checkbox.checked;

        localStorage.setItem(
            "assignments",
            JSON.stringify(assignments)
        );

        updateProgress(data.subject);
    });

    updateProgress(data.subject);
}



// UPDATE PROGRESS

function updateProgress(subject) {

    const assignmentsForSubject =
        document.querySelectorAll(
            `[data-subject="${subject}"]`
        );

    const total =
        assignmentsForSubject.length;

    const completed =
        [...assignmentsForSubject]
            .filter(item => item.checked)
            .length;

    let percentage = 0;

    if (total > 0) {
        percentage =
            Math.round(
                (completed / total) * 100
            );
    }

    const progressBar =
        document.getElementById(
            `progress-${subject}`
        );

    const percentText =
        document.getElementById(
            `percent-${subject}`
        );

    if (progressBar) {
        progressBar.value = percentage;
    }

    if (percentText) {
        percentText.textContent =
            `${percentage}%`;
    }
}



// ADD SUBJECT BUTTON

addSubjectBtn.addEventListener("click", () => {

    const subjectName =
        subjectInput.value.trim();

    if (subjectName === "") {
        alert("Enter a subject!");
        return;
    }

    if (subjects.includes(subjectName)) {
        alert("Subject already exists!");
        return;
    }

    createSubject(subjectName);

    subjects.push(subjectName);

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    subjectInput.value = "";
});



// ADD ASSIGNMENT BUTTON

addAssignmentBtn.addEventListener("click", () => {

    const assignmentName =
        assignmentInput.value.trim();

    const subject =
        subjectSelect.value;

    const deadline =
        deadlineInput.value;

    if (
        assignmentName === "" ||
        subject === "" ||
        deadline === ""
    ) {
        alert("Fill all fields!");
        return;
    }

    const assignmentData = {
        name: assignmentName,
        subject: subject,
        deadline: deadline,
        completed: false
    };

    assignments.push(assignmentData);

    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );

    createAssignment(assignmentData);

    assignmentInput.value = "";
    deadlineInput.value = "";
});



// LOAD SAVED DATA

subjects.forEach(subject => {
    createSubject(subject);
});

assignments.forEach(item => {
    createAssignment(item);
});