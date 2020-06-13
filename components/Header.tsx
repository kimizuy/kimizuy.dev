import { useRouter } from "next/dist/client/router"
import styled from "styled-components"

export default function ({
  home,
  name,
  siteTitle,
}: {
  home?: boolean
  name: string
  siteTitle: string
}) {
  const router = useRouter()

  return home ? (
    <Flex>
      <HeaderImage src="/images/profile.jpg" alt={name} />
      <HeaderTitle>{siteTitle}</HeaderTitle>
    </Flex>
  ) : (
    <Clickable
      onClick={() => {
        router.push("/")
      }}
    >
      <Flex>
        <HeaderImage src="/images/profile.jpg" alt={name} />
        <HeaderTitle>{siteTitle}</HeaderTitle>
      </Flex>
    </Clickable>
  )
}

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

const Clickable = styled.div`
  cursor: pointer;
  display: inline-block;
`
