/** Metadatos SEO de un artículo: Open Graph, fechas y datos estructurados (Article/NewsArticle + migas). */
import { getImage } from 'astro:assets';
import type { SeoProps } from '@/components/seo/Seo.astro';
import { SECTIONS } from '@/config/sections';
import { articleHref, getAuthor, type Article } from './content';
import { articleSchema, breadcrumbSchema, organizationSchema, schemaContext } from './seo';
import { authorUrl, withBase } from './urls';

const DEFAULT_IMAGE = withBase('/og-default.png');

export async function articleSeo(
  article: Article,
  crumbs: { label: string; href?: string }[],
  site: URL | undefined,
): Promise<SeoProps> {
  const ctx = schemaContext(site);
  const { data } = article;
  const path = articleHref(article);
  const author = await getAuthor(data.author.id);

  let ogImage = DEFAULT_IMAGE;
  let schemaImages: string[] = [DEFAULT_IMAGE];

  if (data.cover.image) {
    const [img16x9, img4x3, img1x1] = await Promise.all([
      getImage({ src: data.cover.image, width: 1200, height: 675, fit: 'cover', format: 'jpg' }),
      getImage({ src: data.cover.image, width: 1200, height: 900, fit: 'cover', format: 'jpg' }),
      getImage({ src: data.cover.image, width: 1200, height: 1200, fit: 'cover', format: 'jpg' }),
    ]);
    ogImage = img16x9.src;
    schemaImages = [img16x9.src, img4x3.src, img1x1.src];
  }

  return {
    title: data.seoTitle ?? data.title,
    description: data.description,
    path,
    image: ogImage,
    ...(data.cover.alt ? { imageAlt: data.cover.alt } : {}),
    type: 'article',
    article: {
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      section: SECTIONS[data.section].name,
    },
    schema: [
      articleSchema(
        {
          url: path,
          title: data.title,
          description: data.description,
          image: schemaImages,
          publishedAt: data.publishedAt,
          updatedAt: data.updatedAt,
          section: SECTIONS[data.section].name,
          news: data.type === 'noticia',
          author: {
            id: author.id,
            name: author.data.name,
            kind: author.data.kind,
            url: authorUrl(author.id),
            sameAs: author.data.links.map((l) => l.url),
          },
        },
        ctx,
      ),
      organizationSchema(ctx),
      breadcrumbSchema(crumbs, ctx),
    ],
  };
}
