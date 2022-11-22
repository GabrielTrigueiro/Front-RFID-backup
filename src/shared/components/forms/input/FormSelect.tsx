import { Select, SelectProps, SelectChangeEvent, MenuItem, InputLabel } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type TSelectField = SelectProps & {
    name: string
}

export const FormSelect: React.FC<TSelectField> = ({ name, ...rest }) => {
    const [role, setRole] = useState<string>();

    const selectHandleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };

    const { clearError, defaultValue, error, fieldName, registerField } = useField(name);

    const [value, setValue] = useState<string>(defaultValue || "");

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
        });
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
                
                <MenuItem value={"cliente"}>Cliente</MenuItem>
                <MenuItem value={"colaborador"}>Colaborador</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
        </>
    );
};
