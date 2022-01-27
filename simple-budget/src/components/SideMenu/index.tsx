import { Box, Flex, Image } from "@chakra-ui/react";
import logo from "../../assets/LogoSm.svg";
import { BsPlusCircleFill } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";

export const SideMenu = ({ isSelected }: any) => {

  return (
    <Flex
      flexDirection="column"
      width="75px"
      bgColor="purple.500"
      h="200vh"
      justifyContent="flex-start"
      alignItems="center"
      gap="30px"
      boxSizing="border-box"
      overflow='hidden'
      position='fixed'
      left='0'
    >
      <Image src={logo} alt="logo" p="5px 5px" w="90px" h="90px" marginTop="10px"/>
      <BsPlusCircleFill size={50} color="white.0" />
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
            <AiOutlineHome size={40} color="white.0" />
          </Flex>
        </>
      )}
    </Flex>
  );
};
