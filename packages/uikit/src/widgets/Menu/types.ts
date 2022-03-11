import { ElementType, ReactElement } from "react";
import { FooterLinkType } from "../../components/Footer/types";
import { SubMenuItemsType } from "../../components/SubMenuItems/types";
import { Colors } from "../../theme/types";
import { MenuItemsType } from "../../components/MenuItems/types";

export interface Language {
  code: string;
  language: string;
  locale: string;
}

export interface LinkStatus {
  text: string;
  color: keyof Colors;
}

export interface PushedProps {
  isPushed: boolean;
  pushNav: (isPushed: any) => void;
}

export interface MenuSubEntry {
  label: string;
  href: string;
  target?: string;
  calloutClass?: string;
}
export interface MenuEntry {
  label: string;
  icon: string;
  items?: MenuSubEntry[];
  href?: string;
  att?: string;
  target?: string;
  calloutClass?: string;
  initialOpenState?: boolean;
}

export interface PanelProps {
  isDark: boolean;
  cakePriceUsd?: number;
  currentLang: string;
  langs: Language[];
  links: Array<MenuItemsType>;
  setLang: (lang: Language) => void;
  toggleTheme: (isDark: boolean) => void;
}

export interface NavProps extends PanelProps {
  linkComponent?: ElementType;
  userMenu?: ReactElement;
  banner?: ReactElement;
  globalMenu?: ReactElement;
  // links: Array<MenuItemsType>;
  subLinks: Array<SubMenuItemsType>;
  footerLinks: Array<FooterLinkType>;
  activeItem: string;
  activeSubItem: string;
  // isDark: boolean;
  // toggleTheme: (isDark: boolean) => void;
  // cakePriceUsd?: number;
  // currentLang: string;
  buyCakeLabel: string;
  // langs: Language[];
  // setLang: (lang: Language) => void;
}
