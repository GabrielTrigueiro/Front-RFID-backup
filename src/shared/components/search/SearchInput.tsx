import { styled, alpha } from "@mui/material/styles"
import {useState} from "react"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"

//div exterior
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 1,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
//div do icone
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
//div do input
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const SearchInput:  React.FC<{change: (text:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void}> = ({change}) => {
  const [ word, setWord ] = useState<string>('')
  return (
    <Search sx={{bgcolor:'#fff'}}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={
          value => {
            change(value);
            setWord(value.target.value);
          }
        }
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};
