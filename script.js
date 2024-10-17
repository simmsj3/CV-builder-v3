const quests = {
    year1: [
        {
            title: "Volunteering",
            type: "Work Experience",
            description: "Get involved in a community project, charity or organisation.",
            skillTree: "Leadership & Teamwork",
            reason: "Volunteering shows commitment to your community and your field. It can provide hands-on experience in scientific or healthcare settings.",
            url: "https://www.aston.ac.uk/careers/get-experience/part-time-jobs-and-volunteering"
        },
        {
            title: "Join BioSoc or other relevant societies",
            type: "Extracurricular Activities",
            description: "Become a member of the Biochemistry Society or other relevant societies.",
            skillTree: "Networking & Communication",
            reason: "Engaging in academic activities beyond coursework shows genuine interest in your field and a proactive approach to learning.",
            url: "https://www.astonsu.com/activities/clubsandsocieties/"
        },
        {
            title: "Attend events, workshops, or external talks",
            type: "Professional Development",
            description: "Participate in networking events, seminars, or inaugural professorial talks.",
            skillTree: "Academic Excellence",
            reason: "These activities help you present yourself more effectively to potential employers and show continuous learning outside the classroom.",
            url: "https://www.aston.ac.uk/careers/find-a-job/researching-employers"
        },
        {
            title: "Develop in-demand skills",
            type: "Skills Development",
            description: "Focus on developing skills that are in high demand among employers.",
            skillTree: "Technical Proficiency",
            reason: "Developing technical skills beyond those taught in your courses makes you more versatile and valuable to potential employers.",
            url: "https://www.aston.ac.uk/careers/cv/resource-library"
        },
        {
            title: "Set up a LinkedIn profile",
            type: "Professional Development",
            description: "Create a professional LinkedIn profile to start building your online presence.",
            skillTree: "Networking & Communication",
            reason: "A strong professional online presence showcases your seriousness about your career. LinkedIn allows you to connect with professionals, alumni, and potential employers.",
            url: "https://www.aston.ac.uk/careers/cv/cvs-and-cover-letters"
        }
    ],
    year2: [
        {
            title: "Meet with Placement Coordinator",
            type: "Professional Development",
            description: "Have a 1-to-1 meeting with the Placement Coordinator to discuss your career goals.",
            skillTree: "Professional Skills",
            reason: "This meeting helps you understand the placement process and align your career goals with potential opportunities.",
            url: "https://www.aston.ac.uk/careers/contact-us"
        },
        {
            title: "Attend All Placement Workshops",
            type: "Professional Development",
            description: "Participate in all scheduled Placement Workshops to prepare for your placement year.",
            skillTree: "Professional Skills",
            reason: "These workshops provide essential information and skills for securing and succeeding in your placement.",
            url: "https://www.aston.ac.uk/careers/placements"
        },
        {
            title: "Attend The Big Careers Fair",
            type: "Networking",
            description: "Attend the careers fair and speak to at least 3 employers about opportunities. Take a selfie in front of their stands for extra points!",
            skillTree: "Networking & Communication",
            reason: "Career fairs provide opportunities to learn about different industries and make connections with potential employers.",
            url: "https://www.aston.ac.uk/careers/find-a-job/researching-employers"
        },
        {
            title: "Explore Internship Opportunities",
            type: "Work Experience",
            description: "Research and apply for insight experiences and short-term internships.",
            skillTree: "Professional Skills",
            reason: "Internships provide valuable work experience and can lead to future employment opportunities.",
            url: "https://www.aston.ac.uk/careers/get-experience/internships"
        },
        {
            title: "Develop your CV",
            type: "Professional Development",
            description: "Attend CV writing workshops and use the university's resources to improve your CV.",
            skillTree: "Professional Skills",
            reason: "A well-crafted CV is essential for securing placements and future employment.",
            url: "https://www.aston.ac.uk/careers/cv/resource-library"
        }
    ],
    year4: [
        {
            title: "Apply for Graduate Programmes",
            type: "Professional Development",
            description: "Research and apply for at least 3 graduate programmes (e.g., STP).",
            skillTree: "Professional Skills",
            reason: "Applying for graduate programmes helps you transition from university to professional life.",
            url: "https://www.aston.ac.uk/careers/find-a-job/researching-employers"
        },
        {
            title: "Meet with Careers Consultant",
            type: "Professional Development",
            description: "Schedule and attend a meeting with a Careers Consultant to discuss post-graduation plans.",
            skillTree: "Professional Skills",
            reason: "Career consultants can provide valuable guidance on your career path and job search strategies.",
            url: "https://www.aston.ac.uk/careers/contact-us"
        },
        {
            title: "Connect with Alumni",
            type: "Networking",
            description: "Connect with Alumni on LinkedIn and people who work at companies you're interested in.",
            skillTree: "Networking & Communication",
            reason: "Alumni connections can provide insights into different career paths and potential job opportunities.",
            url: "https://www.aston.ac.uk/careers/cv/cvs-and-cover-letters"
        },
        {
            title: "Mentor a Year 1 or 2 Student",
            type: "Leadership and Communication",
            description: "Offer to mentor a younger student to develop leadership skills.",
            skillTree: "Leadership & Teamwork",
            reason: "Mentoring demonstrates leadership skills and helps consolidate your own knowledge.",
            url: "https://www.aston.ac.uk/careers/placements"
        },
        {
            title: "Record Placement Experience",
            type: "Personal Projects",
            description: "Create a short video or write-up about your placement experience and tips for future students.",
            skillTree: "Networking & Communication",
            reason: "Reflecting on your placement experience helps you articulate your skills and experiences to future employers.",
            url: "https://www.aston.ac.uk/careers/get-experience/internships"
        },
        {
            title: "Keep a Job Application Record",
            type: "Professional Development",
            description: "Maintain a record of your job applications, including company names, positions, and application status.",
            skillTree: "Professional Skills",
            reason: "Keeping track of your applications helps you manage your job search effectively and follow up appropriately.",
            url: "https://www.aston.ac.uk/careers/cv/resource-library"
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
// ... (Keep the existing quests and skillTrees definitions)

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
    if (quests[year]) {
        quests[year].forEach((quest, index) => {
            const questElement = document.createElement('div');
            questElement.classList.add('quest');
            questElement.innerHTML = `
                <h3>${quest.title}</h3>
                <p class="quest-type">${quest.type}</p>
                <p>${quest.description}</p>
                <p><strong>Why it's important:</strong> ${quest.reason}</p>
                <p><a href="${quest.url}" target="_blank">Learn more</a></p>
                <button class="complete-btn" data-year="${year}" data-index="${index}">Complete Quest</button>
            `;
            questsSection.appendChild(questElement);
        });
        addQuestListeners();
    } else {
        questsSection.innerHTML = '<p>No quests available for this year.</p>';
    }
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
