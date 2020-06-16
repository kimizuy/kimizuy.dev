import styled from "styled-components"
import { useState } from "react"

type Props = {
  isOpen: boolean
  onClick: () => {}
}

export default function () {
  const [isOpen, setIsOpen] = useState(false)

  return <Nav isOpen={true}>aaa</Nav>
}

const Nav = styled.div`
  height: 100%;
  width: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "3rem" : "0")};
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #fff;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
`
