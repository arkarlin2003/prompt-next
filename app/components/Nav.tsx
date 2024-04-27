"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { CiMenuFries } from "react-icons/ci";

type Props = {};
const Nav = (props: Props) => {
  const { data: session } = useSession();
  const [providers, setProvider] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProvider(res);
    })();
  }, [session]);
  return (
    <nav className=" h-16 p-2 mb-10 flex items-center justify-between">
      <div>
        <Image
          src="/assets/images/logo.svg"
          width={40}
          height={40}
          alt="logo"
        />
      </div>
      <div>
        <div className="space-x-2 hidden md:flex ">
          {session?.user ? (
            <div className="space-x-3 flex items-center">
              <button className="py-1 md:py-1.5 bg-black text-white shadow hover:shadow-sm duration-300  text-sm px-4 border rounded-3xl">
                Create Prompts
              </button>
              <button
                onClick={signOut}
                className="py-1 md:py-1.5 shadow hover:shadow-sm duration-300 hover:bg-slate-100 text-sm px-4 border rounded-3xl"
              >
                Sign Out
              </button>
              <div>
                <Image
                  src={session?.user.image}
                  className=" rounded-full"
                  width={35}
                  height={35}
                  alt="avatar"
                />
              </div>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                    className="py-1 md:py-1.5 shadow hover:shadow-sm duration-300 hover:bg-slate-100 text-sm px-4 border rounded-3xl"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
        {/* mobile */}
        <div className="flex md:hidden">
          <Menu>
            <MenuHandler>
              <div>
                <CiMenuFries size={23} className=" cursor-pointer" />
              </div>
            </MenuHandler>
            <MenuList>
              {session?.user ? (
                <>
                  <MenuItem className="py-1.5 mb-2 text-center md:py-1.5   shadow hover:shadow-sm hover:bg-slate-100 duration-300  text-sm px-4 border rounded-3xl">
                    Create Prompts
                  </MenuItem>
                  <MenuItem
                    onClick={signOut}
                    className="py-1.5 text-center md:py-1.5 bg-black text-white shadow hover:shadow-sm duration-300  text-sm px-4 border rounded-3xl"
                  >
                    Sign Out
                  </MenuItem>
                </>
              ) : (
                <>
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <MenuItem
                        className="py-1.5 mb-2 text-center md:py-1.5   shadow hover:shadow-sm hover:bg-slate-100 duration-300  text-sm px-4 border rounded-3xl"
                        onClick={() => signIn(provider.id)}
                        key={provider.name}
                      >
                        Sign In
                      </MenuItem>
                    ))}
                </>
              )}
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
