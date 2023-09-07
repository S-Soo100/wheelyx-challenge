import { logIn, logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { AppDispatch } from "@/redux/store";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const onClickLogIn = () => {
    dispatch(logIn({ email: email, password: password }));
  };

  return (
    <form className="py-4 m-4 mx-auto" action="/submit" method="post">
      <Paper elevation={24}>
        <Card sx={{ minWidth: 275, maxWidth: 700 }}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Typography variant="h5" className="mb-12">
                Wheely-x Ranking for Rehacare 2023
              </Typography>
              <div className="flex flex-row">
                <div className="m-4">
                  <TextField
                    required
                    id="email"
                    label="E-mail"
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                      // console.log(e.target.value);
                      return setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="m-4">
                  <TextField
                    required
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => {
                      // console.log(e.target.value);
                      return setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardActions className="justify-end mr-2">
            <Button onClick={onClickLogIn}>Log In</Button>
          </CardActions>
        </Card>
      </Paper>
    </form>
  );
}
