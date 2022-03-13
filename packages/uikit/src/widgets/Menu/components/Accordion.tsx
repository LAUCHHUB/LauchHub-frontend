import React, { ElementType, ReactNode, useState } from "react";
import styled from "styled-components";
import { MENU_ENTRY_HEIGHT } from "../config";
import { LinkLabel, MenuEntry } from "./MenuEntry";
import { PushedProps } from "../types";
import { ArrowDropDownIcon, ArrowDropUpIcon } from "../../../components/Svg";

interface Props extends PushedProps {
  label: string;
  icon?: ElementType<any>;
  initialOpenState?: boolean;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
  position: relative;

  // &.active > div:first-child {
  //   &:before {
  //     content: "";
  //     position: absolute;
  //     bottom: -2px;
  //     right: -2px;
  //     width: 80px;
  //     height: 100px;
  //     border-radius: 50%;
  //     box-shadow: 47px 46px 0 0 ${({ theme }) => theme.colors.background};
  //   }
  // }
`;

const AccordionContent = styled.div<{ isOpen: boolean; isPushed: boolean; maxHeight: number }>`
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : 0)};
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  border-color: ${({ isOpen, isPushed }) => (isOpen && isPushed ? "rgba(133, 133, 133, 0.1)" : "transparent")};
  border-style: solid;
  border-width: 1px 0;
`;

const Accordion: React.FC<Props> = ({
  label,
  icon,
  isPushed,
  pushNav,
  initialOpenState = false,
  children,
  className,
  isActive,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpenState);

  const handleClick = () => {
    if (isPushed) {
      setIsOpen((prevState) => !prevState);
    } else {
      pushNav(true);
      setIsOpen(true);
    }
  };

  const IconElement = icon;

  return (
    <Container className={isActive ? "active" : ""}>
      <MenuEntry onClick={handleClick} className={className} isActive={isActive}>
        <IconElement />
        <LinkLabel isPushed={isPushed}>{label}</LinkLabel>
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </MenuEntry>
      <AccordionContent
        isOpen={isOpen}
        isPushed={isPushed}
        maxHeight={React.Children.count(children) * MENU_ENTRY_HEIGHT}
      >
        {children}
      </AccordionContent>
    </Container>
  );
};

export default Accordion;
// export default React.memo(Accordion, (prev, next) => prev.isPushed === next.isPushed);
