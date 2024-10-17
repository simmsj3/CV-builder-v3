// Quest data (replace with your original data)
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
            title: "Part-time Job",
            type: "Work Experience",
            description: "Look for part-time job opportunities, either on-campus or off-campus or even explore summer internship possibilities in labs or biotech companies",
            skillTree: "Leadership & Teamwork",
            reason: "Work experience, even if not directly related to biochemistry, develops professional skills and demonstrates responsibility and time management.",
            url: "https://astonfutures.aston.ac.uk/",
            year: 1
        },
        {
            title: "Personal Projects",
            type: "Professional Development",
            description: "Start a science blog. Develop a small research project or literature review in an area of interest.",
            skillTree: "Leadership & Teamwork",
            reason: "Not only can these fit around other areas, personal projects showcase your initiative, creativity, and genuine interest in biochemistry beyond coursework. These projects demonstrate self-motivation and depth of interest in your field. They can be great talking points in interviews and show that you're proactive about your learning and development.",
            url: "https://astonfutures.aston.ac.uk/",
            year: 1
        },
        {
            title: "Join a society or sports club",
            type: "Extracurricular Activities",
            description: "Join Aston's BioSoc, Biochemical Society or other relevant societies",
            skillTree: "Networking & Communication",
            reason: "Extracurricular activities develop soft skills like teamwork, communication, and time management. Leadership roles provide valuable experience in organizing and managing people and projects.",
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
    const questsSection = document.getElementById('quests');
    questsSection.innerHTML = '';
    
    const yearQuests = quests[year];
    if (yearQuests && yearQuests.length > 0) {
        yearQuests.forEach(quest => {
            const questElement = document.createElement('div');
            questElement.classList.add('quest');
            questElement.innerHTML = `
                <h3>${quest.title}</h3>
                <p>${quest.description}</p>
                <button class="complete-btn" data-year="${year}" data-title="${quest.title}">Complete</button>
            `;
            questsSection.appendChild(questElement);
        });
    }
    
    addQuestListeners();
}

function addQuestListeners() {
    const completeButtons = document.querySelectorAll('.complete-btn');
    completeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const year = e.target.getAttribute('data-year');
            const title = e.target.getAttribute('data-title');
            completeQuest(year, title);
        });
    });
}

function completeQuest(year, title) {
    const quest = quests[year].find(q => q.title === title);
    if (quest && !completedQuests.some(q => q.title === title)) {
        completedQuests.push(quest);
        updateProgress();
        saveProgress();
    }
}

function updateProgress() {
    // Update progress display
    // This function needs to be implemented based on your specific requirements
}

function saveProgress() {
    localStorage.setItem('completedQuests', JSON.stringify(completedQuests));
}

function loadProgress() {
    const savedQuests = localStorage.getItem('completedQuests');
    if (savedQuests) {
        completedQuests = JSON.parse(savedQuests);
        updateProgress();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const viewId = e.target.id;
            if (viewId === 'progress') {
                document.getElementById('quests').classList.add('hidden');
                document.getElementById('progress-section').classList.remove('hidden');
            } else {
                document.getElementById('quests').classList.remove('hidden');
                document.getElementById('progress-section').classList.add('hidden');
                displayQuests(viewId);
            }
        });
    });

    loadProgress();
    displayQuests('year1'); // Start with Year 1 quests
});
