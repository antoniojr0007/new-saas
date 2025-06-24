import type React from "react"
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact"
import { NavLink } from "react-router-dom"

const MainSidebar: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink to="/" className="text-decoration-none" style={{ color: "inherit" }}>
            Sidebar
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/acoes" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Ações</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/configuracoes" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">Configurações</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/empresa" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Empresa</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  )
}

export default MainSidebar
