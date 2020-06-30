import styled from "styled-components"

export default function () {
  return <Footer>footer</Footer>
}

const Footer = styled.footer`
  background-color: yellow;

  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  border-top: 1px dashed _palette(border);
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  padding-top: 1.66667em;
`
