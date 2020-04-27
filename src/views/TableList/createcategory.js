// Render Prop
import React from "react";
import { Formik, Form, Field } from "formik";

import Button from "components/CustomButtons/Button";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Snackbar from "components/Snackbar/Snackbar";
import Done from "@material-ui/icons/Done";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
    // width: 200
  }
}));

const create_Category = gql`
  mutation createCategory($name: String!) {
    createCategory(data: { name: $name }) {
      id
    }
  }
`;
const Basicat = () => {
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  const [tc, setTC] = React.useState(false);
  const [notype, setnotype] = React.useState("success");
  const showNotification = () => {
    setTC(true);
    setTimeout(function() {
      setTC(false);
    }, 6000);
  };
  const [createCategory, { data }] = useMutation(create_Category);
  const classes = useStyles();

  const name = ({ field, form, ...props }) => {
    return (
      <TextField
        required
        id="standard-required"
        label="Category Name"
        //defaultValue="Task name"
        className={classes.textField}
        margin="normal"
        {...field}
        {...props}
      />
    );
  };

  return (
    <>
      <Formik
        initialValues={{ taskname: "", type: "", score: "", desc: "" }}
        onSubmit={values => {
          let { taskname } = values;
          createCategory({
            variables: {
              name: taskname
            }
          })
            .then(({ data }) => {
              //console.log(data.createTask.id);
              //  localStorage.setItem("ProductID", data.createCategory.id);

              setnotype("success");
              showNotification();
            })
            .catch(function(e) {
              console.log(e.message);
              setnotype("danger");

              showNotification();
            });
          //console.log(data);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Field name="taskname" component={name} />
                </Grid>

                <Grid item xs={12}>
                  <Button color="primary" type="submit">
                    {" "}
                    Create Category
                  </Button>
                  <Snackbar
                    place="tc"
                    color={notype}
                    icon={notype === "success" ? Done : ErrorOutline}
                    message={
                      notype === "success"
                        ? "Category created succesfuly"
                        : "Category creation failed"
                    }
                    open={tc}
                    closeNotification={() => {
                      console.log(notype);
                      setTC(false);
                    }}
                    close
                  />
                </Grid>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Basicat;
