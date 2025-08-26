import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-10 row-start-2 items-center sm:items-start text-center sm:text-left">
        {/* Logo */}
        <Image
          className="w-16 h-16 sm:w-[72px] sm:h-[72px]"
          src="/favicon-96x96.png"
          alt="ScreenUI logo"
          width={72}
          height={72}
          priority
        />

        {/* Welcome Text */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome to your <span className="text-blue-600">ScreenUI</span> App 🚀
          </h1>
          <p className="text-muted-foreground max-w-md">
            This is a <strong>Next.js + TypeScript + Tailwind</strong> project 
            pre-configured with <strong>ScreenUI</strong>.  
            Start editing and use ready-made components right away!
          </p>
        </div>

        {/* Getting Started Steps */}
        <ol className="list-inside list-decimal text-sm/6 font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Open{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>{" "}
            and replace content with your own.
          </li>
          <li className="tracking-[-.01em]">
            Explore and copy components from{" "}
            <a
              href="https://screenui.com/library"
              className="underline underline-offset-2 hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              ScreenUI Library
            </a>
            .
          </li>
          <li className="tracking-[-.01em]">
            Follow{" "}
            <a
              href="https://screenui.com/docs"
              className="underline underline-offset-2 hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>{" "}
            for full guides and best practices.
          </li>
        </ol>

        {/* Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-5 sm:w-auto"
            href="https://screenui.com/library"
            target="_blank"
            rel="noopener noreferrer"
          >
            ✨ Try a component
          </a>
          <a
            className="rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-sm sm:text-base h-10 sm:h-12 px-5 w-full sm:w-auto md:w-[158px]"
            href="https://screenui.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            📘 View Docs
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-muted-foreground">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://screenui.com/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="w-4 h-4 dark:invert"
            aria-hidden
            src="/favicon-96x96.png"
            alt="Docs icon"
            width={16}
            height={16}
          />
          Get Started
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://screenui.com/library"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="w-4 h-4 dark:invert"
            aria-hidden
            src="/favicon-96x96.png"
            alt="Components icon"
            width={16}
            height={16}
          />
          Components
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://screenui.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="w-4 h-4 dark:invert"
            aria-hidden
            src="/favicon-96x96.png"
            alt="ScreenUI icon"
            width={16}
            height={16}
          />
          Visit screenui.com →
        </a>
      </footer>
    </div>
  );
}
