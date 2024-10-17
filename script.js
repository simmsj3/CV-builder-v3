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

let completedQuests = [];
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
            completeQuest(year, index);
        });
    });
}

function completeQuest(year, index) {
    const quest = quests[year][index];
    if (!completedQuests.some(q => q.title === quest.title)) {
        completedQuests.push(quest);
        updateProgress();
        updateCVItems();
    }
}

function updateProgress() {
    skillTrees.forEach(skill => {
        const completedCount = completedQuests.filter(q => q.skillTree === skill).length;
        const totalCount = Object.values(quests).flat().filter(q => q.skillTree === skill).length;
        const percentage = (completedCount / totalCount) * 100;
        document.querySelector(`.skill-tree:has(h3:contains('${skill}')) .progress`).style.width = `${percentage}%`;
    });
}

function updateCVItems() {
    const cvItemsList = document.querySelector('#cv-items ul');
    cvItemsList.innerHTML = '';
    completedQuests.forEach(quest => {
        const li = document.createElement('li');
        li.textContent = `${quest.title} (${quest.type})`;
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

    // Initialize with Year 1 quests
    displayQuests('year1');
});

// Local Storage functions
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

// Call loadProgress when the page loads
document.addEventListener('DOMContentLoaded', loadProgress);

// Save progress whenever a quest is completed
function completeQuest(year, index) {
    const quest = quests[year][index];
    if (!completedQuests.some(q => q.title === quest.title)) {
        completedQuests.push(quest);
        updateProgress();
        updateCVItems();
        saveProgress(); // Save to local storage
    }
}
