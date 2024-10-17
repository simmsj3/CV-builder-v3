import { quests, skillTrees } from './quests.js';

let completedQuests = [];

function displayQuests(year) {
    console.log("Displaying quests for year:", year);
    
    const questsSection = document.getElementById('quests');
    if (!questsSection) {
        console.error("Quests section not found");
        return;
    }
    
    questsSection.innerHTML = '';
    
    const yearQuests = quests[year];
    if (yearQuests && yearQuests.length > 0) {
        const yearHeader = document.createElement('h2');
        yearHeader.textContent = `Year ${year.slice(-1)} Quests`;
        questsSection.appendChild(yearHeader);
        
        yearQuests.forEach(quest => displayQuest(quest, questsSection));
    }
    
    const anytimeHeader = document.createElement('h2');
    anytimeHeader.textContent = 'Quests You Can Do Anytime';
    questsSection.appendChild(anytimeHeader);
    
    quests.anytime.forEach(quest => displayQuest(quest, questsSection));
    
    addQuestListeners();
}

function displayQuest(quest, container) {
    const questElement = document.createElement('div');
    questElement.classList.add('quest');
    
    let linksHTML = '';
    if (quest.links && quest.links.length > 0) {
        linksHTML = '<p><strong>Useful Links:</strong></p><ul>' +
            quest.links.map(link => `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a></li>`).join('') +
            '</ul>';
    } else if (quest.url) {
        linksHTML = `<p><a href="${quest.url}" target="_blank" rel="noopener noreferrer">Learn more</a></p>`;
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

    if (!quest) {
        console.error("Quest not found");
        return;
    }

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
        const progressBar = document.querySelector(`#skill-trees .skill-tree[data-skill="${skill}"] .progress-bar .progress`);
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    });
}

function updateCVItems() {
    const cvItemsList = document.querySelector('#cv-items ul');
    if (!cvItemsList) {
        console.error("CV items list not found");
        return;
    }
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

function saveProgress() {
    try {
        localStorage.setItem('completedQuests', JSON.stringify(completedQuests));
    } catch (error) {
        console.error("Error saving progress:", error);
    }
}

function loadProgress() {
    try {
        const savedQuests = localStorage.getItem('completedQuests');
        if (savedQuests) {
            completedQuests = JSON.parse(savedQuests);
            updateProgress();
            updateCVItems();
        }
    } catch (error) {
        console.error("Error loading progress:", error);
    }
}

function createProgressSection() {
    const progressSection = document.getElementById('progress-section');
    if (!progressSection) {
        console.error("Progress section not found");
        return;
    }

    const skillTreesDiv = document.getElementById('skill-trees');
    if (!skillTreesDiv) {
        console.error("Skill trees container not found");
        return;
    }

    skillTreesDiv.innerHTML = ''; // Clear existing content

    skillTrees.forEach(skill => {
        const skillTreeDiv = document.createElement('div');
        skillTreeDiv.className = 'skill-tree';
        skillTreeDiv.setAttribute('data-skill', skill);
        
        const skillTitle = document.createElement('h3');
        skillTitle.textContent = skill;
        
        const progressBarDiv = document.createElement('div');
        progressBarDiv.className = 'progress-bar';
        
        const progressDiv = document.createElement('div');
        progressDiv.className = 'progress';
        
        progressBarDiv.appendChild(progressDiv);
        skillTreeDiv.appendChild(skillTitle);
        skillTreeDiv.appendChild(progressBarDiv);
        skillTreesDiv.appendChild(skillTreeDiv);
    });
}

function toggleView(viewId) {
    const views = ['year1', 'year2', 'year4', 'progress-section'];
    views.forEach(view => {
        const element = document.getElementById(view === 'progress-section' ? view : 'quests');
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

    // Update active button
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.toggle('active', btn.id === viewId);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createProgressSection();
    
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', (e) => toggleView(e.target.id));
    });

    loadProgress();
    toggleView('year1');
});

// Error logging function
function logError(message, error) {
    console.error(message, error);
    // You could implement more advanced error logging here, such as sending to a server
}

// Global error handler
window.addEventListener('error', (event) => {
    logError('Uncaught error:', event.error);
});

