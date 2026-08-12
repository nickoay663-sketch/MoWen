const Dictionary = {

    version: "6.0",

    categories: [

        "person",
        "profession",
        "identity",
        "family",
        "organization",
        "rule",
        "concept"

    ],

    objects: [

        {
            id: "object.self",
            word: "我",
            aliases: [
                "我",
                "I",
                "me",
                "yo",
                "je",
                "ich",
                "io",
                "eu"
            ],
            type: "person"
        },

        {
            id: "object.you",
            word: "你",
            aliases: [
                "你",
                "you",
                "tú",
                "tu",
                "vous",
                "du",
                "tu",
                "você"
            ],
            type: "person"
        },

        {
            id: "object.he",
            word: "他",
            aliases: [
                "他",
                "he",
                "él",
                "il",
                "er",
                "lui",
                "ele"
            ],
            type: "person"
        },

        {
            id: "object.she",
            word: "她",
            aliases: [
                "她",
                "she",
                "ella",
                "elle",
                "sie",
                "lei"
            ],
            type: "person"
        }

    ],

    concepts: [

        {
            id: "concept.teacher",
            word: "老师",
            aliases: [
                "老师",
                "teacher",
                "profesor",
                "professeure",
                "professeur",
                "Lehrer",
                "Lehrerin",
                "insegnante",
                "professore",
                "professora",
                "professor"
            ],
            category: "profession"
        },

        {
            id: "concept.doctor",
            word: "医生",
            aliases: [
                "医生",
                "doctor",
                "doctora",
                "médico",
                "médica",
                "médecin",
                "Arzt",
                "Ärztin",
                "medico",
                "médico"
            ],
            category: "profession"
        },

        {
            id: "concept.student",
            word: "学生",
            aliases: [
                "学生",
                "student",
                "estudiante",
                "étudiant",
                "étudiante",
                "Student",
                "Studentin",
                "studente",
                "aluno",
                "aluna"
            ],
            category: "identity"
        },

        {
            id: "concept.father",
            word: "父亲",
            aliases: [
                "父亲",
                "爸爸",
                "father",
                "dad",
                "padre",
                "père",
                "Vater",
                "pai"
            ],
            category: "family"
        },

        {
            id: "concept.mother",
            word: "母亲",
            aliases: [
                "母亲",
                "妈妈",
                "mother",
                "mom",
                "madre",
                "mère",
                "Mutter",
                "mãe"
            ],
            category: "family"
        },

        {
            id: "concept.country",
            word: "国家",
            aliases: [
                "国家",
                "country",
                "nation",
                "país",
                "pays",
                "Land",
                "paese"
            ],
            category: "organization"
        },

        {
            id: "concept.government",
            word: "政府",
            aliases: [
                "政府",
                "government",
                "gobierno",
                "gouvernement",
                "Regierung",
                "governo"
            ],
            category: "organization"
        },

        {
            id: "concept.law",
            word: "法律",
            aliases: [
                "法律",
                "law",
                "legal",
                "ley",
                "loi",
                "Gesetz",
                "legge",
                "lei"
            ],
            category: "rule"
        },

        {
            id: "concept.freedom",
            word: "自由",
            aliases: [
                "自由",
                "freedom",
                "liberty",
                "libertad",
                "liberté",
                "Freiheit",
                "libertà",
                "liberdade"
            ],
            category: "concept"
        },

        {
            id: "concept.truth",
            word: "真相",
            aliases: [
                "真相",
                "truth",
                "truthful",
                "verdad",
                "vérité",
                "Wahrheit",
                "verità",
                "verdade"
            ],
            category: "concept"
        },

        {
            id: "concept.evidence",
            word: "证据",
            aliases: [
                "证据",
                "evidence",
                "proof",
                "evidencia",
                "preuve",
                "Beweis",
                "prova",
                "evidência"
            ],
            category: "concept"
        },

        {
            id: "concept.testimony",
            word: "证词",
            aliases: [
                "证词",
                "testimony",
                "testimonio",
                "témoignage",
                "Zeugenaussage",
                "testimonianza",
                "testemunho"
            ],
            category: "concept"
        },

        {
            id: "concept.responsibility",
            word: "责任",
            aliases: [
                "责任",
                "responsibility",
                "responsabilidad",
                "responsabilité",
                "Verantwortung",
                "responsabilità",
                "responsabilidade"
            ],
            category: "concept"
        },

        {
            id: "concept.definition",
            word: "定义",
            aliases: [
                "定义",
                "definition",
                "definición",
                "définition",
                "Definition",
                "definizione",
                "definição"
            ],
            category: "concept"
        },

        {
            id: "concept.correspondence",
            word: "对应",
            aliases: [
                "对应",
                "correspondence",
                "correspondencia",
                "correspondance",
                "Entsprechung",
                "corrispondenza",
                "correspondência"
            ],
            category: "concept"
        },

        {
            id: "concept.reasoning",
            word: "推理",
            aliases: [
                "推理",
                "reasoning",
                "inference",
                "razonamiento",
                "raisonnement",
                "Schlussfolgerung",
                "ragionamento",
                "raciocínio"
            ],
            category: "concept"
        }

    ]

};

export default Dictionary;