export interface ServiceData {
  id: string;
  number: string;
  slug: string;
  title: React.ReactNode;
  titlePlain: string;
  shortDesc: string;
  longDesc: string;
  image: string;
}

export const services: ServiceData[] = [
  {
    id: "strategic-vision",
    number: "01",
    slug: "strategic-vision",
    title: (
      <>
        Strategic <span className="text-gold italic">Vision</span>
      </>
    ),
    titlePlain: "Strategic Vision",
    shortDesc:
      "Aligning your organisation around an AI-informed strategic direction that drives every decision from the top down.",
    longDesc:
      "We work with leadership teams to define a clear strategic vision that accounts for AI's transformative potential. Through structured workshops, stakeholder interviews, and rigorous analysis of where AI can — and should — reshape your operations, we develop a north star that guides investment decisions, talent priorities, and operational focus. The result is an organisation that moves with purpose, not just activity.",
    image: "/images/services/strategic-vision.webp",
  },
  {
    id: "advisory-counsel",
    number: "02",
    slug: "advisory-counsel",
    title: (
      <>
        <span className="text-gold italic">Advisory</span> & Counsel
      </>
    ),
    titlePlain: "Advisory & Counsel",
    shortDesc:
      "Trusted guidance for leadership teams navigating AI adoption, organisational change, and high-stakes decisions.",
    longDesc:
      "Our advisory practice provides ongoing strategic counsel to C-suite leaders and boards navigating AI integration. Whether assessing model risk, evaluating build-vs-buy decisions for AI capabilities, or restructuring teams for an AI-augmented future, we bring an outside perspective grounded in deep industry experience. We challenge assumptions, stress-test plans, and help leaders make decisions they can stand behind.",
    image: "/images/services/advisory-counsel.webp",
  },
  {
    id: "growth-activation",
    number: "03",
    slug: "growth-activation",
    title: (
      <>
        Growth <span className="text-gold italic">Activation</span>
      </>
    ),
    titlePlain: "Growth Activation",
    shortDesc:
      "Turning AI strategy into action with structured programmes that mobilise teams and accelerate outcomes.",
    longDesc:
      "Strategy without execution is a dream. Our Growth Activation programme bridges the gap between AI strategy and performance. We design implementation roadmaps, build AI literacy within teams, and establish the metrics and rhythms needed to sustain momentum. From pilot projects to organisation-wide rollouts, the goal is self-sufficiency — organisations that can execute brilliantly without us.",
    image: "/images/services/growth-activation.webp",
  },
];
