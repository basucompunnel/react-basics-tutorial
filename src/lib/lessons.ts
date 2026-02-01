export interface Lesson {
  id: number;
  title: string;
  content: { id: number; title: string }[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "JavaScript Basics (for React)",
    content: [
      { id: 101, title: "const / let" },
      { id: 102, title: "Arrow functions" },
      { id: 103, title: "Destructuring" },
      { id: 104, title: "Spread operator" },
      { id: 105, title: "Array methods (map, filter)" },
      { id: 106, title: "Import / export" },
      { id: 107, title: "Template literals" }
    ]
  },
  {
    id: 2,
    title: "TypeScript Basics",
    content: [
      { id: 201, title: "Types vs interfaces" },
      { id: 202, title: "Typing props" },
      { id: 203, title: "Typing state" },
      { id: 204, title: "Union types" },
      { id: 205, title: "Optional props" },
      { id: 206, title: "React.FC" }
    ]
  },
  {
    id: 3,
    title: "JSX & Rendering",
    content: [
      { id: 301, title: "JSX rules" },
      { id: 302, title: "Expressions vs statements" },
      { id: 303, title: "Conditional rendering" },
      { id: 304, title: "Lists & keys" },
      { id: 305, title: "Fragments" }
    ]
  },
  {
    id: 4,
    title: "Functional Components",
    content: [
      { id: 401, title: "What a component really is" },
      { id: 402, title: "Props" },
      { id: 403, title: "Reusability" },
      { id: 404, title: "Composition" },
      { id: 405, title: "Default props patterns" }
    ]
  },
  {
    id: 5,
    title: "Class Components (for understanding legacy)",
    content: [
      { id: 501, title: "Class syntax" },
      { id: 502, title: "render()" },
      { id: 503, title: "this.props / this.state" },
      { id: 504, title: "Lifecycle overview" },
      { id: 505, title: "Why functional components replaced them" }
    ]
  },
  {
    id: 6,
    title: "State & Events",
    content: [
      { id: 601, title: "useState" },
      { id: 602, title: "Event handling" },
      { id: 603, title: "Controlled inputs" },
      { id: 604, title: "Updating state correctly" },
      { id: 605, title: "State immutability" }
    ]
  },
  {
    id: 7,
    title: "Effects & Lifecycle",
    content: [
      { id: 701, title: "useEffect" },
      { id: 702, title: "Dependency array rules" },
      { id: 703, title: "Cleanup functions" },
      { id: 704, title: "Common infinite loop mistakes" },
      { id: 705, title: "Mapping to class lifecycle methods" }
    ]
  },
  {
    id: 8,
    title: "Props vs State vs Derived State",
    content: [
      { id: 801, title: "Data flow" },
      { id: 802, title: "Lifting state up" },
      { id: 803, title: "When NOT to use state" },
      { id: 804, title: "Derived state anti-patterns" }
    ]
  },
  {
    id: 9,
    title: "Conditional & Dynamic UI",
    content: [
      { id: 901, title: "Conditional rendering patterns" },
      { id: 902, title: "Dynamic classes" },
      { id: 903, title: "Rendering based on permissions" },
      { id: 904, title: "Feature flags (intro-level)" }
    ]
  },
  {
    id: 10,
    title: "Forms Basics",
    content: [
      { id: 1001, title: "Controlled vs uncontrolled" },
      { id: 1002, title: "Handling multiple inputs" },
      { id: 1003, title: "Validation basics" },
      { id: 1004, title: "Submission flow" }
    ]
  },
  {
    id: 11,
    title: "Refs & DOM Access",
    content: [
      { id: 1101, title: "useRef" },
      { id: 1102, title: "When refs are necessary" },
      { id: 1103, title: "Focusing inputs" },
      { id: 1104, title: "Measuring DOM" },
      { id: 1105, title: "What NOT to do with refs" }
    ]
  },
  {
    id: 12,
    title: "Component Reusability & Structure",
    content: [
      { id: 1201, title: "Reusable components" },
      { id: 1202, title: "Props design" },
      { id: 1203, title: "Folder structure" },
      { id: 1204, title: "Presentational vs container components" },
      { id: 1205, title: "When to split components" }
    ]
  }
];