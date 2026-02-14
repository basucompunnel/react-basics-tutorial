import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface LessonSectionProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

const LessonSection: React.FC<LessonSectionProps> = ({ title, icon: Icon, children }) => (
  <Card className="rounded-none">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5" />}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="prose prose-neutral dark:prose-invert text-[20px] md:text-[22px] lg:text-[24px] leading-relaxed md:leading-loose space-y-4">
      {children}
    </CardContent>
  </Card>
);

export default LessonSection;