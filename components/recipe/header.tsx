import Link from "next/link";
import { CookingPot, BookOpen } from "lucide-react";
export function Header(){return <header className="site-header"><div className="page-width header-inner"><Link href="/" className="brand" aria-label="Prep Kitchen home"><span className="brand-mark"><CookingPot size={23}/></span><span>prep<span className="brand-light"> kitchen</span></span></Link><Link href="/" className="header-link"><BookOpen size={18}/><span>My recipes</span></Link></div></header>}
