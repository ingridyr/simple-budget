import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { BottomMenu } from "../../components/BottomMenu";
import { SideMenu } from "../../components/SideMenu";
import { useAuth } from "../../providers/AuthContext";
import { useBudgets } from "../../providers/BudgetsContext";
import { useExpenses } from "../../providers/ExpensesContext";

export const Statistics = () => {
  const { listBudgets } = useBudgets();
  const { allExpenses, listAllExpenses } = useExpenses();
  const { user, accessToken } = useAuth();

  useEffect(() => {
    listBudgets(user.id, accessToken);
    listAllExpenses(accessToken);
  }, []);

  const health = allExpenses
    .filter((item) => item.type === "health")
    .reduce((acc, { amount }) => acc + amount, 0);
  const entertainment = allExpenses
    .filter((item) => item.type === "entertainment")
    .reduce((acc, { amount }) => acc + amount, 0);
  const transport = allExpenses
    .filter((item) => item.type === "transport")
    .reduce((acc, { amount }) => acc + amount, 0);
  const home = allExpenses
    .filter((item) => item.type === "home")
    .reduce((acc, { amount }) => acc + amount, 0);
  const food = allExpenses
    .filter((item) => item.type === "food")
    .reduce((acc, { amount }) => acc + amount, 0);

  //para o grafico de linhas:
  //por uma opção pre setada dos meses no budget (select)
  //filtrar por mês
  //get em todas as expenses daquele mes
  //reduce nas expenses
  //modificar o obj dataChartLine

  const data = [
    ["Categories", "Expenses"],
    ["Health", 11],
    ["Entertainment", 2],
    ["Transport", 2],
    ["Home", 2],
    ["Food", 7],
  ];

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === "Health") {
      data[i][1] = health;
    }
    if (data[i][0] === "Entertainment") {
      data[i][1] = entertainment;
    }
    if (data[i][0] === "Transport") {
      data[i][1] = transport;
    }
    if (data[i][0] === "Home") {
      data[i][1] = home;
    }
    if (data[i][0] === "Food") {
      data[i][1] = food;
    }
    console.log(data);
  }

  return (
    <>
      <Flex justifyContent="center">
        <TopBar />
        <BottomMenu />
        <SideMenu isSelected={"statistics"} />
        <Box w="70%">
          <Box m="20px 0" borderBottom="2px solid grey" w="90%">
            <Heading>Statistics</Heading>
          </Box>
          <Box m="auto" w="80%">
            <Chart
              chartType="PieChart"
              data={data}
              options={{
                is3D: true,
                title: "By category",
                colors: [
                  "blueviolet",
                  "Indigo",
                  "DarkViolet",
                  "MediumSeaGreen",
                  "SpringGreen",
                ],
                backgroundColor: "transparent",
                titleTextStyle: {
                  color: "#ffffff",
                },
                legend: {
                  textStyle: {
                    color: "#ffffff",
                  },
                  position: "bottom",
                },
                chartArea: {
                  left: 40,
                  top: 60,
                  width: "100%",
                  height: "100px",
                },
              }}
              width="100%"
              height="500px"
            />
          </Box>

          <Box mt="30px" width="100%">
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={[
                ["Categoria", "Expenses", "Budget"],
                ["January", 400, 3000],
                ["February", -2000, 1000],
                ["March", 3000, 10000],
                ["April", 6000, 2000],
                ["May", 0, 0],
                ["June", 500, 800],
                ["July", 0, 0],
                ["August", 0, 0],
                ["September", 0, 0],
                ["October", 0, 0],
                ["November", 0, 0],
                ["Dezember", 0, 0],
              ]}
              options={{
                title: "Total expenses",
                curveType: "function",
                colors: ["blueviolet", "MediumSpringGreen"],
                legend: {
                  textStyle: {
                    color: "#ffffff",
                  },
                  position: "bottom",
                },
                backgroundColor: "transparent",
                hAxis: {
                  textStyle: {
                    color: "#cecece",
                  },
                },
                vAxis: {
                  textStyle: {
                    color: "#cecece",
                  },
                },
                titleTextStyle: {
                  color: "#ffffff",
                },
                chartArea: {
                  left: 50,
                  top: 50,
                  width: "100%",
                  height: "500px",
                },
              }}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
};
