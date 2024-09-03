const milestoneData = JSON.parse(data).data;

function sortList(list) {
    const items = Array.from(list.children);
    items.sort((a, b) => {
        const tempA = a.querySelector('p').innerText.toUpperCase();
        const tempB = b.querySelector('p').innerText.toUpperCase();
        
        const numA = tempA.match(/\d+/) ? parseInt(tempA.match(/\d+/)[0], 10) : tempA;
        const numB = tempB.match(/\d+/) ? parseInt(tempB.match(/\d+/)[0], 10) : tempB;

        if (numA < numB) return -1;
        if (numA > numB) return 1;
        return tempA.localeCompare(tempB);
    });

    items.forEach(item => list.appendChild(item));
}

//load course data 

function loadMilestones() {
    const milestones = document.querySelector('.milestones');

    milestones.innerHTML = `${milestoneData.map(function (milestone) {
        return `<div class="milestone border-b" id="${milestone._id}">
        <div class="flex">
            <div class="checkbox"><input type="checkbox" onclick="markMileStone(this, ${milestone._id})" /></div>
            <div onclick="openMilestone(this, ${milestone._id})">
                <p>
                    ${milestone.name}
                    <span><i class="fas fa-chevron-down"></i></span>
                </p>
            </div>
        </div>
        <div class="hidden_panel">
            ${milestone.modules.map(function (module) {
                return `<div class="module border-b">
                <p>${module.name}</p>
            </div>`;
            })
            .join("")}
        </div>
    </div>`;
    })
    .join("")}`;

    sortList(milestones);
}


function openMilestone(mileStoneElement, id) {
    const currentPanel = mileStoneElement.parentNode.nextElementSibling;
    const showPanel = document.querySelector('.show');
    const active = document.querySelector('.active');

    //first remove previous active class if any[other than clicked one]
    if (active && !mileStoneElement.classList.contains('active')) {
        active.classList.remove('active');
    }

    //toggle current clicked one
    mileStoneElement.classList.toggle('active');

    //first hide previous panel if open[other than the clicked element]
    if(!currentPanel.classList.contains('show') && showPanel) 
        showPanel.classList.remove('show');
    

    //toggle current element
    currentPanel.classList.toggle('show');

    showMilestone(id);
}

function showMilestone(id) {
    const milestoneImage = document.querySelector('.milestoneImage');
    const name = document.querySelector('.title');
    const details = document.querySelector('.details');

    milestoneImage.style.opacity = '0';
    milestoneImage.src = milestoneData[id].image;
    name.innerText = milestoneData[id].name;
    details.innerText = milestoneData[id].description;
}

//listen for hero image load
const milestoneImage = document.querySelector('.milestoneImage');
milestoneImage.onload = function() {
    this.style.opacity = '1';
}

function markMileStone(checkbox, id) {
    const doneList = document.querySelector('.doneList');
    const milestonesList = document.querySelector('.milestones');
    const item = document.getElementById(id);

    if(checkbox.checked) {
        //mark as done
        milestonesList.removeChild(item);
        doneList.appendChild(item);
        sortList(doneList);
    } else{
        //back to main list
        doneList.removeChild(item);
        milestonesList.appendChild(item);
        sortList(milestonesList);
    }
}





loadMilestones();