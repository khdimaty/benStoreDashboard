import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "components/CustomButtons/Button.jsx";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const Static = gql`
  query user {
    user(where: { id: "ck9c0ux3j001u0747aw95018p" }) {
      name
    }
  }
`;
const Update = gql`
  mutation updateDEl($name: String!) {
    updateUser(
      where: { id: "ck9c0ux3j001u0747aw95018p" }
      data: { name: $name }
    ) {
      id
    }
  }
`;
export default function Modifydel() {
  const { loading, data } = useQuery(Static, {
    fetchPolicy: "cache-and-network"
  });

  const [mutate] = useMutation(Update);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [disable, setdisable] = useState(false);
  console.log(data);
  return (
    <>
      {!loading ? (
        <GridContainer>
          <GridItem xs={4}>
            <TextField
              label="price 1"
              defaultValue={data ? data.user.name.split("/")[0] : " "}
              onChange={e => setName(e.target.value)}
            />
          </GridItem>
          <GridItem xs={4}>
            <TextField
              label="Treshhold"
              defaultValue={data ? data.user.name.split("/")[1] : " "}
              onChange={e => setPrice(parseFloat(e.target.value))}
            />
          </GridItem>

          <GridItem xs={4}>
            <TextField
              label="Price 2"
              defaultValue={data ? data.user.name.split("/")[2] : " "}
              onChange={e => setDescription(e.target.value)}
            />
          </GridItem>

          <GridItem xs={12} style={{ marginTop: 30 }}>
            <Button
              disable={disable}
              color="primary"
              className="like"
              onClick={async () => {
                setdisable(true);
                await mutate({
                  variables: {
                    name:
                      (name === "" ? data.user.name.split("/")[0] : name) +
                      "/" +
                      (price === "" ? data.user.name.split("/")[1] : price) +
                      "/" +
                      (description === ""
                        ? data.user.name.split("/")[2]
                        : description)
                  }
                }).then(data => setdisable(false));

                // refetch({ variables: { id: Math.random() } });
              }}
            >
              Update Delivery prameters
            </Button>
          </GridItem>
        </GridContainer>
      ) : (
        <></>
      )}
    </>
  );
}
