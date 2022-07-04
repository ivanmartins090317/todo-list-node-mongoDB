import React, { useState } from "react";

import Cadastro from "./components/cadastro";

function App() {
  const [patient, setPatient] = useState([
    {
      name: "ivan",
      data_nascimento: "07-01-1986",
      cpf: 35556654,
      sexo: "masculino",
      endereço: "rua...",
      status: true,
    },
  ]);
  return (
    <>
      <div>
        <Cadastro patient={patient} />
      </div>
    </>
  );
}

export default App;
