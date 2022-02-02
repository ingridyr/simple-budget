import {
  FormLabel,
  InputGroup,
  InputLeftElement,
  Text,
  Input,
} from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons/lib";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
  register: (user: any) => void;
  value?: string;
}

export const InputForm = ({
  name,
  type,
  placeholder,
  label,
  error = null,
  icon: Icon,
  register,
  value,
  ...rest
}: InputProps) => {
  return (
    <>
      <FormLabel htmlFor={name} fontSize="18px" mb="1">
        {label}
      </FormLabel>
      <InputGroup flexDirection="column" h="85px">
        {Icon && (
          <InputLeftElement
            mt="2.5"
            children={<Icon size={18} color={theme.colors.purple["500"]} />}
          />
        )}
        <Input
          border="2px solid"
          borderColor="purple.500"
          background="black.500"
          color="white"
          height="60px"
          fontSize="lg"
          placeholder={placeholder}
          type={type}
          value={value}
          placeholder={placeholder}
          {...register(name)}
          {...rest}
        />
        <Text color="red.500" fontSize="md" pl="2" mb="0" pb="0">
          {error?.message}
        </Text>
      </InputGroup>
    </>
  );
};
