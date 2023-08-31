import { useCallback, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Drawer, Button, Menu, Navbar, Swap } from "react-daisyui"
import ThemeToggler from "./ThemeToggler"

export interface MenuItem {
  name: string
  path: string
  icon: React.ReactElement
}

export interface ModalProps {
  menus: MenuItem[]
  isOpen: boolean
  currentPath: string
  children: React.ReactNode
}

export default function SideBar({ menus, isOpen, children }: ModalProps) {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const toggleVisible = useCallback(() => {
    setVisible((visible) => !visible)
  }, [])
  return (
    <Drawer
      className={pathname !== '/' ? 'lg:drawer-open' : ''}
      open={visible}
      onClickOverlay={toggleVisible}
      side={
        <Menu className="p-4 w-60 md:w-80 h-full bg-base-200 pt-24 lg:pl-16 xl:pl-20">
          {menus.map(({ path, name, icon }) =>
            <Menu.Item key={path}>
              <Link to={path} className={`py-3 ${(pathname === path ? 'active' : '')}`}
                onClick={() => setVisible(false)}>{icon} {name}</Link>
            </Menu.Item>
          )}
        </Menu>
      }
    >
      <Navbar className="w-full px-3">
        <div className="flex-none lg:hidden">
          <Button shape="square" color="ghost" onClick={toggleVisible}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </Button>
        </div>
        <div className="flex-1 px-2 mx-2">
          <h1></h1>
        </div>
        <div className="flex-none">
          <ThemeToggler />
        </div>
      </Navbar>
      <div className="flex-grow px-6 md:px-12 xl:pr-24 pb-12">
        {children}
      </div>
    </Drawer>
  )
}
