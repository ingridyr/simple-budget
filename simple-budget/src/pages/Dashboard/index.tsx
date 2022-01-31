import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { SideMenu } from "../../components/SideMenu";
import { BsPlusCircleFill } from "react-icons/bs";
import { CardBudget } from "../../components/Card/index";
import { useBudgets } from "../../providers/BudgetsContext";
import { useEffect } from "react";
import { useAuth } from "../../providers/AuthContext";
import EmptyPark from "../../assets/DashboardImage1.svg";
import WhitePapers from "../../assets/DashboardImage2.svg";
import BlankBoard from "../../assets/DashboardImage3.svg";
import {
  MotionFlex,
  animationFlex,
  itemAnimation,
} from "../../styles/animation";

import {Redirect} from "react-router-dom"

export const Dashboard = () => {
  const { listBudgets, budgets } = useBudgets();
  const { user, accessToken } = useAuth();
  const userId = user.id;

  useEffect(() => {
    listBudgets(userId, accessToken);
  }, []);

  if(!accessToken) {
    return <Redirect to="/"/>
  } 

  return (
    <>
      <Flex justifyContent="center" alignItems="flex-start">
        <SideMenu isSelected={true} />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {budgets.length > 0 ? (
            <>
              <Heading
                alignSelf="flex-start"
                h="50px"
                m="20px 0 0 100px"
                size="lg"
              >
                Expenses by category
              </Heading>
              <Flex
                gap="30px"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
                w="90%"
                h="70%"
                alignContent="flex-start"
                m="10px"
              >
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
              pl="75px"
              // framer-motion props
              initial="hidden"
              animate="visible"
              variants={animationFlex}
              // variants={itemAnimation}
            >
              <Text
                fontSize="3xl"
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
