import Link from "next/link";
import footerLinks from "@/data/footerLinks";

const Footer = () => {
    if (!footerLinks || footerLinks.length < 1) return null;

    const numberOfGroups = new Set(footerLinks.map(link => link.group)).size;

    return (
        <footer className="border-t border-gray-200">
            <div className="flex gap-6 flex-wrap container mx-auto p-5 flex-col md:flex-row">
                {Array.from({ length: numberOfGroups }).map((_, i) => (
                <div key={`footer-column-${i}`} className="min-w-[200px]">
                    <ul className="flex flex-col gap-y-2">
                        {footerLinks?.filter(link => link.group === `column-${i + 1}`)?.map((link, i) => (
                            <li key={`footer-link-${link.text}`}>
                                <Link href={link.url} className="text-sm text-gray-500 hover:text-gray-900 hover:pl-2 transition-color duration-200">
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                ))}
            </div>
        </footer>
    );
}

export default Footer