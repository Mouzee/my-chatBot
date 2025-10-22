import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

const enTranslations = {
  welcome: {
    greeting:
      "Welcome to my interactive portfolio! I'd be glad to share more about my work and experience with you. May I know your name?",
    namePrompt: "Enter your name...",
    nameError: "Please enter at least 2 characters",
    niceMeet: "Nice to meet you, {{name}}! Are you a recruiter, potential client, or looking to collaborate?",
  },
  categories: {
    recruiter: "Recruiter / Employer 💼",
    client: "Client / Business 💼",
    collaborator: "Collaborator / Partner 🤝",
    selectPrompt: "Great! Here are some questions you might have. Feel free to explore any that interest you:",
  },
  actions: {
    submit: "Submit name",
    restart: "Restart Conversation",
    done: "I'm done for now",
    doneMessage: "I'm done exploring questions",
    thanksMessage: "Thanks for exploring my portfolio! Feel free to restart or reach out anytime.",
    anotherQuestion: "Would you like to explore another question?",
    allExplored: "You've explored all the questions! Would you like to start over or check out my work?",
  },
  cta: {
    recruiter: "Download my CV",
    client: "Start a Project Together",
    collaborator: "Collaborate on GitHub",
  },
  header: {
    title: "Portfolio Assistant",
    subtitle: "Learn about my work & experience",
  },
  hero: {
    badge: "Interactive Portfolio",
    title: "Explore My",
    titleHighlight: "Work & Skills",
    description:
      "Chat with my AI assistant to learn about my experience, projects, and expertise in UI/UX design and front-end development.",
    feature1: "Interactive Experience",
    feature2: "Instant Insights",
    feature3: "Personalized Journey",
  },
  navigation: {
    home: "Home",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    experience: "Experience",
  },
  pages: {
    about: {
      title: "About Me",
      subtitle: "Passionate designer and developer creating meaningful digital experiences",
      experience: {
        title: "5+ Years Experience",
        description:
          "Working across healthcare, banking, government, and e-commerce sectors with diverse teams and technologies.",
      },
      mission: {
        title: "My Mission",
        description: "To bridge the gap between design and development, creating intuitive interfaces that users love.",
      },
      passion: {
        title: "What I Love",
        description:
          "Exploring new technologies, solving complex problems, and bringing creative ideas to life through code.",
      },
    },
    projects: {
      title: "My Projects",
      subtitle: "A showcase of my recent work and creative solutions",
      viewDemo: "View Demo",
      viewCode: "View Code",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's discuss your next project or collaboration opportunity",
      info: {
        title: "Contact Information",
        email: "hello@portfolio.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
      },
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        send: "Send Message",
        success: "Message sent successfully!",
        error: "Failed to send message. Please try again.",
      },
      social: {
        title: "Follow Me",
        linkedin: "LinkedIn",
        github: "GitHub",
        twitter: "Twitter",
        dribbble: "Dribbble",
      },
    },
    experience: {
      title: "Changelog from My Journey",
      subtitle: "A timeline of my professional growth and key milestones",
      badge: "Career Timeline",
    },
  },
  skills: {
    title: "My Skills",
    subtitle: "Technologies and tools I work with",
    categories: {
      frontend: "Frontend Development",
      design: "UI/UX Design",
      backend: "Backend & Tools",
    },
  },
  progress: {
    explored: "{{count}} of {{total}} explored",
  },
  faq: {
    recruiter: [
      {
        id: "rec-1",
        question: "What is your expertise?",
        answer:
          "I specialize in UI/UX Design & Front-end Development, with hands-on experience in Next.js, Vite, Angular, React, Shadcn UI, TailwindCSS, Bootstrap, along with creative tools like Figma, Sketch, Adobe Suite, and AI Prompting.",
      },
      {
        id: "rec-2",
        question: "What industries have you worked in?",
        answer:
          "I've designed and developed solutions for Healthcare, Banking, Social Apps, HR Solutions, Government & Military domains, Booking systems, Service portals, E-commerce, and Creative Branding projects.",
      },
      {
        id: "rec-3",
        question: "Do you have experience with collaborative projects?",
        answer:
          "Yes. I've worked in design agencies, startups, and government regulators, collaborating closely with developers, analysts, product owners, and stakeholders.",
      },
      {
        id: "rec-4",
        question: "What are your core skills?",
        answer:
          "My key strengths include UI/UX Design, Branding, Front-end Development, Interactive Prototyping, Responsive Layouts, Component Libraries, and CMS Websites.",
      },
      {
        id: "rec-5",
        question: "Can you share some main projects?",
        answer:
          "A few highlights: HR Management Dashboard (Next.js + Shadcn), Booking & Appointment System, Government Health Regulatory Portal, Government Attendance System with Live Actions, Police & Military Digital Solutions, E-commerce & Business Websites, Interactive Landing Pages & Personal Portfolio.",
      },
      {
        id: "rec-6",
        question: "How can I contact you?",
        answer:
          "You can reach me via my Portfolio Website, LinkedIn, Email, or WhatsApp. I'm also happy to share my CV upon request.",
      },
    ],
    client: [
      {
        id: "cli-1",
        question: "What services do you provide?",
        answer:
          "I help businesses with UI/UX design, prototyping, branding, and front-end development to turn concepts into functional, user-friendly products.",
      },
      {
        id: "cli-2",
        question: "Can you customize dashboards or booking systems?",
        answer:
          "Absolutely. I create custom dashboards, booking platforms, attendance portals, and workflow tools tailored to your business needs.",
      },
      {
        id: "cli-3",
        question: "Do you also work with branding and identity?",
        answer:
          "Yes. I provide branding, logo design, and UI style guides, ensuring your product identity aligns with your audience.",
      },
      {
        id: "cli-4",
        question: "What's your design and development process?",
        answer:
          "My workflow: Requirements & Research → Wireframes → Figma Prototypes / Branding Concepts → Front-end Build (Next.js / Shadcn / TailwindCSS).",
      },
      {
        id: "cli-5",
        question: "Do you work on XR/AR/VR projects?",
        answer: "Yes! I have explored XR (AR/VR/MR) and plan to feature more immersive experiences in my portfolio.",
      },
      {
        id: "cli-6",
        question: "How can we start working together?",
        answer:
          "Reach me via Portfolio Website, LinkedIn, or WhatsApp. I'm open to freelance, contract, or project-based work.",
      },
    ],
    collaborator: [
      {
        id: "col-1",
        question: "What's your tech stack?",
        answer:
          "I mainly use Next.js, React, TypeScript, TailwindCSS, Shadcn UI, Framer Motion, and design tools like Figma & Adobe Suite.",
      },
      {
        id: "col-2",
        question: "Do you work on open-source or side projects?",
        answer: "Yes! I enjoy building tools, UI kits, dashboards, and experimental portfolio projects.",
      },
      {
        id: "col-3",
        question: "Are you involved in any startups?",
        answer: "Yes, I'm part of Mouzee.Tech, a startup team focused on digital products, UI/UX design, and branding.",
      },
      {
        id: "col-4",
        question: "What skills do you bring to a team?",
        answer: "I bridge the design-to-code gap, offering UI/UX prototyping, front-end coding, and creative branding.",
      },
      {
        id: "col-5",
        question: "Do you collaborate remotely?",
        answer: "Yes, I'm flexible with remote collaboration, async workflows, and modern team tools.",
      },
      {
        id: "col-6",
        question: "Where can I connect with you?",
        answer:
          "Let's connect via Portfolio Website, GitHub, or LinkedIn. I'm always open to interesting collaborations!",
      },
    ],
  },
}

const arTranslations = {
  welcome: {
    greeting: "مرحبًا بك في محفظتي التفاعلية! يسعدني مشاركة المزيد عن عملي وخبرتي معك. هل يمكنني معرفة اسمك؟",
    namePrompt: "أدخل اسمك...",
    nameError: "الرجاء إدخال حرفين على الأقل",
    niceMeet: "تشرفت بمعرفتك، {{name}}! هل أنت مسؤول توظيف، عميل محتمل، أم تبحث عن التعاون؟",
  },
  categories: {
    recruiter: "مسؤول توظيف / صاحب عمل 💼",
    client: "عميل / شركة 💼",
    collaborator: "متعاون / شريك 🤝",
    selectPrompt: "رائع! إليك بعض الأسئلة التي قد تكون لديك. لا تتردد في استكشاف أي منها:",
  },
  actions: {
    submit: "إرسال الاسم",
    restart: "إعادة بدء المحادثة",
    done: "انتهيت الآن",
    doneMessage: "انتهيت من استكشاف الأسئلة",
    thanksMessage: "شكرًا لاستكشاف محفظتي! لا تتردد في إعادة البدء أو التواصل في أي وقت.",
    anotherQuestion: "هل ترغب في استكشاف سؤال آخر؟",
    allExplored: "لقد استكشفت جميع الأسئلة! هل ترغب في البدء من جديد أو الاطلاع على أعمالي؟",
  },
  cta: {
    recruiter: "تحميل سيرتي الذاتية",
    client: "ابدأ مشروعًا معًا",
    collaborator: "تعاون على GitHub",
  },
  header: {
    title: "مساعد المحفظة",
    subtitle: "تعرف على عملي وخبرتي",
  },
  hero: {
    badge: "محفظة تفاعلية",
    title: "استكشف",
    titleHighlight: "أعمالي ومهاراتي",
    description:
      "تحدث مع مساعدي الذكي لتتعرف على خبرتي ومشاريعي وخبرتي في تصميم واجهة المستخدم وتطوير الواجهة الأمامية.",
    feature1: "تجربة تفاعلية",
    feature2: "رؤى فورية",
    feature3: "رحلة شخصية",
  },
  navigation: {
    home: "الرئيسية",
    about: "عني",
    projects: "المشاريع",
    skills: "المهارات",
    contact: "اتصل بي",
    experience: "الخبرة",
  },
  pages: {
    about: {
      title: "عني",
      subtitle: "مصمم ومطور شغوف بإنشاء تجارب رقمية ذات مغزى",
      experience: {
        title: "أكثر من 5 سنوات خبرة",
        description: "العمل في قطاعات الرعاية الصحية والبنوك والحكومة والتجارة الإلكترونية مع فرق وتقنيات متنوعة.",
      },
      mission: {
        title: "مهمتي",
        description: "سد الفجوة بين التصميم والتطوير، وإنشاء واجهات بديهية يحبها المستخدمون.",
      },
      passion: {
        title: "ما أحبه",
        description: "استكشاف التقنيات الجديدة، وحل المشكلات المعقدة، وإحياء الأفكار الإبداعية من خلال الكود.",
      },
    },
    projects: {
      title: "مشاريعي",
      subtitle: "عرض لأعمالي الحديثة والحلول الإبداعية",
      viewDemo: "عرض تجريبي",
      viewCode: "عرض الكود",
    },
    contact: {
      title: "تواصل معي",
      subtitle: "دعنا نناقش مشروعك القادم أو فرصة التعاون",
      info: {
        title: "معلومات الاتصال",
        email: "hello@portfolio.com",
        phone: "+1 (555) 123-4567",
        location: "سان فرانسيسكو، كاليفورنيا",
      },
      form: {
        name: "اسمك",
        email: "بريدك الإلكتروني",
        message: "رسالتك",
        send: "إرسال الرسالة",
        success: "تم إرسال الرسالة بنجاح!",
        error: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      },
      social: {
        title: "تابعني",
        linkedin: "لينكد إن",
        github: "جيت هاب",
        twitter: "تويتر",
        dribbble: "دريبل",
      },
    },
    experience: {
      title: "سجل التغييرات من رحلتي",
      subtitle: "جدول زمني لنموي المهني والمعالم الرئيسية",
      badge: "الجدول الزمني المهني",
    },
  },
  skills: {
    title: "مهاراتي",
    subtitle: "التقنيات والأدوات التي أعمل بها",
    categories: {
      frontend: "تطوير الواجهة الأمامية",
      design: "تصميم واجهة المستخدم",
      backend: "الخلفية والأدوات",
    },
  },
  progress: {
    explored: "{{count}} من {{total}} تم استكشافها",
  },
  faq: {
    recruiter: [
      {
        id: "rec-1",
        question: "ما هي خبرتك؟",
        answer:
          "أتخصص في تصميم واجهة المستخدم وتطوير الواجهة الأمامية، مع خبرة عملية في Next.js و Vite و Angular و React و Shadcn UI و TailwindCSS و Bootstrap، بالإضافة إلى أدوات إبداعية مثل Figma و Sketch و Adobe Suite و AI Prompting.",
      },
      {
        id: "rec-2",
        question: "ما هي الصناعات التي عملت فيها؟",
        answer:
          "لقد صممت وطورت حلولًا للرعاية الصحية والبنوك وتطبيقات التواصل الاجتماعي وحلول الموارد البشرية والمجالات الحكومية والعسكرية وأنظمة الحجز وبوابات الخدمات والتجارة الإلكترونية ومشاريع العلامات التجارية الإبداعية.",
      },
      {
        id: "rec-3",
        question: "هل لديك خبرة في المشاريع التعاونية؟",
        answer:
          "نعم. لقد عملت في وكالات التصميم والشركات الناشئة والجهات التنظيمية الحكومية، بالتعاون الوثيق مع المطورين والمحللين وأصحاب المنتجات وأصحاب المصلحة.",
      },
      {
        id: "rec-4",
        question: "ما هي مهاراتك الأساسية؟",
        answer:
          "نقاط قوتي الرئيسية تشمل تصميم واجهة المستخدم، والعلامات التجارية، وتطوير الواجهة الأمامية، والنماذج التفاعلية، والتخطيطات المتجاوبة، ومكتبات المكونات، ومواقع CMS.",
      },
      {
        id: "rec-5",
        question: "هل يمكنك مشاركة بعض المشاريع الرئيسية؟",
        answer:
          "بعض النقاط البارزة: لوحة معلومات إدارة الموارد البشرية (Next.js + Shadcn)، نظام الحجز والمواعيد، بوابة التنظيم الصحي الحكومية، نظام الحضور الحكومي مع الإجراءات المباشرة، الحلول الرقمية للشرطة والجيش، مواقع التجارة الإلكترونية والأعمال، الصفحات المقصودة التفاعلية والمحفظة الشخصية.",
      },
      {
        id: "rec-6",
        question: "كيف يمكنني الاتصال بك؟",
        answer:
          "يمكنك التواصل معي عبر موقع محفظتي أو LinkedIn أو البريد الإلكتروني أو WhatsApp. يسعدني أيضًا مشاركة سيرتي الذاتية عند الطلب.",
      },
    ],
    client: [
      {
        id: "cli-1",
        question: "ما هي الخدمات التي تقدمها؟",
        answer:
          "أساعد الشركات في تصميم واجهة المستخدم والنماذج الأولية والعلامات التجارية وتطوير الواجهة الأمامية لتحويل المفاهيم إلى منتجات وظيفية وسهلة الاستخدام.",
      },
      {
        id: "cli-2",
        question: "هل يمكنك تخصيص لوحات المعلومات أو أنظمة الحجز؟",
        answer:
          "بالتأكيد. أقوم بإنشاء لوحات معلومات مخصصة ومنصات حجز وبوابات حضور وأدوات سير العمل المصممة خصيصًا لاحتياجات عملك.",
      },
      {
        id: "cli-3",
        question: "هل تعمل أيضًا على العلامات التجارية والهوية؟",
        answer:
          "نعم. أقدم العلامات التجارية وتصميم الشعارات وأدلة أنماط واجهة المستخدم، مما يضمن توافق هوية منتجك مع جمهورك.",
      },
      {
        id: "cli-4",
        question: "ما هي عملية التصميم والتطوير الخاصة بك؟",
        answer:
          "سير عملي: المتطلبات والبحث ← الإطارات السلكية ← نماذج Figma الأولية / مفاهيم العلامة التجارية ← بناء الواجهة الأمامية (Next.js / Shadcn / TailwindCSS).",
      },
      {
        id: "cli-5",
        question: "هل تعمل على مشاريع XR/AR/VR؟",
        answer: "نعم! لقد استكشفت XR (AR/VR/MR) وأخطط لعرض المزيد من التجارب الغامرة في محفظتي.",
      },
      {
        id: "cli-6",
        question: "كيف يمكننا البدء في العمل معًا؟",
        answer:
          "تواصل معي عبر موقع محفظتي أو LinkedIn أو WhatsApp. أنا منفتح على العمل الحر أو العقود أو العمل القائم على المشاريع.",
      },
    ],
    collaborator: [
      {
        id: "col-1",
        question: "ما هي مجموعة التقنيات الخاصة بك؟",
        answer:
          "أستخدم بشكل أساسي Next.js و React و TypeScript و TailwindCSS و Shadcn UI و Framer Motion، وأدوات التصميم مثل Figma و Adobe Suite.",
      },
      {
        id: "col-2",
        question: "هل تعمل على مشاريع مفتوحة المصدر أو جانبية؟",
        answer: "نعم! أستمتع ببناء الأدوات ومجموعات واجهة المستخدم ولوحات المعلومات ومشاريع المحفظة التجريبية.",
      },
      {
        id: "col-3",
        question: "هل أنت مشارك في أي شركات ناشئة؟",
        answer:
          "نعم، أنا جزء من Mouzee.Tech، فريق شركة ناشئة يركز على المنتجات الرقمية وتصميم واجهة المستخدم والعلامات التجارية.",
      },
      {
        id: "col-4",
        question: "ما هي المهارات التي تقدمها للفريق؟",
        answer:
          "أربط بين فجوة التصميم والكود، وأقدم نماذج أولية لواجهة المستخدم وترميز الواجهة الأمامية والعلامات التجارية الإبداعية.",
      },
      {
        id: "col-5",
        question: "هل تتعاون عن بُعد؟",
        answer: "نعم، أنا مرن مع التعاون عن بُعد وسير العمل غير المتزامن وأدوات الفريق الحديثة.",
      },
      {
        id: "col-6",
        question: "أين يمكنني التواصل معك؟",
        answer: "دعنا نتواصل عبر موقع محفظتي أو GitHub أو LinkedIn. أنا دائمًا منفتح على التعاون المثير للاهتمام!",
      },
    ],
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })

export default i18n
