import { assetPath } from "@/lib/assets";
import Link from "next/link";
import { Clock3, Leaf, Utensils, Layers3 } from "lucide-react";
import { recipes } from "@/lib/recipes";
import { Header } from "@/components/recipe/header";

export default function Home() {
  return <><Header /><main className="home page-width">
    <div className="collection-heading"><div><p className="eyebrow">YOUR PERSONAL COOKBOOK</p><h1>Your recipes<span className="title-dot">.</span></h1><p className="lead">Big flavour. Plenty of protein. A plan for every step.</p></div><span className="collection-count">{String(recipes.length).padStart(2,"0")} recipe</span></div>
    <div className="recipe-grid">{recipes.map(recipe => <Link className="recipe-card" key={recipe.slug} href={`/recipes/${recipe.slug}`}>
      <div className="card-photo"><img src={assetPath(recipe.image)} alt="Peri-peri soy chunks, fluffy basmati rice and roasted broccoli with a creamy sauce" width="1536" height="1024" fetchPriority="high"/><span className="photo-label"><Leaf size={15}/> High protein · Vegetarian</span></div>
      <div className="card-copy"><p className="eyebrow">MEAL-PREP BATCH · 01</p><h2>{recipe.title}</h2><p className="card-description">Browning, spice and a creamy kick. The kind of lunch you look forward to.</p><div className="card-meta"><span><Clock3 size={18}/>55–70 min</span><span><Layers3 size={18}/>{recipe.defaultServings} containers</span></div><div className="card-nutrition"><div><strong>~{recipe.nutrition.greek.protein}<span>g</span></strong><small>protein / meal</small></div><div><strong>~{recipe.nutrition.greek.calories}</strong><small>kcal / meal</small></div></div><span className="card-action"><Utensils size={18}/> Open recipe</span></div>
    </Link>)}</div><p className="collection-footer">A small collection, cooked well.</p>
  </main></>;
}
