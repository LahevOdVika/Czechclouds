"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Select, SelectItem } from "@heroui/select";

import { ThemeSwitcher } from "./ThemeSwitcher";

export default function NavbarComponent(params: {
  params: { dist: Record<string, any>; lang: string };
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const lang = params.params.lang;
  const dict = params.params.dist;

  const menuItems = [
    { name: dict.navbar.home, href: `/${lang}` },
    { name: dict.navbar.order, href: `/${lang}/order` },
    { name: dict.navbar.contact, href: `/${lang}/contact` },
  ];

  const langs = [
    { key: "en", name: "🇬🇧󠁧" },
    { key: "cs", name: "🇨🇿" },
    { key: "de", name: "🇩🇪" },
  ];

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Czechclouds</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item.name}-${index}`}
            isActive={pathname === item.href}
          >
            <Link
              color={pathname === item.href ? "success" : "foreground"}
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <div className={"flex items-center gap-4"}>
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <Select
            aria-label={"Language"}
            className={"min-w-[70px]"}
            defaultSelectedKeys={[`${lang}`]}
            onSelectionChange={(key) => {
              const currentLocation = window.location.pathname.split("/");

              currentLocation[1] = key.currentKey!;

              window.location.replace(currentLocation.join("/"));
            }}
          >
            {langs.map((lang) => (
              <SelectItem key={lang.key}>{lang.name}</SelectItem>
            ))}
          </Select>
        </div>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              color={pathname === item.href ? "success" : "foreground"}
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
