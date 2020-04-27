import React, { useEffect } from "react";

// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

import CustomTabs from "components/CustomTabs/CustomTabs";

import FiberNew from "@material-ui/icons/FiberNew";

import Basicat from "./createcategory";

export default function AddCategories() {
  //localStorage.setItem("taskContent", "");

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
          title="Create Category :"
          headerColor="primary"
          tabs={[
            {
              tabName: "Define",
              tabIcon: FiberNew,
              tabContent: <Basicat />
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
}
