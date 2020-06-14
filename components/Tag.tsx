import styled from "styled-components"

type Props = { tag: string }

export default function (p: Props) {
  return <Container color="red">{p.tag}</Container>
}

const Container = styled.div`
  color: ${({ color }: { color: string }) => color};

  cursor: pointer;
  display: inline-block;
  padding: 2px 12px;
  margin-right: 16px;
  background: #fff;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  box-shadow: -6px -6px 10px rgba(255, 255, 255, 0.8),
    6px 6px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    opacity: 0.3;
    box-shadow: -6px -6px 10px rgba(255, 255, 255, 0.8),
      6px 6px 10px rgba(0, 0, 0, 0.2);
  }
  &:active {
    opacity: 1;
    box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.5),
      inset 8px 8px 16px rgba(0, 0, 0, 0.1);
    color: #79e3b6;
  }
`

const ToggleButton = styled.button`
  visibility: ${({ visible }: { visible: boolean }) =>
    visible ? "visible" : "hidden"};
`

const sample = (visible: boolean) => {
  return <ToggleButton visible={visible} />
}

const Button = styled.button`
  /* background-color is value of props.color */
  background-color: ${({ color }: { color: string }) => color};
`
