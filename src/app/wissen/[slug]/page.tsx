import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage, { articleMetadata } from "@/components/pages/ArticlePage";
import { getArticle, getArticles } from "@/lib/articles";

export function generateStaticParams() {
  return getArticles("de").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata("de", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getArticle("de", slug)) notFound();
  return <ArticlePage locale="de" slug={slug} />;
}
