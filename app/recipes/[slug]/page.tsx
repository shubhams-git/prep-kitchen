import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecipeCompanion } from "@/components/recipe/companion";
import { recipes } from "@/lib/recipes";
export const dynamicParams = false;
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return recipes.map(recipe=>({slug:recipe.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const recipe=recipes.find(r=>r.slug===slug);return {title:recipe?`${recipe.title} | Prep Kitchen`:"Recipe not found | Prep Kitchen",description:"A clear, coordinated cooking plan with scalable ingredients, doneness cues and meal-prep guidance."}}
export default async function RecipePage({params}:Props){const {slug}=await params;const recipe=recipes.find(r=>r.slug===slug);if(!recipe)notFound();return <RecipeCompanion selectedSlug={recipe.slug}/>}
