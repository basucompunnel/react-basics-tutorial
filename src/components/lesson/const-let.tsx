'use client'

import { ArrowLeft, Code, BookOpen } from "lucide-react";
import Link from "next/link";
import LessonSection from "../common/LessonSection";
import CodeBlock from "../common/CodeBlock";
import LessonQuizCTA from "../common/LessonQuizCTA";

const sections = [
  {
    title: "Introduction",
    icon: BookOpen,
    content: (
      <>
        <p>
          In modern JavaScript (ES6+), <code>const</code> and <code>let</code> are the preferred ways to declare variables.
          They provide better scoping rules compared to the older <code>var</code> keyword.
        </p>
        <ul>
          <li><strong>let</strong>: Allows reassignment of the variable</li>
          <li><strong>const</strong>: Creates a constant that cannot be reassigned</li>
          <li>Both have block scope, unlike <code>var</code> which has function scope</li>
        </ul>
      </>
    )
  },
  {
    title: "Using let",
    content: (
      <>
        <p className="mb-4 text-muted-foreground">
          <code>let</code> allows you to declare variables that can be reassigned.
        </p>
        <CodeBlock
          lines={[
            'let message = "Hello";',
            'console.log(message); // "Hello"',
            '',
            'message = "Hello World";',
            'console.log(message); // "Hello World"'
          ]}
        />
      </>
    )
  },
  {
    title: "Using const",
    content: (
      <>
        <p className="mb-4 text-muted-foreground">
          <code>const</code> creates a constant that cannot be reassigned after initialization.
        </p>
        <CodeBlock
          lines={[
            'const PI = 3.14159;',
            'console.log(PI); // 3.14159',
            '',
            '// This would cause an error:',
            '// PI = 3.14; // TypeError: Assignment to constant variable'
          ]}
        />
        <p className="mt-4 text-muted-foreground">
          <strong>Note:</strong> For objects and arrays, <code>const</code> prevents reassignment of the variable itself,
          but you can still modify the contents.
        </p>
      </>
    )
  },
  {
    title: "Block Scope",
    content: (
      <>
        <p className="mb-4 text-muted-foreground">
          Variables declared with <code>let</code> and <code>const</code> are scoped to the block they're declared in.
        </p>
        <CodeBlock
          lines={[
            'if (true) {',
            '  let blockScoped = "I\'m only accessible here";',
            '  console.log(blockScoped); // "I\'m only accessible here"',
            '}',
            '',
            'console.log(blockScoped); // ReferenceError: blockScoped is not defined'
          ]}
        />
      </>
    )
  },
  {
    title: "Best Practices",
    content: (
      <ul>
        <li>Use <code>const</code> by default for variables that won't be reassigned</li>
        <li>Use <code>let</code> only when you need to reassign the variable</li>
        <li>Avoid <code>var</code> in modern JavaScript - it has confusing scoping rules</li>
        <li>Declare variables at the top of their scope for better readability</li>
      </ul>
    )
  }
];

export default function ConstLetPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/lesson/javascript-basics-for-react"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to JavaScript Basics
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">const and let</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Understanding variable declarations in modern JavaScript
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <LessonSection key={index} title={section.title} icon={section.icon}>
              {section.content}
            </LessonSection>
          ))}
        </div>

        <LessonQuizCTA
          title="Ready to test your understanding?"
          subtitle="5 questions • 2 min"
          quizLink="/lesson/javascript-basics-for-react/const-let/quiz"
          lessonId={1}
          contentSlug="const-let"
        />
      </div>
    </div>
  );
}