import React from 'react'
import styled from 'styled-components'

const VoteContainer = styled.div`

`

export default function Vote({ date, democratic, description, question, republican, independent, total, result, url }) {
  return (
    <div>
      <h4>{question}</h4>
      <span>{date}</span>
      <span>{description}</span>
      <h4>Yea</h4>
      <h4>Nay</h4>
      <h4>N/V</h4>
      <div>
        <span>{democratic.yes}</span>
        <span>{republican.yes}</span>
        <span>{independent.yes}</span>
        <span>{total.yes}</span>
      </div>
      <div>
        <span>{democratic.no}</span>
        <span>{republican.no}</span>
        <span>{independent.no}</span>
        <span>{total.yes}</span>
      </div>
      <div>
        <span>{democratic.not_voting}</span>
        <span>{republican.not_voting}</span>
        <span>{independent.not_voting}</span>
        <span>{total.yes}</span>
      </div>
      <span>{result}</span>
      <div>
        <a href={url}>Read More</a>
      </div>
    </div>
  )
}
