const translations = {
  es: {
    title: "Hola, mi nombre es Tomas Montoya 👋",
    subtitle: "Bienvenido a mi portafolio personal",

    "softskills-title": "Habilidades Blandas",
    "learning-title": "Aprendiendo",
    "contact-title": "Contacto",
    "about-title": "Sobre mí",
    "tech-title": "Habilidades Técnicas",
    "education-title": "Formación e Idiomas",
    "experience-title": "Experiencia Laboral",
    "projects-title": "Proyectos",

    "about-text":
      "Soy un desarrollador web apasionado por la tecnología y el aprendizaje continuo. Me encanta crear sitios web interactivos y funcionales con creatividad. Algunos de mis hobbies son el trading, inversiones, carros y jugar videojuegos. Estoy en busca de nuevas oportunidades para seguir creciendo a nivel personal y profesional en el mundo del desarrollo web.",

    edu1: "Actualmente cursando Tecnología en Desarrollo de Software - UTP",
    edu2: "Curso Desarrollo Front End - AprendemosWEB",
    edu3: "Inglés Nivel B1 - Universidad Tecnológica de Pereira",
    edu4: "Curso Pre-Medico - Universidad Tecnológica de Pereira",
    edu5: "Bachiller Técnico en Diseño y Desarrollo Web - Instituto Técnico Superior de Pereira",

    exp1: "2025-Actualidad - Asistente de oficina y marketing - My Call Insurance",
    exp2: "2024-Actualidad -Desarrollo Web - Independiente",
    exp3: "2024-Actualidad -Diseño Digital - Independiente",
    exp4: "2024-2025 -Desarrollo de apps en PowerApps - Independiente",
    exp5: "2022-2025 - Jefe de Bodega y Despachos - Occidente Papelería y más",
    exp6: "2022-2025 -Asesor Comercial - Occidente Papelería y más",

    repo: "Ver Repositorio",

    demo: "Ver Demo",

    descargar: "Descargar SCV",
    vercv: "Ver CV",
    infopersonal: "Información Personal",
    contactotitulo2: "Contacto",
    nombre: "Nombre",
    correo: "Correo",
    mensaje: "Mensaje",
    enviar: "Enviar",
    detallesmensaje: "Detalles del Mensaje",
    programa: "Programa Académico",
    options: "Seleccione una opcion",
    software: "Tecnologías de Desarrollo de Software - UTP",
    ingenieria: "Ingeniería de Sistemas",
    empresa: "Empresa",
    otro: "Otro",
    terminos: "Acepto los términos y condiciones",

    skill1: "Comunicación efectiva",
    skill2: "Adaptabilidad",
    skill3: "Creatividad",
    skill4: "Gestión del tiempo",
    skill5: "Trabajo en equipo y colaboración",
  },

  en: {
    title: "Hi, my name is Tomas Montoya 👋",
    subtitle: "Welcome to my personal portfolio",

    "softskills-title": "Soft Skills",
    "learning-title": "Learning",
    "contact-title": "Contact",
    "about-title": "About Me",
    "tech-title": "Technical Skills",
    "education-title": "Education & Languages",
    "experience-title": "Work Experience",
    "projects-title": "Projects",

    "about-text":
      "I am a web developer passionate about technology and continuous learning. I love creating interactive and functional websites with creativity. Some of my hobbies include trading, investments, cars and playing video games. I am looking for new opportunities to continue growing both personally and professionally in the world of web development.",

    edu1: "Currently studying Software Development Technology - UTP",
    edu2: "Front End Development Course - AprendemosWEB",
    edu3: "English Level B1 - Universidad Tecnológica de Pereira",
    edu4: "Pre-Medical Course - Universidad Tecnológica de Pereira",
    edu5: "Technical High School Degree in Web Design and Development - Instituto Técnico Superior de Pereira",

    exp1: "2025-Present - Office and Marketing Assistant - My Call Insurance",
    exp2: "2024-Present - Web Development - Independent",
    exp3: "2024-Present - Digital Design - Independent",
    exp4: "2024-2025 - PowerApps App Development - Independent",
    exp5: "2022-2025 - Warehouse and Dispatch Manager - Occidente Papelería y más",
    exp6: "2022-2025 - Sales Advisor - Occidente Papelería y más",

    repo: "View Repository",

    demo: "View Demo",

    descargar: "Download CV",
    vercv: "View CV",
    infopersonal: "Personal Information",
    contactotitulo2: "Contact",
    nombre: "Name",
    correo: "Email",
    mensaje: "Message",
    enviar: "Send",
    detallesmensaje: "Message Details",
    programa: "Academic Program",
    options: "Select an option",
    software: "Software Development Technology - UTP",
    ingenieria: "System Engineering",
    empresa: "Company",
    otro: "Other",
    terminos: "Accept Terms and Conditions",
    skill1: "Effective communication",
    skill2: "Adaptability",
    skill3: "Creativity",
    skill4: "Time management",
    skill5: "Teamwork and collaboration",
  },
};

let currentLang = "es";

function toggleLanguage() {
  currentLang = currentLang === "es" ? "en" : "es";

  Object.keys(translations[currentLang]).forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = translations[currentLang][id];
    }
  });

  document.querySelectorAll("#repo").forEach((el) => {
    el.textContent = translations[currentLang].repo;
  });

  document.querySelectorAll("#demo").forEach((el) => {
    el.textContent = translations[currentLang].demo;
  });
}
