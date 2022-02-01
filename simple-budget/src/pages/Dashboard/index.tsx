import { Flex, Image, Text } from "@chakra-ui/react";
import { SideMenu } from "../../components/SideMenu";
import { BsPlusCircleFill } from "react-icons/bs";
import { CardBudget } from "../../components/Card/index";
import { useBudgets } from "../../providers/BudgetsContext";
import { useEffect } from "react";
import BlankBoard from "../../assets/DashboardImage3.svg";
import {
  MotionFlex,
  animationFlex,
  itemAnimation,
} from "../../styles/animation";

import { useAuth } from "../../providers/AuthContext";
//import {Redirect} from "react-router-dom"

export const Dashboard = () => {
  const { listBudgets, budgets } = useBudgets();
  const { user, accessToken } = useAuth();
  const userId = user.id;

  useEffect(() => {
    listBudgets(userId, accessToken);
  }, []);

  /* if(!accessToken) {
    return <Redirect to="/"/>
  } */ 

  return (
    <>
      <Flex justifyContent="center" alignItems="flex-start">
        <SideMenu isSelected={true} />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          pl={["0", "85px"]}
        >
          {/* <Heading as="h2" mt="8" mb="6" fontWeight="normal" fontSize="3xl">
            Hi, <b>{user.name}</b>!
          </Heading> */}
          {budgets.length > 0 ? (
            <>
              <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
                {budgets.map((item) => {
                  return (
                    <>
                      <CardBudget
                        budgetId={item.id}
                        budgetName={item.name}
                        budgetCategories={item.categories}
                        maxValue={item.max_value}
                      />
                    </>
                  );
                })}
              </Flex>
            </>
          ) : (
            <MotionFlex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              h="100vh"
              pl={["0", "40px"]}
              // framer-motion props
              initial="hidden"
              animate="visible"
              variants={animationFlex}
              // variants={itemAnimation}
            >
              <Text
                fontSize={["xl", "3xl", "3xl", "3xl"]}
                color="green.500"
                // p="20px"
              >
                You don't have any registered budget.
              </Text>
              <Flex alignItems="center" justifyContent="center" ml="auto">
                <Text mr={2} fontSize="lg" color="purple.400">
                  click on the button
                </Text>
                <BsPlusCircleFill />
                <Text ml={2} fontSize="lg" color="purple.400">
                  to start
                </Text>
              </Flex>
              <Image src={BlankBoard} w="300px" mt="4" />
            </MotionFlex>
          )}
        </Flex>
      </Flex>
    </>
  );
};
