import { cn } from "@/utils/clsx";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import Link from "next/link";

const TechCard = ({
  title,
  description,
  href,
  isOptional = false,
}: {
  title: string;
  description: string;
  href?: string;
  isOptional?: boolean;
}) => {
  const content = (
    <div className="flex flex-grow flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#fffcfb]">{title}</h3>
        {isOptional && (
          <span className="rounded-full bg-[#ffd6b6]/20 px-3 py-1 text-xs font-semibold text-[#ffd6b6] border border-[#ffd6b6]/30">
            Optional
          </span>
        )}
      </div>
      <p className="mt-4 flex-grow text-[#fffcfb]/70 leading-relaxed">
        {description}
      </p>
      {href && (
        <div className="mt-6 inline-flex items-center text-sm font-medium text-[#ea7362] transition-all duration-300 group-hover:text-[#ffd6b6]">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      )}
    </div>
  );

  const cardClasses = cn(
    "group relative h-full rounded-2xl border border-[#ffd6b6]/20 bg-gradient-to-br from-[#26201b]/80 to-[#2a241e]/60 p-8 backdrop-blur-sm transition-all duration-500",
    "hover:border-[#ea7362]/40 hover:shadow-2xl hover:shadow-[#ea7362]/10 hover:-translate-y-1",
    "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-[#ffd6b6]/5 before:to-[#ea7362]/5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        {content}
      </Link>
    );
  }

  return <div className={cardClasses}>{content}</div>;
};

export default function LandingPage() {
  const technologies = [
    {
      title: "Next.js",
      description:
        "The React Framework for building production-grade, full-stack web applications with server-side rendering and static generation.",
      href: "https://nextjs.org",
    },
    {
      title: "NestJS",
      description:
        "A progressive Node.js framework for building efficient, reliable and scalable server-side applications with TypeScript.",
      href: "https://nestjs.com",
    },
    {
      title: "Docker",
      description:
        "Containerize your entire application stack for consistent deployments across any environment and platform.",
      href: "https://www.docker.com/",
    },
    {
      title: "Drizzle ORM",
      description:
        "A lightweight, headless TypeScript ORM that feels like writing pure SQL with full type safety.",
      href: "https://orm.drizzle.team",
      isOptional: true,
    },
    {
      title: "PostgreSQL",
      description:
        "A powerful, open-source relational database that emphasizes reliability, data integrity, and performance.",
      href: "https://www.postgresql.org/",
      isOptional: true,
    },
    {
      title: "End-to-End Type Safety",
      description:
        "Share your database schema and custom types between frontend and backend for maximum reliability and developer experience.",
      isOptional: true,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0e0d0c] text-[#fffcfb] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ffd6b6]/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#ea7362]/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_left,_var(--tw-gradient-stops))] from-[#b74242]/5 via-transparent to-transparent"></div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3a2f26_1px,transparent_1px),linear-gradient(to_bottom,#3a2f26_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>

      {/* Hero Section */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-12 text-center sm:pt-40 sm:pb-16">
        <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-[#ffd6b6]/10 to-[#ea7362]/10 border border-[#ffd6b6]/20 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#ffd6b6]" />
          <span className="text-sm font-medium text-[#ffd6b6]">
            A DX-Focused Monorepo
          </span>
        </div>

        <h1 className="text-6xl font-black text-[#fffcfb] sm:text-8xl leading-tight animate-fade-in-up">
          Next.js + NestJS
          <br />
          <span className="bg-gradient-to-r from-[#ffd6b6] via-[#ea7362] to-[#b74242] bg-clip-text text-transparent">
            Monorepo
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl text-[#fffcfb]/80 leading-relaxed animate-fade-in-up-delay">
          <span className="line-through">A production-ready</span> An
          <span className="font-bold"> accidentally functional</span> starter
          kit featuring a powerful, type-safe stack for building modern web
          applications. Get started in minutes, not hours.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-2">
          <a
            href="https://github.com/Clstialdev/next-nest-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ffd6b6] to-[#ea7362] px-22 py-4 font-bold text-[#26201b] transition-all duration-300 hover:shadow-2xl hover:shadow-[#ea7362]/25 hover:-translate-y-0.5"
          >
            <Github className="w-5 h-5" />
            Get Started
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <TechCard key={tech.title} {...tech} />
          ))}
        </div>
      </section>
    </div>
  );
}
