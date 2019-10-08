const generateNxN = (n)=> {
    const elements = 'red blue green yellow aqua'.split(' ');
    const arr =[];
    let position = 0;
    for (let i = 0; i < n; i++) {
        const innerArr = [];
        for (let j = 0; j < n; j++) {
            const el = elements[position];
            innerArr.push(el);
            elements.shift();
            elements.push(el);
        }
        arr.push(innerArr)
    }
    return arr;
};

const originalGrid = generateNxN(5);

const colors = [...document.querySelectorAll('.color')];

let isDrawing = false;

let currentColor = '';

colors.forEach(color => {
    color.addEventListener("click", ev => {
        if (currentColor === '') {
            ev.target.classList.toggle('selected')
            currentColor = ev.target.getAttribute('id');
        }
        else {
            let currentSelected = document.querySelector(`#${currentColor}`)
            currentSelected.classList.remove('selected');
            ev.target.classList.toggle('selected')
            currentColor = ev.target.getAttribute('id');
        }  
    })
})



const generateHTMLGrid = (arr)=> { 
    const canvas = document.querySelector('.grid');
    arr.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row')
        row.forEach(box => {
            const cell = document.createElement('div');
            cell.classList.add('cell')
            rowDiv.appendChild(cell);
            cell.addEventListener('click', ev => {
                cell.style.backgroundColor = currentColor;
            })
            cell.addEventListener('mousemove', ev => {
                if (isDrawing === true) {
                    cell.style.backgroundColor = currentColor;
                }
            })
        })
        canvas.appendChild(rowDiv);
        canvas.addEventListener('mousedown', ev => {
            isDrawing = true;
        })
        canvas.addEventListener('mouseup', ev => {
            isDrawing = false;
        })
    })

};

let countRows = 5;
let countCol = 5;

const addRowButton = document.querySelector('#addRow');
const removeRowButton = document.querySelector('#removeRow');
const addColButton = document.querySelector('#addCol');
const removeColButton = document.querySelector('#removeCol')

generateHTMLGrid(originalGrid);

let rows = [...document.querySelectorAll('.row')]

addRowButton.addEventListener('click', ev => {
    const canvas = document.querySelector('.grid');
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    countRows++;
    for (let i = 0; i < countCol; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell')
        rowDiv.appendChild(cell);
        cell.addEventListener('click', ev => {
            cell.style.backgroundColor = currentColor;
        })
        cell.addEventListener('mousemove', ev => {
            if (isDrawing === true) {
                cell.style.backgroundColor = currentColor;
            }
        })
        
    }
    canvas.appendChild(rowDiv);
    rows = [...document.querySelectorAll('.row')]
})

removeRowButton.addEventListener('click', ev => {
    countRows--;
    const canvas = document.querySelector('.grid');
    const lastRow = document.querySelector('.row:last-child');
    canvas.removeChild(lastRow);
    rows = [...document.querySelectorAll('.row')]
})

addColButton.addEventListener('click', ev => {
    rows.forEach(row => {
        const cell = document.createElement('div');
        cell.classList.add('cell')
        row.appendChild(cell);
        cell.addEventListener('click', ev => {
            cell.style.backgroundColor = currentColor;
        })
        cell.addEventListener('mousemove', ev => {
            if (isDrawing === true) {
                cell.style.backgroundColor = currentColor;
            }
        })
    })
    countCol++
})

removeColButton.addEventListener('click', ev => {
    countCol--;
    const lastCells = [...document.querySelectorAll('.cell:last-child')];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cell = lastCells[i];
        row.removeChild(cell);
    }
})