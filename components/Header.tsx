import { useRouter } from "next/dist/client/router"
import styled from "styled-components"
import Link from "next/link"

type Props = {
  home?: boolean
  name: string
  siteTitle: string
}

export default function (p: Props) {
  const router = useRouter()
  const headerStyle = {
    backgroundImage: "url(" + "config.bgimage" + ")",
  }

  return (
    <header id="masthead" className="site-header">
      <div id="header-bg" className="site-header-bg" style={headerStyle}></div>
      <div className="site-header-scroll">
        <div className="site-header-inside">
          <div className="site-header-vertical">
            <div className="site-branding">
              <p className="site-logo">
                <Link href="/">
                  <img src="/images/profile.jpg" alt={p.name} />
                </Link>
              </p>
              <h1 className="site-title">
                <Link href="/">
                  <a>{p.siteTitle}</a>
                </Link>
              </h1>
              <p className="site-description">site description</p>
            </div>
            <nav
              id="main-navigation"
              className="site-navigation"
              aria-label="Main Navigation"
            >
              <div className="site-nav-wrap">
                <div className="site-nav-inside">
                  <ul className="menu">
                    <li className="menu-item ">
                      <a href="/">Home</a>
                    </li>
                    {/* {pages &&
                      pages.map((page, index) => {
                        return (
                          <li className="menu-item" key={index}>
                            <Link href="[slug]" as={`${page.path}`}>
                              <a>{page.page.title}</a>
                            </Link>
                          </li>
                        )
                      })} */}
                  </ul>
                </div>
              </div>
            </nav>
            <button id="menu-toggle" className="menu-toggle">
              <span className="screen-reader-text">Menu</span>
              <span className="icon-menu" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
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
