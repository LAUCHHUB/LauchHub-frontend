import React from "react";
import styled from "styled-components";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
import MenuLink from "./MenuLink";
import Attach from "./Attach";
import { PanelProps, PushedProps } from "../types";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

// const BlockIcon = styled.div`
//   position: absolute;
//   top: -10px;
//   right: 0px;
//   font-size: 10px;
//   color: #fc0909;
// `;

const BlockIcon = styled.div`
  position: absolute;
  top: 7px;
  left: 50%;
  font-size: 10px;
  color: #fc0909;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const { location } = window; // useLocation();
  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;

  return (
    <Container>
      {links.map((entry) => {
        const IconElement = entry.icon;
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

        if (entry.items) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === location.pathname);
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0;
          const itemActive = entry.items.some((item) => item.href === location.pathname);

          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={entry.icon}
              label={entry.label}
              initialOpenState={initialOpenState}
              className={calloutClass}
              isActive={itemActive}
            >
              {isPushed &&
                entry.items.map((item, index) => (
                  <MenuEntry
                    // eslint-disable-next-line react/no-array-index-key
                    key={`children-${item.href}-${index}`}
                    className="menu-sub-item"
                    secondary
                    isActive={item.href === location.pathname}
                    onClick={handleClick}
                  >
                    <MenuLink href={item.href} target={item.target}>
                      {item.label}
                    </MenuLink>
                  </MenuEntry>
                ))}
            </Accordion>
          );
        }
        return (
          <MenuEntry key={entry.label} isActive={entry.href === location.pathname} className={calloutClass}>
            <MenuLink href={entry.href} target={entry.target} onClick={handleClick}>
              <IconElement />
              <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
              {isPushed && <BlockIcon>{entry.att && <Attach att={entry.att} />}</BlockIcon>}
            </MenuLink>
          </MenuEntry>
        );
      })}
    </Container>
  );
};

export default PanelBody;
