import React from "react";
import { ChartContext } from "../context/ChartContext";
import { NavLink } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

import ModalContainer from "./modalContainer/ModalContainer";


export default function Menu( ) {
  const { charts } = React.useContext(ChartContext);
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "unactive");
  
  const role = localStorage.getItem("role");
  
  return (
    <>
      <div className="d-flex felx-column justify-content-between col-auto bg-dark min-vh-100">
        <div
          className=""
          style={{ minWidth: "3rem", maxWidth: "14rem", width: "14rem" }}
        >
          <ul className="nav nav-pills flex-column mt-2 mt-ms-0" id="menu">
            {/*ruta a las vista previa de los graficos */}

            {/*ruta a los detalles de cada grafico */}
            <li className="nav-item disable my-ms-1 my-2">
              <a
                className="nav-link text-white"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard-collapse"
                aria-current="page"
                // posible error aqui
                href="/"
              >
                <i
                  className="fa-solid fa-chart-pie"
                  style={{ color: " #ffffff" }}
                ></i>
                <span className="ms-2 d-none d-sm-inline">Dashboard</span>
              </a>
            </li>
            <ul
              className="nav collapse ms-1 flex-column"
              id="dashboard-collapse"
            >
              {charts[0]?.data?.labels?.length !== 0 ? (
                charts.map((chart) => (
                  <li key={chart.id} className="nav-item">
                    <NavLink
                      to={`/dashboard/${chart.id}`}
                      className={`nav-link text-white ${setActiveClass}`}
                    >
                      <i
                        className="fa-regular fa-chart-bar ms-3"
                        style={{ color: " #ffffff" }}
                      ></i>
                      {chart.title}
                    </NavLink>
                  </li>
                ))
              ) : (
                <li>
                  <a
                    href="/"
                    className="d-inline-flex text-decoration-none text-white rounded"
                  >
                    No charts yet
                  </a>
                </li>
              )}
            </ul>
            {/*ruta a las funciones de Usuarios*/}

{ role === "admin" &&  <>        <li className="nav-item disable my-ms-1 my-2">
              <a
                href="#sidemenu"
                data-bs-toggle="collapse"
                className="nav-link text-white"
                aria-current="page"
              >
                <i
                  className="fa-solid fa-people-group"
                  style={{ color: " #ffffff" }}
                ></i>
                <span className="ms-2 d-none d-sm-inline">Team</span>
              </a>
            </li>
            <ul
              className="nav collapse ms-1 flex-column"
              id="sidemenu"
              data-bs-parent="menu"
            >
              <li className="nav-item">
                <a
                  href="/team-list"
                  className="nav-link text-white"
                  aria-current="page"
                >
                  <i
                    className="fa-solid fa-list ms-3"
                    style={{ color: " #ffffff" }}
                  ></i>
                  <span className="ms-2 d-none d-sm-inline">Team List</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/register-user" className="nav-link text-white">
                  <i
                    className="fa-solid fa-user-plus ms-3"
                    style={{ color: " #ffffff" }}
                  ></i>
                  <span className="ms-2 d-none d-sm-inline">Add user</span>
                </a>
              </li>
            </ul>

            <li className="nav-item disable my-ms-1 my-2">
              <ModalContainer />
            </li></> }
          
          </ul>
        </div>
      </div>
    </>
  );
}
