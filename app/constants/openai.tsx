import {
  faRobot,
  faTasks,
  faGraduationCap,
  faHeartbeat,
  faLanguage,
  faPlane,
  faFilm,
  faBrain,
  faPiggyBank,
  faBriefcase,
  faUtensils,
  faCalendarAlt,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Conversation } from "@prisma/client";

export interface IChatbot extends Partial<Conversation> {
  name: string;
  slug: CHATBOT_KEYS;
  description: string;
  icon: IconDefinition;
}

export enum CHATBOT_KEYS {
  CHATBUDDY_ALEX = "CHATBUDDY_ALEX",
  TASKMASTER_TAYLOR = "TASKMASTER_TAYLOR",
  EDUTUTOR_EMMA = "EDUTUTOR_EMMA",
  FITGUIDE_CHRIS = "FITGUIDE_CHRIS",
  LINGUAMATE_SOPHIA = "LINGUAMATE_SOPHIA",
  TRAVELGENIE_LIAM = "TRAVELGENIE_LIAM",
  FUNFINDER_ELLA = "FUNFINDER_ELLA",
  MINDMENDER_ETHAN = "MINDMENDER_ETHAN",
  FINGUIDE_OLIVIA = "FINGUIDE_OLIVIA",
  CAREERCOACH_AVA = "CAREERCOACH_AVA",
  CHEFMATE_MIA = "CHEFMATE_MIA",
  EVENTGURU_NOAH = "EVENTGURU_NOAH",
}

export const chatbots: IChatbot[] = [
  {
    name: "Alex - ChatBuddy",
    slug: CHATBOT_KEYS.CHATBUDDY_ALEX,
    description:
      "Friendly chat support for any topic. Always here to lend an ear.",
    icon: faRobot,
  },
  {
    name: "Taylor - TaskMaster",
    slug: CHATBOT_KEYS.TASKMASTER_TAYLOR,
    description:
      "Efficient task management, scheduling, and reminders. Let's stay organized.",
    icon: faTasks,
  },
  {
    name: "Emma - EduTutor",
    slug: CHATBOT_KEYS.EDUTUTOR_EMMA,
    description:
      "Study help and concept explanations. Helping you excel academically.",
    icon: faGraduationCap,
  },
  {
    name: "Chris - FitGuide",
    slug: CHATBOT_KEYS.FITGUIDE_CHRIS,
    description:
      "Motivational fitness and wellness tips. Supporting your health journey.",
    icon: faHeartbeat,
  },
  {
    name: "Sophia - LinguaMate",
    slug: CHATBOT_KEYS.LINGUAMATE_SOPHIA,
    description:
      "Language learning support with practice and pronunciation help.",
    icon: faLanguage,
  },
  {
    name: "Liam - TravelGenie",
    slug: CHATBOT_KEYS.TRAVELGENIE_LIAM,
    description:
      "Travel recommendations and itinerary tips for your next adventure.",
    icon: faPlane,
  },
  {
    name: "Ella - FunFinder",
    slug: CHATBOT_KEYS.FUNFINDER_ELLA,
    description: "Entertainment suggestions and interactive fun activities.",
    icon: faFilm,
  },
  {
    name: "Ethan - MindMender",
    slug: CHATBOT_KEYS.MINDMENDER_ETHAN,
    description:
      "Emotional support with mindfulness and stress relief techniques.",
    icon: faBrain,
  },
  {
    name: "Olivia - FinGuide",
    slug: CHATBOT_KEYS.FINGUIDE_OLIVIA,
    description:
      "Budgeting, expenses tracking, and financial advice to reach goals.",
    icon: faPiggyBank,
  },
  {
    name: "Ava - CareerCoach",
    slug: CHATBOT_KEYS.CAREERCOACH_AVA,
    description:
      "Career advice, resume building, and interview preparation support.",
    icon: faBriefcase,
  },
  {
    name: "Mia - ChefMate",
    slug: CHATBOT_KEYS.CHEFMATE_MIA,
    description: "Creative recipe ideas and cooking tips for delicious meals.",
    icon: faUtensils,
  },
  {
    name: "Noah - EventGuru",
    slug: CHATBOT_KEYS.EVENTGURU_NOAH,
    description: "Event planning and organization for memorable gatherings.",
    icon: faCalendarAlt,
  },
];

