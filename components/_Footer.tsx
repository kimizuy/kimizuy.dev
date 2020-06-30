import styled from "styled-components"

export default function () {
  return (
    <Footer>
      <Info>footer</Info>
    </Footer>
  )
}

const Footer = styled.footer`
  background-color: yellow;

  align-items: center;
  border-top: 1px dashed _palette(border);
  display: flex;
  padding-top: 1.66667em;
`

const Info = styled.div`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 0;

  @media only screen and (max-width: 800px) {
    margin-left: 15px;
  }
`
