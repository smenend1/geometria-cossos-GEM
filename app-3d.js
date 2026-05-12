const bodyData = {
    cub: {
        formula: "Àrea = 6·a² | Volum = a³",
        inputs: ['Aresta (a)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100"><path d="M20,40 L60,40 L60,80 L20,80 Z" fill="#f1faee" stroke="#e63946" stroke-width="2"/><path d="M20,40 L40,20 L80,20 L60,40" fill="none" stroke="#e63946" stroke-width="2"/><path d="M80,20 L80,60 L60,80" fill="none" stroke="#e63946" stroke-width="2"/></svg>`
    },
    prisma: {
        formula: "A = A.Lat + 2·A.Base | V = A.Base · h",
        inputs: ['Àrea Lateral', 'Àrea Base', 'Altura (h)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100"><rect x="30" y="20" width="40" height="60" fill="#f1faee" stroke="#e63946" stroke-width="2"/><path d="M30,20 L50,10 L90,10 L70,20" fill="none" stroke="#e63946" stroke-width="2"/><path d="M90,10 L90,70 L70,80" fill="none" stroke="#e63946" stroke-width="2"/></svg>`
    },
    piramide: {
        formula: "A = A.Lat + A.Base | V = (A.Base · h) / 3",
        inputs: ['Àrea Lateral', 'Àrea Base', 'Altura (h)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100"><path d="M20,80 L60,80 L80,60 L40,60 Z" fill="#f1faee" stroke="#e63946" stroke-width="2"/><line x1="50" y1="10" x2="20" y2="80" stroke="#e63946" stroke-width="2"/><line x1="50" y1="10" x2="60" y2="80" stroke="#e63946" stroke-width="2"/><line x1="50" y1="10" x2="80" y2="60" stroke="#e63946" stroke-width="2"/></svg>`
    },
    tronc: {
        formula: "V = (h·(B+b+√(B·b)))/3",
        inputs: ['Àrea Lateral', 'Àrea Base Major (B)', 'Àrea base menor (b)', 'Altura (h)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100"><path d="M20,80 L80,80 L70,50 L30,50 Z" fill="#f1faee" stroke="#e63946" stroke-width="2"/><path d="M30,50 L45,35 L65,35 L70,50" fill="none" stroke="#e63946" stroke-width="2"/></svg>`
    },
    cilindre: {
        formula: "A = 2·π·r² + 2·π·r·h | V = π·r²·h",
        inputs: ['Radi (r)', 'Altura (h)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="25" rx="30" ry="10" fill="none" stroke="#e63946" stroke-width="2"/><path d="M20,25 L20,75 A30,10 0 0,0 80,75 L80,25" fill="#f1faee" stroke="#e63946" stroke-width="2"/></svg>`
    },
    con: {
        formula: "A = π·r² + π·r·g | V = (π·r²·h) / 3",
        inputs: ['Radi (r)', 'Altura (h)', 'Generatriu (g)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100"><path d="M20,75 L50,15 L80,75" fill="#f1faee" stroke="#e63946" stroke-width="2"/><ellipse cx="50" cy="75" rx="30" ry="10" fill="none" stroke="#e63946" stroke-width="2"/></svg>`
    },
    esfera: {
        formula: "A = 4·π·r² | V = (4/3)·π·r³",
        inputs: ['Radi (r)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="#f1faee" stroke="#e63946" stroke-width="2"/><ellipse cx="50" cy="50" rx="35" ry="10" fill="none" stroke="#e63946" stroke-width="1" stroke-dasharray="4"/></svg>`
    }
};

let selectedShape = null;
const gridSelector = document.getElementById('grid-selector');
const inputsContainer = document.getElementById('inputs-container');
const displayArea = document.getElementById('display-area');

function init() {
    for (const key in bodyData) {
        const card = document.createElement('div');
        card.className = 'shape-card';
        card.innerHTML = `${bodyData[key].svg}<span>${key.toUpperCase()}</span>`;
        card.onclick = () => {
            document.querySelectorAll('.shape-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            loadShape(key);
        };
        gridSelector.appendChild(card);
    }
}

function loadShape(key) {
    selectedShape = key;
    inputsContainer.innerHTML = '';
    const data = bodyData[key];
    document.getElementById('figure-visual').innerHTML = data.svg;
    document.getElementById('formula-text').innerText = data.formula;
    data.inputs.forEach(label => {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `<label>${label}</label><input type="number" step="any" data-label="${label}">`;
        inputsContainer.appendChild(div);
    });
    displayArea.classList.remove('hidden');
}

document.getElementById('calc-btn').onclick = () => {
    const inputs = Array.from(inputsContainer.querySelectorAll('input'));
    const empty = inputs.filter(i => i.value === "");
    if (empty.length !== 1) { alert("Deixa un camp buit."); return; }

    const target = empty[0].getAttribute('data-label');
    const v = {};
    inputs.forEach(i => v[i.getAttribute('data-label')] = parseFloat(i.value));
    let res = 0;
    const PI = Math.PI;

    if (selectedShape === 'cub') {
        if (target === 'Àrea Total') res = 6 * v['Aresta (a)']**2;
        else if (target === 'Volum') res = v['Aresta (a)']**3;
        else res = v['Volum'] ? Math.cbrt(v['Volum']) : Math.sqrt(v['Àrea Total']/6);
    } else if (selectedShape === 'prisma') {
        if (target === 'Àrea Total') res = v['Àrea Lateral'] + (2 * v['Àrea Base']);
        else res = v['Àrea Base'] * v['Altura (h)'];
    } else if (selectedShape === 'piramide') {
        if (target === 'Àrea Total') res = v['Àrea Lateral'] + v['Àrea Base'];
        else res = (v['Àrea Base'] * v['Altura (h)']) / 3;
    } else if (selectedShape === 'tronc') {
        const B = v['Àrea Base Major (B)'], b = v['Àrea base menor (b)'];
        if (target === 'Àrea Total') res = v['Àrea Lateral'] + B + b;
        else res = (v['Altura (h)'] * (B + b + Math.sqrt(B * b))) / 3;
    } else if (selectedShape === 'cilindre') {
        if (target === 'Àrea Total') res = (2*PI*v['Radi (r)']**2) + (2*PI*v['Radi (r)']*v['Altura (h)']);
        else res = PI * v['Radi (r)']**2 * v['Altura (h)'];
    } else if (selectedShape === 'con') {
        if (target === 'Àrea Total') res = (PI*v['Radi (r)']**2) + (PI*v['Radi (r)']*v['Generatriu (g)']);
        else res = (PI * v['Radi (r)']**2 * v['Altura (h)']) / 3;
    } else if (selectedShape === 'esfera') {
        if (target === 'Àrea Total') res = 4 * PI * v['Radi (r)']**2;
        else res = (4/3) * PI * v['Radi (r)']**3;
    }
    empty[0].value = res.toFixed(2);
    empty[0].style.backgroundColor = "#ffccd5";
};

document.getElementById('reset-btn').onclick = () => {
    inputsContainer.querySelectorAll('input').forEach(i => {i.value = ""; i.style.backgroundColor = "white";});
};

init();
