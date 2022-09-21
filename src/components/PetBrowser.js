import React from "react";

import Pet from "./Pet";

function PetBrowser({pets, onAdobtClick}) {
  return <div className="ui cards">{pets.map(pet => <Pet pet={pet} onAdobtClick={onAdobtClick}/>)}</div>;
}

export default PetBrowser;
