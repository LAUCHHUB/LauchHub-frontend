import React, { useContext } from "react";
import styled from "styled-components";
import { HamburgerIcon, HamburgerCloseIcon } from "../icons";
import { MenuContext } from "../context";
import MenuButton from "./MenuButton";
import Flex from "../../../components/Box/Flex";

interface Props {
  isMobile: boolean;
  isPushed: boolean;
  isDark: boolean;
  togglePush: () => void;
  href: string;
}

const WrapperLogo = styled(Flex)`
  padding: 10px 8px 40px 7px;
`;

const StyledLink = styled("a")`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 156px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
`;

const BoxImage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  img {
    height: auto;
  }

  img:first-child {
    margin-right: 15px;
  }
`;

const Logo: React.FC<Props> = ({ isPushed, togglePush, href }) => {
  const { linkComponent } = useContext(MenuContext);
  const isAbsoluteUrl = href.startsWith("http");
  const innerLogo = (
    <BoxImage>
      <img src="https://lz.finance/icons/lz-logo.svg" alt="logo" width={140} />
    </BoxImage>
  );

  return (
    <WrapperLogo>
      {/* Icon collapse siderbar menu */}
      <MenuButton aria-label="Toggle menu" onClick={togglePush} mr="10px">
        {isPushed ? (
          <HamburgerCloseIcon width="24px" color="textSubtle" />
        ) : (
          <HamburgerIcon width="24px" color="textSubtle" />
        )}
      </MenuButton>

      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="Home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink as={linkComponent} to={href} aria-label="Home page">
          {innerLogo}
        </StyledLink>
      )}
    </WrapperLogo>
  );
};

export default React.memo(Logo, (prev, next) => prev.isPushed === next.isPushed && prev.isDark === next.isDark);
