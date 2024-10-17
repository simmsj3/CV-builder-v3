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
            description: "Join Aston's BioSoc, Biochemical Society, or any other club or society that fits your interests.",
            skillTree: "Leadership & Teamwork",
            reason: "Being part of a society or sports club helps you develop leadership, teamwork, and interpersonal skills.",
            url: "https://www.aston.ac.uk/current-students/student-opportunities/clubs-and-societies",
            year: 1
        }
    ],
    year2: [
        {
            title: "Lab Assistant",
            type: "Work Experience",
            description: "Explore opportunities to work as a lab assistant.",
            skillTree: "Scientific Skills",
            reason: "This provides hands-on experience in a lab setting, relevant to your field.",
            url: "https://www.labassistantjobs.com/",
            year: 2
        },
        {
            title: "Summer Internship",
            type: "Internships",
            description: "Apply for internships in biotech companies during the summer.",
            skillTree: "Career Development",
            reason: "Internships are crucial for building practical experience and networking.",
            url: "https://www.internships.com/biotech",
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
    ]
};

// Function to display quests for the selected year
function displayQuests(viewId) {
    const yearQuests = quests[viewId];
    const questContainer = document.getElementById("quest-container");

    if (!yearQuests || yearQuests.length === 0) {
        questContainer.innerHTML = "<p>No quests available for this year.</p>";
        return;
    }

    questContainer.innerHTML = ""; // Clear previous quests

    // Display the quests for the selected year
    yearQuests.forEach((quest) => {
        const questElement = document.createElement("div");
        questElement.className = "quest";
        questElement.innerHTML = `
            <h3>${quest.title}</h3>
            <p>Type: ${quest.type}</p>
            <p>${quest.description}</p>
            <p>Skills: ${quest.skillTree}</p>
            <p><strong>Why it's important:</strong> ${quest.reason}</p>
            <a href="${quest.url}" target="_blank">Learn More</a>
        `;
        questContainer.appendChild(questElement);
    });
}

// Function to create the progress section
function createProgressSection() {
    const progressSection = document.getElementById('progress-section');
    if (!progressSection) return;

    progressSection.innerHTML = ''; // Clear existing content

    createElement('h2', '', 'My CV Progress', progressSection);

    const skillTreesDiv = createElement('div', 'skill-trees', '', progressSection);

    skillTrees.forEach(skill => {
        const skillTreeDiv = createElement('div', 'skill-tree', '', skillTreesDiv);
        createElement('h3', '', skill, skillTreeDiv).setAttribute('data-skill', skill);
        const progressBarDiv = createElement('div', 'progress-bar', '', skillTreeDiv);
        createElement('div', 'progress', '', progressBarDiv);
    });

    const cvItemsDiv = createElement('div', 'cv-items', '', progressSection);
    createElement('h3', '', 'CV Content Suggestions', cvItemsDiv);
    createElement('ul', '', '', cvItemsDiv);
}

// Function to toggle between years and progress view
function toggleView(viewId) {
    const views = ['year1', 'year2', 'year4', 'progress-section'];
    views.forEach(view => {
        const element = document.getElementById(view) || document.getElementById('quests');
        if (element) {
            if (view === viewId) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    });

    if (viewId !== 'progress-section') {
        displayQuests(viewId);
    } else {
        updateProgress();
        updateCVItems();
    }
}

// Add event listeners to the navigation buttons
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', (e) => toggleView(e.target.id));
});

// Initialize the view
toggleView('year1');
