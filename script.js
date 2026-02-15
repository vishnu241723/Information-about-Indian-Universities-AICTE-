class HashTable {
    constructor(size) {
        this.tableSize = size;
        this.table = Array.from({ length: size }, () => []);
    }

    hash(key) {
        return key % this.tableSize;
    }

    insert(key, rank, universityName, location, courseCount, courses) {
        const index = this.hash(key);
        if (this.find(key)) {
            return "Error: Key already exists.";
        }
        this.table[index].push({ key, rank, universityName, location, courseCount, courses });
        return "Success: University data inserted.";
    }

    find(key) {
        const index = this.hash(key);
        return this.table[index].find(item => item.key === key);
    }

    delete(key) {
        const index = this.hash(key);
        const bucket = this.table[index];
        const itemIndex = bucket.findIndex(item => item.key === key);

        if (itemIndex === -1) {
            return "Error: Key not found.";
        }

        bucket.splice(itemIndex, 1);
        return "Success: Element deleted.";
    }

    display() {
        return this.table.flat();
    }
}

const hashTable = new HashTable(10);

const operationForm = document.getElementById("operationForm");
const resultDiv = document.getElementById("result");
const hashTableBody = document.querySelector("#hashTable tbody");

operationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const operation = document.getElementById("operation").value;
    const key = parseInt(document.getElementById("key").value);
    const rank = parseInt(document.getElementById("rank").value);
    const universityName = document.getElementById("university_name").value;
    const location = document.getElementById("location").value;
    const courseCount = parseInt(document.getElementById("course_count").value);
    const courses = document.getElementById("courses").value;

    let message;

    if (operation === "INSERT") {
        message = hashTable.insert(key, rank, universityName, location, courseCount, courses);
    }
    else if (operation === "DELETE") {
        message = hashTable.delete(key);
    }
    else if (operation === "DISPLAY") {
        updateTable(hashTable.display());
        message = "Displaying all university data.";
    }
    else if (operation === "FIND") {
        const item = hashTable.find(key);
        if (item) {
            message = `Found: Key=${item.key}, Rank=${item.rank}, University=${item.universityName}, Location=${item.location}`;
        } else {
            message = "Error: Key not found.";
        }
    }

    resultDiv.textContent = message;
    resultDiv.className = message.startsWith("Error") ? "notification error" : "notification success";
    resultDiv.style.display = "block";
});

function updateTable(data) {
    hashTableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.key}</td>
            <td>${item.rank}</td>
            <td>${item.universityName}</td>
            <td>${item.location}</td>
            <td>${item.courseCount}</td>
            <td>${item.courses}</td>
        `;
        hashTableBody.appendChild(row);
    });
}
