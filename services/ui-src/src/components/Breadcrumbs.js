import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { routes } from "../Routes";
import "./Breadcrumb.css";

export const Breadcrumbs = () => {
  const route = useRouteMatch();

  const items = routes
    .filter(({ path }) => route.path.includes(path))
    .map(({ path, ...rest }) => ({
      path: Object.keys(route.params).length
        ? Object.keys(route.params).reduce(
            (path, param) => path.replace(`:${param}`, route.params[param]),
            path
          )
        : path,
      ...rest,
    }));

  return (
    <Breadcrumb>
      {items.map((item, idx) => (
        <Breadcrumb.Item
          key={"breadcrumbs_" + item.path}
          linkProps={{ to: item.path }}
          linkAs={Link}
          active={idx + 1 === items.length}
        >
          {item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
