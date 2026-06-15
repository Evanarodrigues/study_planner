const addSubjectBtn = document.getElementById("addSubjectBtn");
const subjectInput = document.getElementById("subjectInput");
const subjectList = document.getElementById("subjectList");

addSubjectBtn.addEventListener("click", () => {

    const subjectName = subjectInput.value.trim();

    if (subjectName === "") {
        alert("Enter a subject!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = subjectName;

    subjectList.appendChild(li);

    subjectInput.value = "";
});