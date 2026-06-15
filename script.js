const addSubjectBtn = document.getElementById("addSubjectBtn");
const subjectInput = document.getElementById("subjectInput");
const subjectList = document.getElementById("subjectList");

const subjectSelect = document.getElementById("subjectSelect");

const assignmentInput =
document.getElementById("assignmentInput");

const deadlineInput =
document.getElementById("deadlineInput");

const addAssignmentBtn =
document.getElementById("addAssignmentBtn");

const assignmentList =
document.getElementById("assignmentList");

addSubjectBtn.addEventListener("click", () => {

    const subjectName = subjectInput.value.trim();

    if (subjectName === "") {
        alert("Enter a subject!");
        return;
    }

    const li = document.createElement("li");
li.textContent = subjectName;

subjectList.appendChild(li);

const option = document.createElement("option");
option.value = subjectName;
option.textContent = subjectName;

subjectSelect.appendChild(option);

    subjectInput.value = "";
});


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

    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${assignmentName}</strong>
        <br>
        Subject: ${subject}
        <br>
        Deadline: ${deadline}
        <input type="checkbox">
    `;

    assignmentList.appendChild(li);

    assignmentInput.value = "";
    deadlineInput.value = "";
});