import { User } from "@clerk/nextjs/server";
import Link from "next/link";
import Icons from "../global/icons";
import MaxWidthWrapper from "../global/max-width-wrapper";
import { buttonVariants } from "../ui/button";
import UserAccount from "../user-account";
import Image from "next/image";

interface Props {
  user: User | null;
}

const Navbar = ({ user }: Props) => {
  return (
    <header className="sticky top-0 inset-x-0 w-full h-14  md:h-20 border-b border-border/40 bg-background/50 backdrop-blur-md z-50">
      <MaxWidthWrapper>
        <div className="flex items-center  justify-between w-full h-full">
          <div className="flex ">
            <Link
              href="/"
              className="flex items-center font-semibold gap-1 text-xl"
            >
              <Image
                src="/images/brain-hi.png"
                alt="Dashboard"
                width={70}
                height={70}
                quality={100}
                priority
                className="mb-1"
              />
                   <span className="bg-gradient-to-r from-primary to-amber-500 text-transparent bg-clip-text">

              MIND LUXE AI
                   </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({ size: "sm" })}
                >
                  Dashboard
                </Link>
                <UserAccount />
              </>
            ) : (
              <>
              
                <Link
                  href="/about"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  About Us
                </Link>
                <Link
                  href="/privacy"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Privacy
                </Link>
                <Link
                  href="/helplines"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Helpline
                </Link>
                <Link
                  href="/auth/signin"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className={buttonVariants({ size: "sm" })}
                >
                  Start for free
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
