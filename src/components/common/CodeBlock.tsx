interface CodeBlockProps {
  lines: string[];
}

const CodeBlock: React.FC<CodeBlockProps> = ({ lines }) => (
  <div className="bg-muted rounded-none p-6 overflow-x-auto">
    <pre className="text-lg">
      <code>{lines.join('\n')}</code>
    </pre>
  </div>
);

export default CodeBlock;