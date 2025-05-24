
const questions = [
    { text: "Me gusta tomar decisiones rápidamente.", type: "D" },
    { text: "Disfruto estar con otras personas y compartir ideas.", type: "I" },
    { text: "Soy paciente y buen oyente.", type: "S" },
    { text: "Me gusta que las cosas estén bien hechas y ordenadas.", type: "C" },
    { text: "No me asusta asumir riesgos.", type: "D" },
    { text: "Me entusiasma motivar a los demás.", type: "I" },
    { text: "Prefiero ambientes tranquilos y armoniosos.", type: "S" },
    { text: "Me fijo mucho en los detalles.", type: "C" },
    { text: "Soy competitivo por naturaleza.", type: "D" },
    { text: "Me gusta contar historias y hablar con todos.", type: "I" },
    { text: "Evito conflictos y discusiones.", type: "S" },
    { text: "Necesito tiempo para pensar antes de actuar.", type: "C" },
    { text: "Actúo con firmeza cuando hay que resolver algo.", type: "D" },
    { text: "Me siento cómodo siendo el centro de atención.", type: "I" },
    { text: "Valoro la estabilidad y la rutina.", type: "S" },
    { text: "Me esfuerzo por seguir las reglas y estándares.", type: "C" },
    { text: "Asumo el liderazgo cuando es necesario.", type: "D" },
    { text: "Me resulta fácil hacer amigos nuevos.", type: "I" },
    { text: "Prefiero cooperar que competir.", type: "S" },
    { text: "Analizo los pros y contras antes de decidir.", type: "C" },
    { text: "Soy muy directo cuando hablo.", type: "D" },
    { text: "Tengo facilidad para animar a otros.", type: "I" },
    { text: "Disfruto trabajando en equipo de forma constante.", type: "S" },
    { text: "Me frustra cuando las cosas se hacen mal.", type: "C" },
    { text: "Me gusta tener el control de las situaciones.", type: "D" }
];

const resultDescriptions = {
    D: "Dominante: Directo, decidido, orientado a resultados.",
    I: "Influyente: Entusiasta, sociable, comunicador.",
    S: "Estable: Leal, paciente, confiable.",
    C: "Concienzudo: Preciso, analítico, perfeccionista.",
    "D-I": "Combinación Dominante - Influyente: Líder sociable, enérgico, emprendedor.",
    "I-S": "Combinación Influyente - Estable: Amigable, comunicativo, confiable.",
    "S-C": "Combinación Estable - Concienzudo: Tranquilo, responsable, detallista.",
    "D-C": "Combinación Dominante - Concienzudo: Firme, lógico, estratégico."
};

window.onload = () => {
    const container = document.getElementById("questionsContainer");
    questions.forEach((q, i) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
            <label>${i + 1}. ${q.text}</label><br/>
            <select name="q${i}">
                <option value="0">Nada de acuerdo</option>
                <option value="1">Poco de acuerdo</option>
                <option value="2">Algo de acuerdo</option>
                <option value="3">Muy de acuerdo</option>
            </select>
        `;
        container.appendChild(div);
    });

    document.getElementById("discForm").onsubmit = function(e) {
        e.preventDefault();
        const scores = { D: 0, I: 0, S: 0, C: 0 };
        const form = new FormData(this);
        form.forEach((value, key) => {
            const idx = parseInt(key.replace("q", ""));
            const val = parseInt(value);
            const type = questions[idx].type;
            scores[type] += val;
        });

        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const result = document.getElementById("result");
        const [top1, top2] = sorted;

        let key = top1[0];
        if (top2[1] >= top1[1] - 3) key += "-" + top2[0];

        result.innerHTML = `
            <h2>Tu estilo DISC es: ${key}</h2>
            <p>${resultDescriptions[key] || resultDescriptions[top1[0]]}</p>
        `;
    };
};
