"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold">
            Blog<span className="text-purple-500">ged</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <Link className={buttonVariants({ variant: "ghost" })} href={"/"}>
            Home
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href={"/blog"}>
            Blog
          </Link>
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href={"/create"}
          >
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isLoading ? null : isAuthenticated ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.push("/");
                  },
                  onError: () => {
                    toast.error("There was an error logging out");
                  },
                },
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href={"/auth/sign-up"}
            >
              Sign Up
            </Link>
            <Link className={buttonVariants()} href={"/auth/login"}>
              Login
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};
