import styled from "styled-components"

export default function () {
  return (
    <Container>
      <p>button</p>
    </Container>
  )
}

const Container = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`
