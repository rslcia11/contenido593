<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="es">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> • Feed RSS</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <style>
          :root {
            --bg: #070a12;
            --surface: #0e1526;
            --surface-hover: #151e36;
            --border: #1e293b;
            --text: #f8fafc;
            --text-muted: #94a3b8;
            --accent: #00f0ff;
            --brand: #eef200;
            --font: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background: var(--bg);
            color: var(--text);
            font-family: var(--font);
            line-height: 1.5;
            padding: 32px 16px;
          }
          .container {
            max-width: 840px;
            margin: 0 auto;
          }
          header {
            margin-bottom: 28px;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--border);
          }
          .brand-badge {
            display: inline-block;
            background: var(--brand);
            color: #000;
            font-weight: 900;
            font-size: 0.8125rem;
            letter-spacing: 0.05em;
            padding: 4px 10px;
            border-radius: 6px;
            margin-bottom: 12px;
            text-transform: uppercase;
          }
          h1 {
            font-size: clamp(1.75rem, 4vw, 2.5rem);
            font-weight: 900;
            letter-spacing: -0.02em;
            line-height: 1.15;
            margin-bottom: 8px;
          }
          .description {
            color: var(--text-muted);
            font-size: 1.0625rem;
          }
          .info-box {
            background: rgba(0, 240, 255, 0.06);
            border: 1px solid rgba(0, 240, 255, 0.25);
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 32px;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .info-box strong {
            color: var(--accent);
            font-size: 0.9375rem;
          }
          .info-box p {
            color: var(--text-muted);
            font-size: 0.875rem;
          }
          .info-box code {
            background: rgba(0, 0, 0, 0.4);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.8125rem;
            color: #fff;
          }
          .actions {
            margin-top: 6px;
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }
          .btn {
            display: inline-block;
            background: var(--surface);
            color: var(--text);
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.875rem;
            border: 1px solid var(--border);
            transition: all 0.2s ease;
          }
          .btn:hover {
            border-color: var(--accent);
            color: var(--accent);
          }
          .articles {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          article {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 20px;
            transition: transform 0.2s ease, border-color 0.2s ease;
          }
          article:hover {
            transform: translateY(-2px);
            border-color: var(--accent);
          }
          .meta {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
          }
          .category {
            font-size: 0.6875rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--accent);
            background: rgba(0, 240, 255, 0.1);
            padding: 2px 8px;
            border-radius: 4px;
            border: 1px solid rgba(0, 240, 255, 0.25);
          }
          .date {
            font-size: 0.8125rem;
            color: var(--text-muted);
          }
          article h2 {
            font-size: 1.25rem;
            font-weight: 800;
            line-height: 1.25;
            margin-bottom: 8px;
          }
          article h2 a {
            color: var(--text);
            text-decoration: none;
            transition: color 0.2s ease;
          }
          article h2 a:hover {
            color: var(--accent);
          }
          article p {
            color: var(--text-muted);
            font-size: 0.9375rem;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <span class="brand-badge">contenido593 • Feed RSS</span>
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p class="description"><xsl:value-of select="/rss/channel/description"/></p>
          </header>

          <div class="info-box">
            <strong>¿Qué es esta página?</strong>
            <p>
              Este es el <strong>feed RSS oficial</strong> de <strong>contenido593</strong>. Si utilizas un lector de noticias (como Feedly, Inoreader, Apple News o NetNewsWire), copia la dirección de esta página (<code>https://contenido593.com/rss.xml</code>) y agrégala a tu lector para recibir nuestras guías y noticias automáticamente.
            </p>
            <div class="actions">
              <a class="btn" href="/">Volver a la portada</a>
            </div>
          </div>

          <div class="articles">
            <xsl:for-each select="/rss/channel/item">
              <article>
                <div class="meta">
                  <xsl:if test="category">
                    <span class="category"><xsl:value-of select="category"/></span>
                  </xsl:if>
                  <span class="date"><xsl:value-of select="pubDate"/></span>
                </div>
                <h2>
                  <a href="{link}" target="_blank">
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <p><xsl:value-of select="description"/></p>
              </article>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
