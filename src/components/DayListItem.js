import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";


export default function DayListItem(props) {

  const formatSpots = function(spots) {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return `${spots} spot remaining`;
    } else {
      return `${spots} spots remaining`;
    }
  }

  const dayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    // <li> represents the entire day item
    // <h2> should display the day name
    // <h3> should display the spots remaining for a day

    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}