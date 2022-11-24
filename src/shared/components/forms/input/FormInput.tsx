import { OutlinedInputProps, OutlinedInput,TextFieldProps, TextField} from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type TLoginOutlinedInput = OutlinedInputProps & TextFieldProps & {
    name: string
}

export const FormInput: React.FC<TLoginOutlinedInput> = ({ name, ...rest }) => {

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
        <TextField
            {...rest}
            autoComplete="off"

            size="small"

            error={!!error}
            //helperText={error}
            defaultValue={defaultValue}
            onKeyDown={() => error ? clearError() : undefined}

            value={value}
            onChange={e => setValue(e.target.value)}
            FormHelperTextProps={{style: {fontSize:9, margin:0, padding: 0, backgroundColor: "#fff"}}}
            sx={{
                "& fieldset": {border: error ? null : "none"}, //tira a borda
            }}
        />
    );
};
