import { Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { SideMenu } from "../../components/SideMenu";
import { CardBudget } from "../../components/Card/index";
import { ModalAddExpense } from "../../components/Modais/addExpense";
import { useBudgets } from "../../providers/BudgetsContext";

export const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { budgets } = useBudgets();

  return (
    <>
      <ModalAddExpense isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
                {budgets.map((_) => (
                  <>
                    <CardBudget
                      maxValue={3000}
                      minimo={800}
                      percentage={80}
                      categories={"Category"}
                      //maxValue={item.max_value}
                      //minimo={800}
                      //percentage={80}
                      //categories={item.categories}
                      onOpen={onOpen}
                    />
                  </>
                ))}
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
