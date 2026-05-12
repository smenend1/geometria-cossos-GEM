const bodyData = {
    prisma: {
        formula: "Àrea Total = A.Lateral + 2·A.Base | Volum = A.Base × h",
        inputs: ['Àrea Lateral', 'Àrea Base', 'Altura (h)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100" width="120"><path d="M30,20 L70,20 L80,35 L40,35 Z" fill="none" stroke="#e63946" stroke-width="2"/><path d="M30,70 L70,70 L80,85 L40,85 Z" fill="#f1faee" stroke="#e63946" stroke-width="2"/><line x1="30" y1="20" x2="30" y2="70" stroke="#e63946" stroke-width="2"/><line x1="70" y1="20" x2="70" y2="70" stroke="#e63946" stroke-width="2"/><line x1="80" y1="35" x2="80" y2="85" stroke="#e63946" stroke-width="2"/></svg>`
    },
    piramide: {
        formula: "Àrea Total = A.Lateral + A.Base | Volum = (A.Base × h) / 3",
        inputs: ['Àrea Lateral', 'Àrea Base', 'Altura (h)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100" width="120"><path d="M20,80 L50,80 L65,65 L35,65 Z" fill="#f1faee" stroke="#e63946" stroke-width="2"/><line x1="42" y1="20" x2="20" y2="80" stroke="#e63946"/><line x1="42" y1="20" x2="50" y2="80" stroke="#e63946"/><line x1="42" y1="20" x2="65" y2="65" stroke="#e63946"/></svg>`
    },
    cilindre: {
        formula: "A = 2·π·r² + 2·π·r·h | V = π·r²·h",
        inputs: ['Radi (r)', 'Altura (h)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100" width="120"><ellipse cx="50" cy="25" rx="30" ry="10" fill="none" stroke="#e63946" stroke-width="2"/><path d="M20,25 L20,75 A30,10 0 0,0 80,75 L80,25" fill="#f1faee" stroke="#e63946" stroke-width="2"/></svg>`
    },
    con: {
        formula: "A = π·r² + π·r·g | V = (π·r²·h) / 3",
        inputs: ['Radi (r)', 'Altura (h)', 'Generatriu (g)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100" width="120"><path d="M20,75 L50,15 L80,75" fill="#f1faee" stroke="#e63946" stroke-width="2"/><ellipse cx="50" cy="75" rx="30" ry="10" fill="none" stroke="#e63946" stroke-width="2"/></svg>`
    },
    esfera: {
        formula: "Àrea = 4·π·r² | Volum = (4/3)·π·r³",
        inputs: ['Radi (r)', 'Àrea Total', 'Volum'],
        svg: `<svg viewBox="0 0 100 100" width="120"><circle cx="50" cy="50" r="35" fill="#f1faee" stroke="#e63946" stroke-width="2"/><ellipse cx="50" cy="50" rx="35" ry="10" fill="none" stroke="#e63946" stroke-width="1" stroke-dasharray="4"/></svg>`
    }
};

const select = document.getElementById('body-select');
const inputsContainer = document.getElementById('inputs-container');
const displayArea = document.getElementById('display-area');

select.addEventListener('change', (e) => {
    const shape = e.target.value;
    if (!shape) { displayArea.classList.add('hidden'); return; }

    inputsContainer.innerHTML = '';
    const data = bodyData[shape];
    document.getElementById('figure-visual').innerHTML = data.svg;
    document.getElementById('formula-text').innerText = data.formula;

    data.inputs.forEach(label => {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `<label>${label}</label><input type="number" step="any" data-label="${label}">`;
        inputsContainer.appendChild(div);
    });
    displayArea.classList.remove('hidden');
});

document.getElementById('calc-btn').addEventListener('click', () => {
    const inputs = Array.from(inputsContainer.querySelectorAll('input'));
    const empty = inputs.filter(i => i.value === "");
    if (empty.length !== 1) { alert("Deixa un camp buit."); return; }

    const target = empty[0].getAttribute('data-label');
    const shape = select.value;
    const v = {};
    inputs.forEach(i => v[i.getAttribute('data-label')] = parseFloat(i.value));

    let res = 0;
    const PI = Math.PI;

    if (shape === 'prisma') {
        if (target === 'Àrea Total') res = v['Àrea Lateral'] + (2 * v['Àrea Base']);
        else if (target === 'Volum') res = v['Àrea Base'] * v['Altura (h)'];
    } else if (shape === 'piramide') {
        if (target === 'Àrea Total') res = v['Àrea Lateral'] + v['Àrea Base'];
        else if (target === 'Volum') res = (v['Àrea Base'] * v['Altura (h)']) / 3;
    } else if (shape === 'cilindre') {
        if (target === 'Àrea Total') res = (2*PI*v['Radi (r)']**2) + (2*PI*v['Radi (r)']*v['Altura (h)']);
        else if (target === 'Volum') res = PI * v['Radi (r)']**2 * v['Altura (h)'];
    } else if (shape === 'con') {
        if (target === 'Àrea Total') res = (PI*v['Radi (r)']**2) + (PI*v['Radi (r)']*v['Generatriu (g)']);
        else if (target === 'Volum') res = (PI * v['Radi (r)']**2 * v['Altura (h)']) / 3;
    } else if (shape === 'esfera') {
        if (target === 'Àrea Total') res = 4 * PI * v['Radi (r)']**2;
        else if (target === 'Volum') res = (4/3) * PI * v['Radi (r)']**3;
    }

    empty[0].value = res.toFixed(2);
    empty[0].style.backgroundColor = "#ffccd5";
});

document.getElementById('reset-btn').onclick = () => {
    inputsContainer.querySelectorAll('input').forEach(i => { i.value = ""; i.style.backgroundColor = "white"; });
};