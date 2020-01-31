import styled from "styled-components";

export const HoverLink = styled.a`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  padding: 0 1px;
  text-decoration: underline;

  &:visited {
    color: gray_100;
  }

  &:hover {
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.gray_40};
    color: ${({ theme }) => theme.colors.blue_500};
  }
`;

export const Container = styled.main`
  margin: ${({ theme }) => `${theme.space[0]}rem auto`};
  max-width: calc(100% - 8rem);
`;

export const Pane = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.space[2]}px`};
`;

export const VotePane = styled(Pane)`
  display: grid;
  grid-template-rows: ${({ theme }) => `${theme.space[4]}px auto`};
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${({ theme }) => `${theme.space[3]}px`};
`;
