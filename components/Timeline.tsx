import React from 'react'
import styled from 'styled-components'
import Action from './Action';
import Vote from './Vote';

const centerOffset = 56;

const TimelineContainer = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: [start] 1fr [center-left] ${centerOffset}px [center-right] 1fr [end];
  grid-row-gap: 0.5rem;

  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
`

const TimelineBar = styled.div`
  position: absolute;
  top: 1rem;
  bottom: -1rem;
  left: calc(50% - 8px);
  width: 16px;
  background-color: ${({ theme }) => theme.colors.blue_700};
`

const VoteContainer = styled.div`
  position: relative;
  grid-column: start / center-right;
  margin-right: ${centerOffset}px;
`

const VoteConnector = styled.div`
  position: absolute;
  z-index: 2;
  top: 32px;
  right: -${centerOffset / 2}px;
  height: 12px;
  width: ${centerOffset / 2}px;
  background-color: ${({ theme }) => theme.colors.blue_700};

  &::before {
    content: "";
    position: absolute;
    top: -14px;
    right: -20px;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.white};
  }

  &::after {
    content: "";
    position: absolute;
    top: -10px;
    right: -16px;
    height: 24px;
    width: 24px;
    border-radius: 16px;
    border: 4px solid ${({ theme }) => theme.colors.blue_700};
    background-color: ${({ theme }) => theme.colors.white};
  }
`

const ActionContainer = styled.div`
  position: relative;
  grid-column: center-left / end;
  margin-left: ${centerOffset}px;
`

const ActionConnector = styled.div`
  position: absolute;
  z-index: 2;
  top: 32px;
  left: -${centerOffset / 2}px;
  height: 12px;
  width: ${centerOffset / 2}px;
  background-color: ${({ theme }) => theme.colors.blue_700};

  &::before {
    content: "";
    position: absolute;
    top: -14px;
    left: -20px;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.white};
  }

  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -16px;
    height: 24px;
    width: 24px;
    border-radius: 16px;
    border: 4px solid ${({ theme }) => theme.colors.blue_700};
    background-color: ${({ theme }) => theme.colors.white};
  }
`

const Header = styled.h2`
  margin: 0 0 1rem 0;
  justify-self: center;
  font-size: ${({ theme }) => theme.fontSizes.xxlarge}px;
  color: ${({ theme }) => theme.colors.blue_700};
`

const VotesHeader = styled(Header)`
  grid-column: start / center-left;
`

const ActionsHeader = styled(Header)`
  grid-column: center-right / end;
`

export default function Timeline({ activities }) {
  return (
    <TimelineContainer>
      <VotesHeader>Votes</VotesHeader>
      <ActionsHeader>Floor Actions</ActionsHeader>
      {(Object.values(activities || {})).map((hour: object[]) => {
        return hour.map((datum: any) => {
          if (datum.type === 'action') {
            return (
              <ActionContainer>
                <Action {...datum.data} />
                <ActionConnector />
              </ActionContainer>
            )
          }
          return (
            <VoteContainer>
              <Vote {...datum.data} />
              <VoteConnector />
            </VoteContainer>
          )
        })
      })}
      <TimelineBar />
    </TimelineContainer>
  )
}
