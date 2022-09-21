import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState("all");
  const url = filter === 'all' ? `http://localhost:3001/pets/` : `http://localhost:3001/pets/?type=${filter}`
  const fetchPets = async () => {
    const response = await fetch(url)
    const data = await response.json();
    setPets(data);
  }

  const updatePet = async (pet) => {
    const response = await fetch(`http://localhost:3001/pets/${pet.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ ...pet, isAdobted: true })
    })

    const data = await response.json();

    const updatedPet = pets.map(arrayPet => {
      if (arrayPet.id === pet.id) return data
      else return arrayPet
    })

    setPets(updatedPet);
  }
  console.log(pets);
  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters filter={filter} setFilter={setFilter} onFetchClick={fetchPets} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdobtClick={updatePet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
