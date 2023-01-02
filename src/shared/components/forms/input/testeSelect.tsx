import { Select, SelectProps, SelectChangeEvent, MenuItem, InputLabel } from "@mui/material";
import { useField } from "@unform/core";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../service/api";
import { useDispatch, useSelector } from "react-redux";
import { adicionarRoles } from "../../../store/Slices/Roles";
import { Roles_Service } from "../../../service/api/roles/Roles_Service";
import { RootState } from "../../../store/Store";

type TSelectField = SelectProps & {
    name: string
}

export const TesteSelect: React.FC<TSelectField> = ({ name, ...rest }) => {

    const { clearError, defaultValue, error, fieldName, registerField } = useField(name);

    const [value, setValue] = useState<string>(defaultValue || "");

    //ids roles
    const admin = "6320bb962415aefdb0a2edcf";
    const user = "6388b981d2501bfc83d6c447";

    const rolesState = useSelector((state: RootState) => state.roles.lista);

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
        });
    }, [registerField, fieldName, value]);

    return (
        <>
            <InputLabel size={"small"}>Posição</InputLabel>
            <Select
                {...rest}

                error={!!error}
                defaultValue={defaultValue}
                onKeyDown={() => error ? clearError() : undefined}
                label="posicao"
                value={value}
                onChange={e => setValue(e.target.value)}
                size={"small"}
            >
                {/* <MenuItem value={admin}>Admin</MenuItem>;
                <MenuItem value={user}>Usuário</MenuItem>; */}
                {rolesState.map((row) => (
                    <MenuItem value={row.id} key={row.name}>{row.name}</MenuItem>
                ))}
            </Select>
        </>
    );
};
