export function Header() {
  return (
    <header>
      <a href="/" className="logo" aria-label="Tasklane home">
        Tasklane
      </a>
      <nav aria-label="Main">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="/login">Log in</a>
      </nav>
    </header>
  );
}
