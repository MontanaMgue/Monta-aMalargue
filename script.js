
const questions = [
    { text: "Me gusta tomar decisiones rápidamente.", D: 3, I: 1, S: 0, C: 0 },
    { text: "Prefiero armonía y evitar conflictos.", D: 0, I: 1, S: 3, C: 0 },
    { text: "Me gusta seguir procedimientos con precisión.", D: 0, I: 0, S: 1, C: 3 },
    { text: "Disfruto motivando e inspirando a otros.", D: 1, I: 3, S: 0, C: 0 },
    { text: "Me concentro en resultados y objetivos.", D: 3, I: 1, S: 0, C: 0 },
    { text: "Me esfuerzo por ser predecible y confiable.", D: 0, I: 0, S: 3, C: 1 },
    { text: "Me gusta ser minucioso y preciso.", D: 0, I: 0, S: 1, C: 3 },
    { text: "Me entusiasma estar rodeado de personas.", D: 0, I: 3, S: 1, C: 0 }
];

const form = document.getElementById("quiz-form");

questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `<p><strong>${i+1}. ${q.text}</strong></p>
        <label><input type="radio" name="q${i}" value="4"> Muy de acuerdo</label>
        <label><input type="radio" name="q${i}" value="3"> De acuerdo</label>
        <label><input type="radio" name="q${i}" value="2"> En desacuerdo</label>
        <label><input type="radio" name="q${i}" value="1"> Nada de acuerdo</label>`;
    form.appendChild(div);
});

function calculateResult() {
    let scores = { D: 0, I: 0, S: 0, C: 0 };

    questions.forEach((q, i) => {
        const val = parseInt(document.querySelector(`input[name='q${i}']:checked`)?.value);
        if (!val) return;
        scores.D += q.D * val;
        scores.I += q.I * val;
        scores.S += q.S * val;
        scores.C += q.C * val;
    });

    const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]);
    const main = sorted[0][0], second = sorted[1][0];

    const map = {
        D: { label: "Dominante", desc: "Persona decidida, orientada a la acción. En montaña: resuelve con rapidez. A tener en cuenta: puede imponer sin escuchar." },
        I: { label: "Influyente", desc: "Motivador, alegre. En montaña: contagia entusiasmo. A tener en cuenta: puede dispersarse." },
        S: { label: "Estable", desc: "Sereno, busca armonía. En montaña: gran compañero. A tener en cuenta: puede evitar conflictos importantes." },
        C: { label: "Consciente", desc: "Preciso, analítico. En montaña: cuida detalles. A tener en cuenta: puede demorar decisiones." }
    };

    const mainStyle = map[main];
    const secondStyle = sorted[1][1] > 0.85 * sorted[0][1] ? map[second] : null;

    let resultText = `<h2>Tu estilo principal: ${mainStyle.label}</h2><p>${mainStyle.desc}</p>`;
    if (secondStyle) {
        resultText += `<h3>Estilo secundario: ${secondStyle.label}</h3><p>${secondStyle.desc}</p>`;
    }

    document.getElementById("result").innerHTML = resultText;
}
