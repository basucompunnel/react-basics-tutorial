"use client";
import { LessonTemplate, LessonPageData } from "@/components/common/lesson-template";

const jsBasicsLesson: LessonPageData = {
  id: 1,
  title: "JavaScript Basics (for React)",
  description: "Master the essential JavaScript concepts needed for React development.",
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
};

export default function JavaScriptBasicsForReactPage() {
  return <LessonTemplate data={jsBasicsLesson} />;
}