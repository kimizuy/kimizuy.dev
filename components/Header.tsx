import { useRouter } from "next/dist/client/router"
import styled from "styled-components"

type Props = {
  home?: boolean
  name: string
  siteTitle: string
}

export default function (p: Props) {
  const router = useRouter()

  return (
    <Clickable
      home={p.home}
      onClick={() => {
        router.push("/")
      }}
    >
      <Flex>
        <HeaderImage src="/images/profile.jpg" alt={p.name} />
        <HeaderTitle>{p.siteTitle}</HeaderTitle>
      </Flex>
    </Clickable>
  )
}

const Clickable = styled.div`
  cursor: ${({ home }: { home?: boolean }) => (home ? "auto" : "pointer")};
  display: inline-block;
`

const Flex = styled.div`
  display: flex;
`

const HeaderImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
`

const HeaderTitle = styled.h1`
  font-weight: 800;
  margin: auto 0.5rem;
`
