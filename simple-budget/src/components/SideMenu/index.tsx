import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { BsPlusCircleFill } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { ModalAddBuget } from "../Modais/addBuget";
import { useAuth } from "../../providers/AuthContext";
import logo from "../../assets/LogoSm.svg";

interface SideMenuProps {
  isSelected: any;
}

export const SideMenu = ({ isSelected }: SideMenuProps) => {
  const {
    isOpen: isModalAddBudgetOpen,
    onOpen: onModalAddBudgetOpen,
    onClose: onModalAddBudgetClose,
  } = useDisclosure();

  const { logout } = useAuth()

  return (
    <>
      <ModalAddBuget
        isOpen={isModalAddBudgetOpen}
        onClose={onModalAddBudgetClose}
      />
      <Flex
        flexDirection="column"
        width="75px"
        bgColor="purple.500"
        h="200vh"
        justifyContent="flex-start"
        alignItems="center"
        gap="30px"
        boxSizing="border-box"
        overflow="hidden"
        position="fixed"
        left="0"
      >
        <Image
          src={logo}
          alt="logo"
          p="5px 5px"
          w="90px"
          h="90px"
          marginTop="10px"
        />
        <Flex
          alignItems="center"
          justifyContent="center"
          _hover={{
            borderRadius: "50%",
            w: "50px",
            h: "50px",
            boxShadow: "0px 1px 7px 2px #c28cff",
          }}
          cursor="pointer"
        >
          <BsPlusCircleFill
            size={50}
            color="white.0"
            onClick={() => onModalAddBudgetOpen()}
          />
        </Flex>
        {isSelected && (
          <>
            <Flex
              boxShadow="0px 1px 7px 2px #5210AF"
              w="100%"
              h="60px"
              alignItems="center"
              justifyContent="flex"
              gap="10px"
            >
              <Box w="10px" h="100%" bgColor="white.0" alignSelf="flex-start" />
              <AiOutlineHome size={40} color="white.0" cursor="pointer" />
            </Flex>
          </>
        )}
        <Box position="fixed" bottom="28px" cursor="pointer">
          <IoExitOutline size={40} onClick={() => logout()}/>
        </Box>
      </Flex>
    </>
  );
};
