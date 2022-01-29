import { Flex, Heading, Text } from "@chakra-ui/react";
import { SideMenu } from "../../components/SideMenu";
import { CardBudget } from "../../components/Card/index";
import { useBudgets } from "../../providers/BudgetsContext";
import { useEffect } from "react";
import { useAuth } from "../../providers/AuthContext";

export const Dashboard = () => {

  const { listBudgets, budgets } = useBudgets();
  const { user, accessToken } = useAuth();
  const userId = user.id;

  useEffect(() => {
    listBudgets(userId, accessToken);
  }, []);

  return (
    <>
      <Flex justifyContent="center" alignItems="flex-start">
        <SideMenu isSelected={true}/>
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
                        totalSpend={800}
                        percentage={80}
                        categories={item.name}
                        maxValue={item.max_value}
                      />
                    </>
                  );
                })}
              </Flex>
            </>
          ) : (
            <Flex alignItems="center" h="100vh">
              <Text
                fontSize="xl"
                p="20px"
                border="2px solid"
                borderRadius="10px"
                borderColor="green.500"
              >
                You don't have any budgets. Add some!
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};
