const quests = {
    year1: [
        {
            title: "Join BioSoc",
            type: "Extracurricular Activities",
            description: "Become a member of the Biochemistry Society to network with peers and attend field-related events.",
            skillTree: "Networking & Communication"
        },
        {
            title: "Attend a Departmental Seminar",
            type: "Academic Engagement",
            description: "Participate in a seminar to broaden your knowledge and stay updated with current research.",
            skillTree: "Academic Excellence"
        },
        {
            title: "Volunteer for a Community Project",
            type: "Volunteering",
            description: "Engage in a local community project to develop soft skills and demonstrate social responsibility.",
            skillTree: "Leadership & Teamwork"
        },
        {
            title: "Set Up LinkedIn Profile",
            type: "Professional Development",
            description: "Create a professional LinkedIn profile to start building your online presence.",
            skillTree: "Networking & Communication"
        },
        {
            title: "Attend CV Writing Workshop",
            type: "Professional Development",
            description: "Learn how to craft an effective CV tailored to the biochemistry field.",
            skillTree: "Professional Skills"
        }
    ],
    year2: [
        {
            title: "Meet with Placement Coordinator",
            type: "Professional Development",
            description: "Have a 1-to-1 meeting with the Placement Coordinator to discuss your career goals.",
            skillTree: "Professional Skills"
        },
        {
            title: "Attend All Placement Workshops",
            type: "Professional Development",
            description: "Participate in all scheduled Placement Workshops to prepare for your placement year.",
            skillTree: "Professional Skills"
        },
        {
            title: "Attend The Big Careers Fair",
            type: "Networking",
            description: "Attend the careers fair and speak to at least 3 employers about opportunities.",
            skillTree: "Networking & Communication"
        }
    ]
};

const skillTrees = [
    "Academic Excellence",
    "Professional Skills",
    "Leadership & Teamwork",
    "Technical Proficiency",
    "Networking & Communication"
];

// ... (Keep the existing quests and skillTrees definitions from Part 1)

let completedQuests = [];

const translationalSkills = [
    "Communication",
    "Teamwork",
    "Problem-solving",
    "Time management",
    "Leadership",
    "Adaptability",
    "Critical thinking",
    "Technical proficiency",
    "Creativity",
    "Ethical awareness"
];

function displayQuests(year) {
    const questsSection = document.getElementById('quests');
    questsSection.innerHTML = '';
    quests[year].forEach((quest, index) => {
        const questElement = document.createElement('div');
        questElement.classList.add('quest');
        questElement.innerHTML = `
            <h3>${quest.title}</h3>
            <p class="quest-type">${quest.type}</p>
            <p>${quest.description}</p>
            <button class="complete-btn" data-year="${year}" data-index="${index}">Complete Quest</button>
        `;
        questsSection.appendChild(questElement);
    });
    addQuestListeners();
}

function addQuestListeners() {
    const completeButtons = document.querySelectorAll('.complete-btn');
    completeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const year = e.target.getAttribute('data-year');
            const index = e.target.getAttribute('data-index');
            showCompletionForm(year, index);
        });
    });
}

function showCompletionForm(year, index) {
    const quest = quests[year][index];
    const formHTML = `
        <div id="completion-form" class="modal">
            <h3>Complete Quest: ${quest.title}</h3>
            <label for="completion-date">Date Completed:</label>
            <input type="date" id="completion-date" required>
            <label for="completion-notes">Notes:</label>
            <textarea id="completion-notes" rows="3"></textarea>
            <h4>Translational Skills Demonstrated:</h4>
            <div id="skills-checkboxes">
                ${translationalSkills.map(skill => `
                    <div>
                        <input type="checkbox" id="${skill}" name="skills" value="${skill}">
                        <label for="${skill}">${skill}</label>
                    </div>
                `).join('')}
            </div>
            <button id="submit-completion">Submit</button>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    modalContainer.innerHTML = formHTML;
    document.body.appendChild(modalContainer);

    document.getElementById('submit-completion').addEventListener('click', () => {
        const completionDate = document.getElementById('completion-date').value;
        const completionNotes = document.getElementById('completion-notes').value;
        const selectedSkills = Array.from(document.querySelectorAll('#skills-checkboxes input:checked')).map(el => el.value);
        
        if (!completionDate) {
            alert('Please enter the completion date.');
            return;
        }

        completeQuest(year, index, completionDate, completionNotes, selectedSkills);
        document.body.removeChild(modalContainer);
    });
}

function completeQuest(year, index, completionDate, completionNotes, selectedSkills) {
    const quest = quests[year][index];
    if (!completedQuests.some(q => q.title === quest.title)) {
        completedQuests.push({
            ...quest,
            completionDate,
            completionNotes,
            selectedSkills
        });
        updateProgress();
        updateCVItems();
        saveProgress();
    }
}

function updateProgress() {
    skillTrees.forEach(skill => {
        const completedCount = completedQuests.filter(q => q.skillTree === skill).length;
        const totalCount = Object.values(quests).flat().filter(q => q.skillTree === skill).length;
        const percentage = (completedCount / totalCount) * 100;
        const progressBar = document.querySelector(`.skill-tree h3:contains('${skill}') + .progress-bar .progress`);
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    });
}

function updateCVItems() {
    const cvItemsList = document.querySelector('#cv-items ul');
    cvItemsList.innerHTML = '';
    completedQuests.forEach(quest => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${quest.title}</strong> (${quest.type})<br>
            Completed on: ${quest.completionDate}<br>
            Notes: ${quest.completionNotes}<br>
            Skills demonstrated: ${quest.selectedSkills.join(', ')}
        `;
        cvItemsList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const yearButtons = document.querySelectorAll('nav button');
    yearButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const year = e.target.id;
            if (year === 'progress') {
                document.getElementById('quests').classList.add('hidden');
                document.getElementById('progress-section').classList.remove('hidden');
            } else {
                document.getElementById('quests').classList.remove('hidden');
                document.getElementById('progress-section').classList.add('hidden');
                displayQuests(year);
            }
        });
    });

    displayQuests('year1');
    loadProgress();
});

function saveProgress() {
    localStorage.setItem('completedQuests', JSON.stringify(completedQuests));
}

function loadProgress() {
    const savedQuests = localStorage.getItem('completedQuests');
    if (savedQuests) {
        completedQuests = JSON.parse(savedQuests);
        updateProgress();
        updateCVItems();
    }
}
