export interface Lesson {
  id: number;
  title: string;
  content: {
    id: number;
    title: string;
    slug: string;
  }[];
  link: string;
  slug: string; // Added for consistency and potential use
}

// Helper function to generate content links
export function getContentLink(lesson: Lesson, content: Lesson['content'][0]): string {
  return `${lesson.link}/${content.slug}`;
}

// Helper function to generate breadcrumb path
export function getBreadcrumbPath(lesson: Lesson, content?: Lesson['content'][0]): string[] {
  const path = [lesson.title];
  if (content) {
    path.push(content.title);
  }
  return path;
}

// Utility to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "JavaScript Basics (for React)",
    slug: "javascript-basics-for-react",
    link: "/lesson/javascript-basics-for-react",
    content: [
      { id: 101, title: "const / let", slug: "const-let" },
      { id: 102, title: "Arrow functions", slug: "arrow-functions" },
      { id: 103, title: "Destructuring", slug: "destructuring" },
      { id: 104, title: "Spread operator", slug: "spread-operator" },
      { id: 105, title: "Array methods (map, filter)", slug: "array-methods-map-filter" },
      { id: 106, title: "Import / export", slug: "import-export" },
      { id: 107, title: "Template literals", slug: "template-literals" }
    ]
  },
  {
    id: 2,
    title: "TypeScript Basics",
    slug: "typescript-basics",
    link: "/lesson/typescript-basics",
    content: [
      { id: 201, title: "Types vs interfaces", slug: "types-vs-interfaces" },
      { id: 202, title: "Typing props", slug: "typing-props" },
      { id: 203, title: "Typing state", slug: "typing-state" },
      { id: 204, title: "Union types", slug: "union-types" },
      { id: 205, title: "Optional props", slug: "optional-props" },
      { id: 206, title: "React.FC", slug: "react-fc" }
    ]
  },
  {
    id: 3,
    title: "JSX & Rendering",
    slug: "jsx-rendering",
    link: "/lesson/jsx-rendering",
    content: [
      { id: 301, title: "JSX rules", slug: "jsx-rules" },
      { id: 302, title: "Expressions vs statements", slug: "expressions-vs-statements" },
      { id: 303, title: "Conditional rendering", slug: "conditional-rendering" },
      { id: 304, title: "Lists & keys", slug: "lists-keys" },
      { id: 305, title: "Fragments", slug: "fragments" }
    ]
  },
  {
    id: 4,
    title: "Functional Components",
    slug: "functional-components",
    link: "/lesson/functional-components",
    content: [
      { id: 401, title: "What a component really is", slug: "what-a-component-really-is" },
      { id: 402, title: "Props", slug: "props" },
      { id: 403, title: "Reusability", slug: "reusability" },
      { id: 404, title: "Composition", slug: "composition" },
      { id: 405, title: "Default props patterns", slug: "default-props-patterns" }
    ]
  },
  {
    id: 5,
    title: "Class Components (for understanding legacy)",
    slug: "class-components-legacy",
    link: "/lesson/class-components-legacy",
    content: [
      { id: 501, title: "Class syntax", slug: "class-syntax" },
      { id: 502, title: "render()", slug: "render" },
      { id: 503, title: "this.props / this.state", slug: "this-props-this-state" },
      { id: 504, title: "Lifecycle overview", slug: "lifecycle-overview" },
      { id: 505, title: "Why functional components replaced them", slug: "why-functional-components-replaced-them" }
    ]
  },
  {
    id: 6,
    title: "State & Events",
    slug: "state-events",
    link: "/lesson/state-events",
    content: [
      { id: 601, title: "useState", slug: "use-state" },
      { id: 602, title: "Event handling", slug: "event-handling" },
      { id: 603, title: "Controlled inputs", slug: "controlled-inputs" },
      { id: 604, title: "Updating state correctly", slug: "updating-state-correctly" },
      { id: 605, title: "State immutability", slug: "state-immutability" }
    ]
  },
  {
    id: 7,
    title: "Effects & Lifecycle",
    slug: "effects-lifecycle",
    link: "/lesson/effects-lifecycle",
    content: [
      { id: 701, title: "useEffect", slug: "use-effect" },
      { id: 702, title: "Dependency array rules", slug: "dependency-array-rules" },
      { id: 703, title: "Cleanup functions", slug: "cleanup-functions" },
      { id: 704, title: "Common infinite loop mistakes", slug: "common-infinite-loop-mistakes" },
      { id: 705, title: "Mapping to class lifecycle methods", slug: "mapping-to-class-lifecycle-methods" }
    ]
  },
  {
    id: 8,
    title: "Props vs State vs Derived State",
    slug: "props-state-derived",
    link: "/lesson/props-state-derived",
    content: [
      { id: 801, title: "Data flow", slug: "data-flow" },
      { id: 802, title: "Lifting state up", slug: "lifting-state-up" },
      { id: 803, title: "When NOT to use state", slug: "when-not-to-use-state" },
      { id: 804, title: "Derived state anti-patterns", slug: "derived-state-anti-patterns" }
    ]
  },
  {
    id: 9,
    title: "Conditional & Dynamic UI",
    slug: "conditional-dynamic-ui",
    link: "/lesson/conditional-dynamic-ui",
    content: [
      { id: 901, title: "Conditional rendering patterns", slug: "conditional-rendering-patterns" },
      { id: 902, title: "Dynamic classes", slug: "dynamic-classes" },
      { id: 903, title: "Rendering based on permissions", slug: "rendering-based-on-permissions" },
      { id: 904, title: "Feature flags (intro-level)", slug: "feature-flags-intro-level" }
    ]
  },
  {
    id: 10,
    title: "Forms Basics",
    slug: "forms-basics",
    link: "/lesson/forms-basics",
    content: [
      { id: 1001, title: "Controlled vs uncontrolled", slug: "controlled-vs-uncontrolled" },
      { id: 1002, title: "Handling multiple inputs", slug: "handling-multiple-inputs" },
      { id: 1003, title: "Validation basics", slug: "validation-basics" },
      { id: 1004, title: "Submission flow", slug: "submission-flow" }
    ]
  },
  {
    id: 11,
    title: "Refs & DOM Access",
    slug: "refs-dom-access",
    link: "/lesson/refs-dom-access",
    content: [
      { id: 1101, title: "useRef", slug: "use-ref" },
      { id: 1102, title: "When refs are necessary", slug: "when-refs-are-necessary" },
      { id: 1103, title: "Focusing inputs", slug: "focusing-inputs" },
      { id: 1104, title: "Measuring DOM", slug: "measuring-dom" },
      { id: 1105, title: "What NOT to do with refs", slug: "what-not-to-do-with-refs" }
    ]
  },
  {
    id: 12,
    title: "Component Reusability & Structure",
    slug: "component-reusability-structure",
    link: "/lesson/component-reusability-structure",
    content: [
      { id: 1201, title: "Reusable components", slug: "reusable-components" },
      { id: 1202, title: "Props design", slug: "props-design" },
      { id: 1203, title: "Folder structure", slug: "folder-structure" },
      { id: 1204, title: "Presentational vs container components", slug: "presentational-vs-container-components" },
      { id: 1205, title: "When to split components", slug: "when-to-split-components" }
    ]
  }
];