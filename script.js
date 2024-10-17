const quests = {
    year1: [
        {
            title: "Volunteering",
            type: "Work Experience",
            description: "Get involved in a community project, charity or organisation.",
            skillTree: "Leadership & Teamwork",
            reason: "Volunteering shows commitment to your community and your field. It can provide hands-on experience in scientific or healthcare settings.",
            url: "https://www.aston.ac.uk/careers/get-experience/part-time-jobs-and-volunteering",
            year: 1
        },
        {
            title: "Join Aston's BioSoc, Biochemical Society or other relevant societies",
            type: "Extracurricular Activities",
            description: "Join Aston's BioSoc, Biochemical Society or other relevant societies",
            skillTree: "Networking & Communication",
            reason: "Engaging in academic activities beyond coursework shows genuine interest in your field and a proactive approach to learning.",
            links: [
                { name: "Aston Clubs and Societies", url: "https://www.astonsu.com/activities/clubsandsocieties/" },
                { name: "Biochemical Society", url: "https://www.biochemistry.org/" }
            ],
            year: 1
        },
        {
            title: "Attend events, workshops, or external talks",
            type: "Professional Development",
            description: "Participate in networking events, seminars, or inaugural professorial talks.",
            skillTree: "Academic Excellence",
            reason: "These activities help you present yourself more effectively to potential employers and show continuous learning outside the classroom.",
            url: "https://www.aston.ac.uk/careers/find-a-job/researching-employers",
            year: 1
        }
    ],
    year2: [
        {
            title: "Meet with Placement Coordinator",
            type: "Professional Development",
            description: "Have a 1-to-1 meeting with the Placement Coordinator to discuss your career goals.",
            skillTree: "Professional Skills",
            reason: "This meeting helps you understand the placement process and align your career goals with potential opportunities.",
            url: "https://www.aston.ac.uk/careers/contact-us",
            year: 2
        },
        {
            title: "Attend All Placement Workshops",
            type: "Professional Development",
            description: "Participate in all scheduled Placement Workshops to prepare for your placement year.",
            skillTree: "Professional Skills",
            reason: "These workshops provide essential information and skills for securing and succeeding in your placement.",
            url: "https://www.aston.ac.uk/careers/placements",
            year: 2
        },
        {
            title: "Attend The Big Careers Fair",
            type: "Networking",
            description: "Attend the careers fair and speak to at least 3 employers about opportunities. Take a selfie in front of their stands for extra points!",
            skillTree: "Networking & Communication",
            reason: "Career fairs provide opportunities to learn about different industries and make connections with potential employers.",
            url: "https://www.aston.ac.uk/careers/find-a-job/researching-employers",
            year: 2
        }
    ],
    year4: [
        {
            title: "Apply for Graduate Programmes",
            type: "Professional Development",
            description: "Research and apply for at least 3 graduate programmes (e.g., STP).",
            skillTree: "Professional Skills",
            reason: "Applying for graduate programmes helps you transition from university to professional life.",
            url: "https://www.aston.ac.uk/careers/find-a-job/researching-employers",
            year: 4
        },
        {
            title: "Meet with Careers Consultant",
            type: "Professional Development",
            description: "Schedule and attend a meeting with a Careers Consultant to discuss post-graduation plans.",
            skillTree: "Professional Skills",
            reason: "Career consultants can provide valuable guidance on your career path and job search strategies.",
            url: "https://www.aston.ac.uk/careers/contact-us",
            year: 4
        },
        {
            title: "Connect with Alumni",
            type: "Networking",
            description: "Connect with Alumni on LinkedIn and people who work at companies you're interested in.",
            skillTree: "Networking & Communication",
            reason: "Alumni connections can provide insights into different career paths and potential job opportunities.",
            url: "https://www.aston.ac.uk/careers/cv/cvs-and-cover-letters",
            year: 4
        }
    ],
    anytime: [
        {
            title: "Develop your skills",
            type: "Skills Development",
            description: "Focus on developing and polishing skills that employers look for.",
            skillTree: "Technical Proficiency",
            reason: "Developing transferable skills makes you more versatile and valuable to potential employers.",
            links: [
                { name: "Careers and Placements", url: "https://www.aston.ac.uk/careers/cv/resource-library"},
                { name: "Skills need improving", url: "https://www.aston.ac.uk/current-students/support-services/disability-support/resources"},
                { name: "Polishing overall skills", url: "https://www.aston.ac.uk/current-students/learning-development-centre/academic-writing-and-study-support"}
            ],
            year: "anytime"
        },
        {
            title: "Set up a LinkedIn profile",
            type: "Professional Development",
            description: "Create a professional LinkedIn profile to start building your online presence.",
            skillTree: "Networking & Communication",
            reason: "A strong professional online presence showcases your seriousness about your career. LinkedIn allows you to connect with professionals, alumni, and potential employers.",
            url: "https://www.aston.ac.uk/careers/cv/cvs-and-cover-letters",
            year: "anytime"
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
    console.log("Displaying quests for year:", year);
    
    const questsSection = document.getElementById('quests');
    questsSection.innerHTML = '';
    
    // Display year-specific quests
    const yearQuests = quests[year].filter(quest => quest.year === parseInt(year.slice(-1)));
    if (yearQuests.length > 0) {
        const yearHeader = document.createElement('h2');
        yearHeader.textContent = `Year ${year.slice(-1)} Quests`;
        questsSection.appendChild(yearHeader);
        
        yearQuests.forEach(quest => displayQuest(quest, questsSection));
    }
    
    // Display divider
    const divider = document.createElement('hr');
    questsSection.appendChild(divider);
    
    // Display anytime quests
    const anytimeHeader = document.createElement('h2');
    anytimeHeader.textContent = 'Quests You Can Do Anytime';
    questsSection.appendChild(anytimeHeader);
    
    quests.anytime.forEach(quest => displayQuest(quest, questsSection));
    
    // Display uncompleted quests from previous years (if applicable)
    if (year !== 'year1') {
        const prevYearHeader = document.createElement('h2');
        prevYearHeader.textContent = 'Uncompleted Quests from Previous Years';
        questsSection.appendChild(prevYearHeader);
        
        const currentYearNum = parseInt(year.slice(-1));
        for (let i = 1; i < currentYearNum; i++) {
            quests[`year${i}`].forEach(quest => {
                if (!isQuestCompleted(quest)) {
                    displayQuest(quest, questsSection);
                }
            });
        }
    }
    
    addQuestListeners();
}

function isQuestCompleted(quest) {
    return completedQuests.some(q => q.title === quest.title);
}

function displayQuest(quest, container) {
    const questElement = document.createElement('div');
    questElement.classList.add('quest');
    
    let linksHTML = '';
    if (quest.links && quest.links.length > 0) {
        linksHTML = '<p><strong>Useful Links:</strong></p><ul>' +
            quest.links.map(link => `<li><a href="${link.url}" target="_blank">${link.name}</a></li>`).join('') +
            '</ul>';
    } else if (quest.url) {
        linksHTML = `<p><a href="${quest.url}" target="_blank">Learn more</a></p>`;
    }

    questElement.innerHTML = `
        <h3>${quest.title}</h3>
        <p class="quest-type">${quest.type}</p>
        <p>${quest.description}</p>
        <p><strong>Why it's important:</strong> ${quest.reason}</p>
        ${linksHTML}
        <button class="complete-btn" data-year="${quest.year}" data-index="${quest.title}">Complete Quest</button>
    `;
    container.appendChild(questElement);
}

function addQuestListeners() {
    const completeButtons = document.querySelectorAll('.complete-btn');
    completeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const year = e.target.getAttribute('data-year');
            const title = e.target.getAttribute('data-index');
            showCompletionForm(year, title);
        });
    });
}

function showCompletionForm(year, title) {
    const quest = year === "anytime" 
        ? quests.anytime.find(q => q.title === title)
        : quests[`year${year}`].find(q => q.title === title);

    const formHTML = `
        <div id="completion-form" class="modal">
            <h3>Complete Quest: ${quest.title}</h3>
            <label for="completion-date">Date Completed:</label>
            <input type="date" id="completion-date" required>
            <label for="completion-notes">Notes:</label>
            <textarea id="completion-notes" rows="3"></textarea>
            <h4>Translational Skills Demonstrated:</h4>
            <div id="skills-checkboxes">
                ${skillTrees.map(skill => `
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

        completeQuest(quest, completionDate, completionNotes, selectedSkills);
        document.body.removeChild(modalContainer);
    });
}

function completeQuest(quest, completionDate, completionNotes, selectedSkills) {
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
        const progressBar = document.querySelector(`.skill-tree h3[data-skill="${skill}"] + .progress-bar .progress`);
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

// Initial load
loadProgress();
displayQuests('year1');
