export function applyTokensToDom(tokens) {
  if (!tokens) return;

  const root = document.documentElement;

  root.style.setProperty('--color-primary', tokens.colors.primary);
  root.style.setProperty('--color-secondary', tokens.colors.secondary);
  root.style.setProperty('--color-accent', tokens.colors.accent);
  root.style.setProperty('--color-background', tokens.colors.background);
  root.style.setProperty('--color-surface', tokens.colors.surface);
  root.style.setProperty('--color-text', tokens.colors.text);
  root.style.setProperty('--color-muted-text', tokens.colors.mutedText);

  root.style.setProperty('--font-heading', tokens.typography.headingFont);
  root.style.setProperty('--font-body', tokens.typography.bodyFont);
  root.style.setProperty('--font-size-base', tokens.typography.baseSize);

  root.style.setProperty('--font-size-h1', tokens.typography.scale.h1);
  root.style.setProperty('--font-size-h2', tokens.typography.scale.h2);
  root.style.setProperty('--font-size-h3', tokens.typography.scale.h3);
  root.style.setProperty('--font-size-body', tokens.typography.scale.body);
  root.style.setProperty('--font-size-caption', tokens.typography.scale.caption);

  root.style.setProperty('--spacing-unit', `${tokens.spacing.unit}px`);

  root.style.setProperty('--radius-sm', tokens.radii.sm);
  root.style.setProperty('--radius-md', tokens.radii.md);
  root.style.setProperty('--radius-lg', tokens.radii.lg);

  root.style.setProperty('--shadow-sm', tokens.shadows.sm);
  root.style.setProperty('--shadow-md', tokens.shadows.md);
}