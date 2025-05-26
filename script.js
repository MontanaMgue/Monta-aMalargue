document.getElementById("discTestForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    let scores = { D: 0, I: 0, S: 0, C: 0 };

    for (let [key, value] of formData.entries()) {
        let val = parseInt(value);
        let index = parseInt(key.replace("q", ""));
        if (index % 4 === 0) scores.C += val;
        else if (index % 4 === 1) scores.I += val;
        else if (index % 4 === 2) scores.D += val;
        else if (index % 4 === 3) scores.S += val;
    }

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const maxScore = sorted[0][1];
    const dominantTypes = sorted.filter(entry => entry[1] === maxScore).map(entry => entry[0]).sort();

    const combinations = dominantTypes.join("");

    const resultMap = {
        D: {
            type: "Dominante (D)",
            groupContribution: "Toman la iniciativa y lideran con confianza en situaciones exigentes.",
            strengths: "Alta determinación, autonomía, capacidad para asumir riesgos y resolver problemas rápidamente.",
            toImprove: "Puede trabajar en desarrollar empatía, escuchar más activamente y evitar decisiones impulsivas."
        },
        I: {
            type: "Influyente (I)",
            groupContribution: "Inspiran y motivan al equipo con entusiasmo y energía.",
            strengths: "Habilidad para comunicarse, generar vínculos, mantener el ánimo alto y fomentar la participación.",
            toImprove: "Podrían mejorar la atención al detalle, la constancia y la escucha activa."
        },
        S: {
            type: "Estable (S)",
            groupContribution: "Sostienen al grupo emocionalmente, creando un clima de confianza y apoyo.",
            strengths: "Lealtad, paciencia, empatía y disposición para colaborar de forma constante.",
            toImprove: "Necesitan ganar confianza para adaptarse al cambio, tomar decisiones y mostrarse más proactivos."
        },
        C: {
            type: "Concienzudo (C)",
            groupContribution: "Aportan orden, estructura y análisis en la planificación y ejecución.",
            strengths: "Precisión, pensamiento lógico, análisis profundo y compromiso con la calidad.",
            toImprove: "Podrían flexibilizarse, reducir la autoexigencia y tomar decisiones con mayor agilidad."
        },
        DI: {
            type: "Dominante-Influyente (DI)",
            groupContribution: "Líderes carismáticos, orientados a resultados y motivadores del grupo.",
            strengths: "Gran energía, empuje y habilidades sociales. Influyen y actúan con decisión.",
            toImprove: "Deben evitar actuar sin escuchar opiniones o sin evaluar riesgos detalladamente."
        },
        DS: {
            type: "Dominante-Estable (DS)",
            groupContribution: "Líderes reflexivos que actúan con determinación y estabilidad.",
            strengths: "Balancean decisión con compromiso grupal. Toman el mando y cuidan al equipo.",
            toImprove: "Pueden mostrar rigidez o exceso de control. Necesitan adaptarse mejor a nuevas ideas."
        },
        DC: {
            type: "Dominante-Concienzudo (DC)",
            groupContribution: "Ejecutores exigentes que buscan excelencia y resultados sólidos.",
            strengths: "Alta disciplina, orientación a objetivos, pensamiento estratégico.",
            toImprove: "Deben evitar la dureza al evaluar y abrirse a la colaboración y el feedback."
        },
        IS: {
            type: "Influyente-Estable (IS)",
            groupContribution: "Conectores empáticos que fomentan armonía y comunicación.",
            strengths: "Empatía, motivación positiva, comunicación fluida.",
            toImprove: "Pueden evitar el conflicto en exceso o perder de vista los objetivos concretos."
        },
        IC: {
            type: "Influyente-Concienzudo (IC)",
            groupContribution: "Creativos que combinan ideas innovadoras con calidad técnica.",
            strengths: "Imaginación, expresividad, precisión.",
            toImprove: "Pueden dispersarse o ser demasiado críticos consigo mismos."
        },
        SC: {
            type: "Estable-Concienzudo (SC)",
            groupContribution: "Soporte confiable que asegura calidad y cohesión grupal.",
            strengths: "Organización, atención al detalle, compromiso.",
            toImprove: "Deben trabajar en adaptarse al cambio y no evitar decisiones difíciles."
        },
        DISC: {
            type: "Equilibrado (DISC)",
            groupContribution: "Versátil, se adapta a lo que el grupo necesita en cada momento.",
            strengths: "Equilibrio entre acción, emoción, estructura y colaboración.",
            toImprove: "Puede tener dificultad para definir prioridades o mostrarse indeciso."
        }
    };

    const key = dominantTypes.length === 4 ? "DISC" : combinations;
    const res = resultMap[key] || resultMap[dominantTypes[0]];

    document.getElementById("resultType").textContent = res.type;
    document.getElementById("groupContribution").textContent = res.groupContribution;
    document.getElementById("strengths").textContent = res.strengths;
    document.getElementById("toImprove").textContent = res.toImprove;
    document.getElementById("result").classList.remove("hidden");
});
