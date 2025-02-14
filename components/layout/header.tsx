import ThemeSwitch from "../theme-switch";

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-0 z-10 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
      <nav className="flex items-center justify-between px-16 py-4">
        <span className="text-2xl font-bold">SongLa</span>
        <ThemeSwitch />
      </nav>
    </div>
  );
}
