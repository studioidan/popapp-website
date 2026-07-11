import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מאמרים | PopApp - פיתוח תוכנה, AI ואוטומציה לעסקים",
  description:
    "מאמרים על הטמעת AI, אוטומציה עסקית ופיתוח תוכנה - תובנות מהשטח מעידן בן שמעון, מהנדס תוכנה עם ניסיון של מעל 15 שנה.",
  alternates: { canonical: "https://popapp.co.il/articles" },
};

const colors = {
  bg: "#0a0e14",
  card: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
  cyan: "#22d3ee",
  orange: "#f97316",
  text: "#e5e7eb",
  textDim: "#9ca3af",
};

type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
};

const articles: ArticleMeta[] = [
  {
    slug: "hatmaat-ai-veautomatzia-be-asakim",
    title: "הטמעת AI ואוטומציות בעסקים: למה מהנדס תוכנה מייצר פי כמה ערך",
    excerpt:
      "ההבדל בין כלי אוטומציה מוכן מראש לבין פתרון AI שנבנה במיוחד עבור העסק שלכם - ולמה זה משנה את התוצאה.",
    tag: "AI ואוטומציה",
    readTime: "7 דקות קריאה",
  },
];

export default function ArticlesIndexPage() {
  return (
    <main
      dir="rtl"
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        padding: "96px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
            gap: 16,
          }}
        >
          <Link
            href="/"
            style={{ color: colors.text, fontSize: 14, textDecoration: "none", fontWeight: 600 }}
          >
            ← דף הבית
          </Link>
          <Link
            href="/#contact"
            style={{
              color: colors.bg,
              background: colors.cyan,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              padding: "8px 18px",
              borderRadius: 999,
            }}
          >
            צור קשר
          </Link>
        </div>
        <p
          style={{
            color: colors.orange,
            fontSize: 13,
            letterSpacing: 1,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          בלוג
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, margin: "0 0 40px" }}>
          מאמרים
        </h1>

        <div style={{ display: "grid", gap: 20 }}>
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              style={{
                display: "block",
                padding: 28,
                borderRadius: 18,
                background: colors.card,
                border: `1px solid ${colors.border}`,
                backdropFilter: "blur(12px)",
                textDecoration: "none",
                color: colors.text,
              }}
            >
              <p style={{ color: colors.cyan, fontSize: 13, fontWeight: 600, margin: "0 0 10px" }}>
                {a.tag} · {a.readTime}
              </p>
              <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 10px" }}>{a.title}</h2>
              <p style={{ color: colors.textDim, margin: 0, fontSize: 16, lineHeight: 1.7 }}>
                {a.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
