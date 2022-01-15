import React from "react";
import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import App from "../../App";
import Providers from "../../providers";

import api from "../../services";

it("teste integrado", async() => {
  render(<Providers><App/></Providers>);

  jest.spyOn(api,"get").mockResolvedValue({data:
    {
      "bairro": "",
      "cidade": "Atalaia",
      "logradouro": "",
      "estado_info": {
      "area_km2": "199.307,985",
      "codigo_ibge": "41",
      "nome": "Paraná"
    },
      "cep": "87630000",
      "cidade_info": {
      "area_km2": "137,663",
      "codigo_ibge": "4102208"
    },
      "estado": "PR"
    }});

  const inputCep = screen.getByPlaceholderText("Insira o CEP");
  const ButtonCep = screen.getByText("Buscar pelo CEP");
  
  
  fireEvent.change(inputCep,{
    target:{value:"87630000"},
  });
  fireEvent.click(ButtonCep);
  
  await waitFor ( async () =>{
    expect( await screen.findByDisplayValue("Atalaia"));
  });
  
});

