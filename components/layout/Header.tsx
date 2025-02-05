import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="p-5 text-white bg-blue-900">
            <div className="container mx-auto flex items-center gap-4">
                <Link href="/">
                    <Image src="/logo-white.png"
                           width={100} 
                           height={30} 
                           alt="MedExpress" 
                           className="h-8 w-auto tablet:h-10"
                    />
                </Link>
            </div>
        </header>
    );
}

export default Header