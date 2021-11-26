import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectProductStats({opcao, setOpcao}) {

  const handleChange = (event: SelectChangeEvent) => {
    setOpcao(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: '100%' }}>
        <InputLabel id="demo-simple-select-autowidth-label">Status do Produto</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={opcao}
          onChange={handleChange}
          autoWidth
          label="Status do Produto"
        >
          <MenuItem value={"Inativo"}>Inativo</MenuItem>
          <MenuItem value={"Ativo"}>Ativo</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}