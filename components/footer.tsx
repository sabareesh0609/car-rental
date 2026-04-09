export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DriveEase. Car rental POC — Phase 1 layout.
        </p>
      </div>
    </footer>
  );
}
