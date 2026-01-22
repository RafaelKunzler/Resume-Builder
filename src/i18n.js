import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    resources: {
      en: {
        translation: {
          // Navigation
          "Personal": "Personal",
          "Experience": "Experience",
          "Education": "Education",
          "Projects": "Projects",
          "Skills": "Skills",
          "Resume": "Resume",

          // Personal Section
          "Personal Information": "Personal Information",
          "Full Name": "Full Name",
          "Email": "Email",
          "Phone": "Phone",
          "Location": "Location",
          "LinkedIn": "LinkedIn",
          "GitHub": "GitHub",
          "Professional Summary": "Professional Summary",
          "Enter your professional summary...": "Enter your professional summary...",

          // Experience Section
          "Profissional Experience": "Professional Experience",
          "Company": "Company",
          "Enter Company...": "Enter Company...",
          "Job Title": "Job Title",
          "Enter Role / Job title...": "Enter Role / Job title...",
          "Location:": "Location:",
          "Enter Location (optional)...": "Enter Location (optional)...",
          "Start Year": "Start Year",
          "End Year": "End Year",
          "MM/YYYY": "MM/YYYY",
          "Currently working here": "Currently working here",
          "Key responsabilities and achievementes": "Key responsibilities and achievements",
          "Enter key responsibilities and achievements...": "Enter key responsibilities and achievements...",
          "Add Experience": "Add Experience",

          // Education Section
          "Institution": "Institution",
          "Enter Institution name...": "Enter Institution name...",
          "Qualification/Degree": "Qualification/Degree",
          "e.g., Bachelor of Science in Computer Science...": "e.g., Bachelor of Science in Computer Science...",
          "GPA (optional):": "GPA (optional):",
          "e.g., 3.8/4.0": "e.g., 3.8/4.0",
          "Key Takeaways & Achievements": "Key Takeaways & Achievements",
          "Enter key courses, projects, honors, or achievements...": "Enter key courses, projects, honors, or achievements...",
          "Add Education": "Add Education",

          // Projects Section
          "Portfolio Projects": "Portfolio Projects",
          "Project Name": "Project Name",
          "Enter project name...": "Enter project name...",
          "Description": "Description",
          "Brief description of the project...": "Brief description of the project...",
          "Technologies/Tools": "Technologies/Tools",
          "e.g., React, Node.js, MongoDB...": "e.g., React, Node.js, MongoDB...",
          "Project URL (optional):": "Project URL (optional):",
          "https://your-project.com": "https://your-project.com",
          "GitHub Repository (optional):": "GitHub Repository (optional):",
          "https://github.com/username/repo": "https://github.com/username/repo",
          "Key Features & Achievements": "Key Features & Achievements",
          "List key features, challenges overcome, or notable achievements...": "List key features, challenges overcome, or notable achievements...",
          "Add Project": "Add Project",

          // Skills Section
          "Add Skill": "Add Skill",
          "Enter a skill...": "Enter a skill...",
          "Add": "Add",

          // Resume Preview
          "Seu Nome": "Your Name",
          "E-mail": "Email",
          "Telefone": "Phone",
          "Localização": "Location",

          // Language Switcher
          "Language": "Language",
          "English": "English",
          "Portuguese": "Portuguese"
        }
      },
      pt: {
        translation: {
          // Navigation
          "Personal": "Pessoal",
          "Experience": "Experiência",
          "Education": "Educação",
          "Projects": "Projetos",
          "Skills": "Habilidades",
          "Resume": "Currículo",

          // Personal Section
          "Personal Information": "Informações Pessoais",
          "Full Name": "Nome Completo",
          "Email": "E-mail",
          "Phone": "Telefone",
          "Location": "Localização",
          "LinkedIn": "LinkedIn",
          "GitHub": "GitHub",
          "Professional Summary": "Resumo Profissional",
          "Enter your professional summary...": "Digite seu resumo profissional...",

          // Experience Section
          "Profissional Experience": "Experiência Profissional",
          "Company": "Empresa",
          "Enter Company...": "Digite a Empresa...",
          "Job Title": "Cargo",
          "Enter Role / Job title...": "Digite o Cargo / Título do cargo...",
          "Location:": "Localização:",
          "Enter Location (optional)...": "Digite a Localização (opcional)...",
          "Start Year": "Ano de Início",
          "End Year": "Ano de Fim",
          "MM/YYYY": "MM/AAAA",
          "Currently working here": "Trabalhando aqui atualmente",
          "Key responsabilities and achievementes": "Principais responsabilidades e conquistas",
          "Enter key responsibilities and achievements...": "Digite as principais responsabilidades e conquistas...",
          "Add Experience": "Adicionar Experiência",

          // Education Section
          "Institution": "Instituição",
          "Enter Institution name...": "Digite o nome da Instituição...",
          "Qualification/Degree": "Qualificação/Diploma",
          "e.g., Bachelor of Science in Computer Science...": "ex.: Bacharelado em Ciência da Computação...",
          "GPA (optional):": "CR (opcional):",
          "e.g., 3.8/4.0": "ex.: 8.5/10.0",
          "Key Takeaways & Achievements": "Principais aprendizados e conquistas",
          "Enter key courses, projects, honors, or achievements...": "Digite cursos importantes, projetos, honras ou conquistas...",
          "Add Education": "Adicionar Educação",

          // Projects Section
          "Portfolio Projects": "Projetos de Portfólio",
          "Project Name": "Nome do Projeto",
          "Enter project name...": "Digite o nome do projeto...",
          "Description": "Descrição",
          "Brief description of the project...": "Breve descrição do projeto...",
          "Technologies/Tools": "Tecnologias/Ferramentas",
          "e.g., React, Node.js, MongoDB...": "ex.: React, Node.js, MongoDB...",
          "Project URL (optional):": "URL do Projeto (opcional):",
          "https://your-project.com": "https://seu-projeto.com",
          "GitHub Repository (optional):": "Repositório GitHub (opcional):",
          "https://github.com/usuario/repo": "https://github.com/usuario/repo",
          "Key Features & Achievements": "Funcionalidades principais e conquistas",
          "List key features, challenges overcome, or notable achievements...": "Liste funcionalidades principais, desafios superados ou conquistas notáveis...",
          "Add Project": "Adicionar Projeto",

          // Skills Section
          "Add Skill": "Adicionar Habilidade",
          "Enter a skill...": "Digite uma habilidade...",
          "Add": "Adicionar",

          // Resume Preview
          "Seu Nome": "Seu Nome",
          "E-mail": "E-mail",
          "Telefone": "Telefone",
          "Localização": "Localização",

          // Language Switcher
          "Language": "Idioma",
          "English": "Inglês",
          "Portuguese": "Português"
        }
      }
    }
  });

export default i18n;