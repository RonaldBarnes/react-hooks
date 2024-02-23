import React from "react";

export default function PageTitle( {hookName = ""} )
  {
  // console.log("HOOKNAME:", hookName);

  const pageTitle = process.env.REACT_APP_APPNAME || "React Hooks";
  document.title = `${pageTitle}: ${hookName}`;

  return (
    <h2>Hook <code>{hookName}</code></h2>
    );
  }	// end function PageTitle

