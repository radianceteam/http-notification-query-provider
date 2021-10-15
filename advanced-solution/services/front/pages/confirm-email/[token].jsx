import {log} from "@http-notifs/logger";
import {
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function ConfirmEmailPage({token}) {
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h2" mt={2} textAlign="center">
        You email successfully confirmed
      </Typography>
      <Typography textAlign="center">
        Now, please, follow instructions below
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Step 1"
            secondary={
              <>
                <Typography component="span" sx={{mr: 0.5}}>
                  Go to
                </Typography>
                <Link
                  sx={{wordBreak: "break-all"}}
                  href="https://web.ton.surf/debot?address=0%3A433f7b97e4e613397175a2d9d1094643b5b90d1f095c423997f95fbf905a3ae3&net=devnet"
                  target="_blank"
                >
                  https://web.ton.surf/debot?address=0%3A433f7b97e4e613397175a2d9d1094643b5b90d1f095c423997f95fbf905a3ae3&net=devnet
                </Link>
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Step 2"
            secondary='Select "Send callbackUrl | deviceToken to provider"'
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Step 3"
            secondary='Select "github.com/radianceteam/http-notifs, ID = HN1"'
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Step 4"
            secondary={
              <>
                <Typography component="span">Enter token: </Typography>
                <Typography
                  component="code"
                  variant="caption"
                  sx={{bgcolor: "grey.200"}}
                  onDoubleClick={(e) => {
                    window.getSelection().selectAllChildren(e.target);
                  }}
                >
                  {token}
                </Typography>
              </>
            }
          />
        </ListItem>
      </List>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const {token} = context.query;

  const res = await axios.post("http://user-handler:3000/auth/email-confirm", {
    id: token,
  });

  log("confirm email data", res.data);
  log("confirm email status", res.statusText);

  if (res.data.error)
    return {
      notFound: true,
    };

  return {
    props: {
      token: res.data.data.token,
    },
  };
}
