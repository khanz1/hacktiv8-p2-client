import { useEffect, useState } from "react";
import { Group, Code } from "@mantine/core";
import {
  IconLogout,
  IconDashboard,
  IconCategory,
  IconUser,
} from "@tabler/icons-react";
import classes from "../styles/Sidebar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const data = [
  { link: "/admin", label: "Dashboard", icon: IconDashboard },
  { link: "/admin/genres", label: "Genre List", icon: IconCategory },
  {
    link: "/admin/user",
    requiredRole: "Admin",
    label: "Create Staff",
    icon: IconUser,
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");


  useEffect(() => {
    const activeItem = data.find((item) => item.link === location.pathname);
    setActive(activeItem?.label ?? "Dashboard");
  }, [location]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Link to="/" style={{ cursor: 'pointer' }}>
            <img src={"/assets/FantasyCatLogo.png"} width={50} />
          </Link>
          <Code fw={700}>v1.0.6</Code>
        </Group>
        {data.map(
          (item) => {
            if (item && item.requiredRole && role === 'Admin') {
              return (
                <a
                  className={classes.link}
                  data-active={item.label === active || undefined}
                  href={item.link}
                  key={item.label}
                  onClick={(event) => {
                    event.preventDefault();
                    setActive(item.label);
                    navigate(item.link);
                  }}
                >
                  <item.icon className={classes.linkIcon} stroke={1.5} />
                  <span>{item.label}</span>
                </a>
              );
            } else {
              return (
                <a
                  className={classes.link}
                  data-active={item.label === active || undefined}
                  href={item.link}
                  key={item.label}
                  onClick={(event) => {
                    event.preventDefault();
                    setActive(item.label);
                    navigate(item.link);
                  }}
                >
                  <item.icon className={classes.linkIcon} stroke={1.5} />
                  <span>{item.label}</span>
                </a>
              );
            }
          }
        )}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={handleLogout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
