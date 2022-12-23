import { Select, SelectProps, SelectChangeEvent, MenuItem, InputLabel } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";
import { IRole } from "../../../service/api/roles/Roles_Service";

type TSelectField = SelectProps & {
    name: string
    lista: IRole[]
}

export const TesteSelect: React.FC<TSelectField> = ({ name, lista, ...rest }) => {

    const { clearError, defaultValue, error, fieldName, registerField } = useField(name);

    const [value, setValue] = useState<string>(defaultValue || "");

    const [listRoles, setListRoles] = useState<IRole[]>([{name: "teste", id: "id de teste"}]);

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
        });
        setListRoles(lista);
    }, [registerField, fieldName, value]);

    return (
        <>
            <InputLabel id="demo-simple-select-label">Posição</InputLabel>
            <Select
                {...rest}

                error={!!error}
                defaultValue={defaultValue}
                onKeyDown={() => error ? clearError() : undefined}
                label="posicao"
                value={value}
                onChange={e => setValue(e.target.value)}
            >
                {listRoles.map((row) => {
                    console.log(row);
                })}
            </Select>
        </>
    );
};
