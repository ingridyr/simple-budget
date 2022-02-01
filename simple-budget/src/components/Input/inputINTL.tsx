import React from "react";
import IntlCurrencyInput from "react-intl-currency-input";
import {
  FormLabel,
  InputGroup,
  InputLeftElement,
  Text,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons/lib";
import { theme } from "../../styles/theme";

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
  register: (user: any) => void;
}

const InputCurrency = ({
  name,
  type,
  placeholder,
  label,
  error = null,
  icon: Icon,
  register,
  ...rest
}: InputProps) => {
  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    value: any,
    maskedValue: any
  ) => {
    evt.preventDefault();
    console.log(value);
    console.log(maskedValue);
  };
  return (
    <>
      <FormLabel htmlFor={name} fontSize="18px">
        {label}
      </FormLabel>
      <InputGroup flexDirection="column">
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
          type={type}
          {...register(name)}
          {...rest}
          as={IntlCurrencyInput}
          currency="BRL"
          config={currencyConfig}
        />
        <Text marginBottom="12px" color="red.500" fontSize="md" pl="2">
          {error?.message}
        </Text>
      </InputGroup>
    </>
  );
};
export default InputCurrency;
