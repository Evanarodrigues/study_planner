const addSubjectBtn = document.getElementById("addSubjectBtn");
const subjectInput = document.getElementById("subjectInput");
const subjectList = document.getElementById("subjectList");

const subjectSelect = document.getElementById("subjectSelect");
const assignmentInput = document.getElementById("assignmentInput");
const deadlineInput = document.getElementById("deadlineInput");
const addAssignmentBtn = document.getElementById("addAssignmentBtn");
const assignmentList = document.getElementById("assignmentList");


// Add Subject
addSubjectBtn.addEventListener("click", () => {

    const subjectName = subjectInput.value.trim();

    if (subjectName === "") {
        alert("Enter a subject!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <div class="subject-name">${subjectName}</div>

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

    subjectInput.value = "";
});


// Add Assignment
addAssignmentBtn.addEventListener("click", () => {

    const assignmentName = assignmentInput.value.trim();
    const subject = subjectSelect.value;
    const deadline = deadlineInput.value;

    if (
        assignmentName === "" ||
        subject === "" ||
        deadline === ""
    ) {
        alert("Fill all fields!");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("assignment-item");

    li.innerHTML = `
        <div>
            <strong>${assignmentName}</strong>
            <br>
            Subject: ${subject}
            <br>
            Deadline: ${deadline}
        </div>

        <input
            type="checkbox"
            data-subject="${subject}">
    `;

    assignmentList.appendChild(li);

    const checkbox = li.querySelector("input");

    checkbox.addEventListener("change", () => {
        updateProgress(subject);
    });

    assignmentInput.value = "";
    deadlineInput.value = "";
});


// Update Progress Bar
function updateProgress(subject) {

    const assignments = document.querySelectorAll(
        `input[data-subject="${subject}"]`
    );

    const total = assignments.length;

    const completed = [...assignments].filter(
        checkbox => checkbox.checked
    ).length;

    let percentage = 0;

    if (total > 0) {
        percentage = Math.round(
            (completed / total) * 100
        );
    }

    document.getElementById(
        `progress-${subject}`
    ).value = percentage;

    document.getElementById(
        `percent-${subject}`
    ).textContent = `${percentage}%`;
}