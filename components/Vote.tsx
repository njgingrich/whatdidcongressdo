import React from 'react'
import styled from 'styled-components'

const VoteContainer = styled.div`
  display: grid;
  grid-template-columns: [start] 1fr [c2] 1fr [c3] 1fr [result] minmax(24px, auto) [end];
  grid-template-rows: [start] auto [body] 1fr [date] 24px [results] auto [end];
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
`

const VoteDescription = styled.p`
  grid-column: start / end;
  grid-row: body / date;
  margin-top: 0.5rem;
  margin-bottom: 0;
`

const VoteDate = styled.span`
  grid-column: start / end;
  grid-row: date / results;
`

const VoteRoll = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    margin: 0;
    color: ${({ theme }) => theme.colors.blue_800};
  }
`

const VoteYes = styled(VoteRoll)`
  grid-column: start / c2;
  grid-row: results / end;
`

const VoteNo = styled(VoteRoll)`
  grid-column: c2 / c3;
  grid-row: results / end;
`

const VoteNV = styled(VoteRoll)`
  grid-column: c3 / date;
  grid-row: results / end;
`

const VoteResult = styled.span`
  grid-column: result / end;
  grid-row: results / end;
  font-weight: bold;
  font-size: 20px;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue_700};
`

export default function Vote({ date, democratic, description, question, republican, independent, total, result, url }) {
  return (
    <VoteContainer>
      <VoteTitle>{question}</VoteTitle>
      <VoteDescription>{description}</VoteDescription>
      <VoteDate>{date}</VoteDate>
      <VoteYes>
        <h4>Yea</h4>
        {/* <span>{democratic.yes}</span>
        <span>{republican.yes}</span>
        <span>{independent.yes}</span> */}
        <span>{total.yes}</span>
      </VoteYes>
      <VoteNo>
        <h4>Nay</h4>
        {/* <span>{democratic.no}</span>
        <span>{republican.no}</span>
        <span>{independent.no}</span> */}
        <span>{total.no}</span>
      </VoteNo>
      <VoteNV>
        <h4>N/V</h4>
        {/* <span>{democratic.not_voting}</span>
        <span>{republican.not_voting}</span>
        <span>{independent.not_voting}</span> */}
        <span>{total.not_voting}</span>
      </VoteNV>
      <VoteResult>{result}</VoteResult>
      {/* <div>
        <a href={url}>Read More</a>
      </div> */}
    </VoteContainer>
  )
}
