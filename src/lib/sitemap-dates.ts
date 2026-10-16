import fs from 'node:fs';
import path from 'node:path';

/**
 * Escanea los artículos y páginas para asociar a cada URL su fecha de última modificación real.
 * Si una página tiene `updatedAt`, se usa esa fecha; si no, `publishedAt`.
 * Esto cumple con la directriz de Google Search Central de que `<lastmod>` sea veraz y preciso.
 */
export function buildSitemapDates(baseDir: string = process.cwd()): Map<string, Date> {
  const dates = new Map<string, Date>();

  // 1. Artículos
  const articlesDir = path.join(baseDir, 'src/content/articles');
  if (fs.existsSync(articlesDir)) {
    const scanArticles = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanArticles(full);
        } else if (entry.name.endsWith('.mdx')) {
          const content = fs.readFileSync(full, 'utf8');
          const slug = entry.name.replace(/\.mdx$/, '');
          const sectionMatch = content.match(/^section:\s*([a-z0-9-]+)/m);
          const gameMatch = content.match(/^game:\s*([a-z0-9-]+)/m);
          const updatedMatch = content.match(/^updatedAt:\s*([^\r\n]+)/m);
          const publishedMatch = content.match(/^publishedAt:\s*([^\r\n]+)/m);

          const dateStr = updatedMatch?.[1]?.trim() ?? publishedMatch?.[1]?.trim();
          if (dateStr) {
            const date = new Date(dateStr.replace(/^['"]|['"]$/g, ''));
            if (!isNaN(date.getTime())) {
              const section = sectionMatch?.[1];
              const game = gameMatch?.[1];
              let urlPath = '';
              if (section === 'juegos' && game) {
                urlPath = `/juegos/${game}/${slug}/`;
              } else if (section) {
                urlPath = `/${section}/${slug}/`;
              }
              if (urlPath) {
                dates.set(urlPath, date);
              }
            }
          }
        }
      }
    };
    scanArticles(articlesDir);
  }

  // 2. Páginas institucionales y legales
  const pagesDir = path.join(baseDir, 'src/content/pages');
  if (fs.existsSync(pagesDir)) {
    for (const entry of fs.readdirSync(pagesDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.mdx')) {
        const full = path.join(pagesDir, entry.name);
        const content = fs.readFileSync(full, 'utf8');
        const slug = entry.name.replace(/\.mdx$/, '');
        const updatedMatch = content.match(/^updatedAt:\s*([^\r\n]+)/m);
        if (updatedMatch?.[1]) {
          const date = new Date(updatedMatch[1].trim().replace(/^['"]|['"]$/g, ''));
          if (!isNaN(date.getTime())) {
            dates.set(`/${slug}/`, date);
          }
        }
      }
    }
  }

  return dates;
}
