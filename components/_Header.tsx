import styled from "styled-components"

export default function () {
  return (
    <Header>
      header
      <MenuToggleButton />
    </Header>
  )
}

const Header = styled.header`
  background-color: blue;
  color: #fff;
  position: relative;

  @media only screen and (min-width: 801px) {
    height: 100%;
    right: 0;
    position: fixed;
    top: 0;
    width: 30vw;
  }
`

const MenuToggleButton = styled.button`
  @media only screen and (min-width: 801px) {
    display: none;
  }
`
