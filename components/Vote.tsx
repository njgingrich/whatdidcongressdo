import React from 'react'
import styled from 'styled-components'
import { formatTimestamp } from '../util/time';

export default function Vote({ description, question, results, timestamp, url }) {
  return (
    <VoteContainer>
      <VoteTitle>{question}</VoteTitle>
      <VoteDescription>{description}</VoteDescription>
      <VoteDate>{formatTimestamp(timestamp)}</VoteDate>
      <VoteGrid>
        <VoteRoll>
          <RollHeader>Yea</RollHeader>
          <DemocratSquare />
          <RollResult>{results.democratic.yes}</RollResult>
          <RepublicanSquare />
          <RollResult>{results.republican.yes}</RollResult>
          <IndependentSquare />
          <RollResult>{results.independent.yes}</RollResult>
          <TotalSquare />
          <RollResult bolded>{results.total.yes}</RollResult>
        </VoteRoll>
        <VoteRoll>
          <RollHeader>Nay</RollHeader>
          <DemocratSquare />
          <RollResult>{results.democratic.no}</RollResult>
          <RepublicanSquare />
          <RollResult>{results.republican.no}</RollResult>
          <IndependentSquare />
          <RollResult>{results.independent.no}</RollResult>
          <TotalSquare />
          <RollResult bolded>{results.total.no}</RollResult>
        </VoteRoll>
        <VoteRoll>
          <RollHeader>N/V</RollHeader>
          <DemocratSquare />
          <RollResult>{results.democratic.not_voting}</RollResult>
          <RepublicanSquare />
          <RollResult>{results.republican.not_voting}</RollResult>
          <IndependentSquare />
          <RollResult>{results.independent.not_voting}</RollResult>
          <TotalSquare />
          <RollResult bolded>{results.total.not_voting}</RollResult>
        </VoteRoll>
      </VoteGrid>
      <VoteResult>{results.result}</VoteResult>
      {/* <div>
        <a href={url}>Read More</a>
      </div> */}
    </VoteContainer>
  )
}

const VoteContainer = styled.div`
  display: grid;
  grid-template-columns: [start] 1fr [result] minmax(24px, auto) [end];
  grid-template-rows: [start] auto [body] 1fr [votes] auto [details] 40px [end];
  grid-row-gap: 0.5rem;
  grid-column-gap: 0.25rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray_200};
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px 0 ${({ theme }) => theme.colors.black}55;
`

const VoteTitle = styled.h3`
  grid-column: start / result;
  grid-row: start / body;
  margin: 0;
  color: ${({ theme }) => theme.colors.blue_800};
`

const VoteDescription = styled.p`
  grid-column: start / end;
  grid-row: body / votes;
  margin-top: 0.5rem;
  margin-bottom: 0;
`

const VoteDate = styled.span`
  grid-column: result / end;
  grid-row: start / body;
  align-self: center;
  justify-self: end;

  font-weight: bold;
`

const VoteRoll = styled.div`
  display: grid;
  grid-template-columns: 20px auto;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
`

const RollHeader = styled.h4`
  grid-column: 1 / 3;
  margin: 0;
  color: ${({ theme }) => theme.colors.blue_800};
  font-size: ${({ theme }) => theme.fontSizes.xlarge}px;
  text-decoration: underline;
  text-decoration-skip: ink;
  text-decoration-skip-ink: auto;
  justify-self: center;
`

interface RollResultProps {
  bolded?: boolean
}

const RollResult = styled.span<RollResultProps>`
  font-weight: ${({ bolded }) => bolded ? 'bold' : 'normal'}
`

const VoteGrid = styled.div`
  grid-column: start / end;
  grid-row: votes / details;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 0.5rem;
`

const PartySquare = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.gray_800};
`

const DemocratSquare = styled(PartySquare)`
  background-color: ${({ theme }) => theme.colors.blue_600};
`

const RepublicanSquare = styled(PartySquare)`
  background-color: ${({ theme }) => theme.colors.red_600};
`

const IndependentSquare = styled(PartySquare)`
  background-color: ${({ theme }) => theme.colors.gray_600};
`

const TotalSquare = styled(PartySquare)`
  background-color: ${({ theme }) => theme.colors.blue_700};
`

const VoteResult = styled.span`
  grid-column: result / end;
  grid-row: details / end;
  font-weight: bold;
  font-size: 20px;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue_700};
`