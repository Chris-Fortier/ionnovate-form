import React from "react";
import classnames from "classnames";
import { checkIsOver } from "../../utils/helpers"; // use {} if its not importing the default export

// this is a simple character counter that displays a count out of a max counts changes the text to danger if the count is > max
export default class Counter extends React.Component {
   render() {
      return (
         <span
            className={classnames({
               "text-danger": checkIsOver(this.props.count, this.props.max),
            })}
         >
            {this.props.count}/{this.props.max}
         </span>
      );
   }
}
