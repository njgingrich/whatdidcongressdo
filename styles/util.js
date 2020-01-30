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
