// Chakra imports
import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useContract, useContractRead } from "@thirdweb-dev/react";
// Custom components
import Card from "components/card/Card";
// Assets
import { Image } from "components/image/Image";
import { ethers } from "ethers";
import { PaddockContractAddress } from "lib/constant";
import { FaDollarSign } from "react-icons/fa";

export default function NFT(props: {
  image: string;
  name: string;
  date: string;
  projectId: string;
}) {
  const { image, name, date, projectId } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("brands.900", "white");
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "navy.700", boxShadow: "unset" }
  );
  const textColorDate = useColorModeValue("secondaryGray.600", "white");

  const { contract } = useContract(PaddockContractAddress);

  const { data } = useContractRead(contract, "projects", projectId);

  const formattedSuccess = Number(
    ethers.utils.formatEther(data?.totalBetOnSuccess.toString() || "0")
  );
  const formattedFailure = Number(
    ethers.utils.formatEther(data?.totalBetOnFailure.toString() || "0")
  );
  const formattedSponsored = Number(
    ethers.utils.formatEther(data?.sponsored.toString() || "0")
  );
  const totalPod = formattedSuccess + formattedFailure + formattedSponsored;
  const winOdds = (totalPod + 1) / (formattedSuccess + 1);
  const loseOdds = (totalPod + 1) / (formattedFailure + 1);

  return (
    <Card
      _hover={bgItem}
      bg="transparent"
      boxShadow="unset"
      px="24px"
      py="21px"
      transition="0.2s linear"
    >
      <Flex direction={{ base: "column" }} justify="center">
        <Flex position="relative" align="center">
          <Box>
            <Image
              src={image}
              w="66px"
              h="66px"
              borderRadius="20px"
              me="16px"
            />
          </Box>
          <Flex
            direction="column"
            w={{ base: "70%", md: "100%" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
          >
            <Text
              color={textColor}
              fontSize={{
                base: "md",
              }}
              mb="5px"
              fontWeight="bold"
              me="14px"
            >
              <Link href={`project/${projectId}`}>{name}</Link>
            </Text>
            <Text
              color="secondaryGray.600"
              fontSize={{
                base: "sm",
              }}
              fontWeight="400"
              me="14px"
            >
              by {data?.creator.substring(0, 12) + "..."}
            </Text>
          </Flex>
          <Button
            variant="darkBrand"
            bgColor="green.400"
            color="white"
            fontSize="sm"
            fontWeight="500"
            borderRadius={{ base: "10px", lg: "70px" }}
            px={{ base: "0px", md: "24px" }}
            py="5px"
          >
            × {parseFloat(winOdds.toFixed(2))}
          </Button>
          <Button
            variant="darkBrand"
            bgColor="red.400"
            color="white"
            fontSize="sm"
            fontWeight="500"
            borderRadius={{ base: "10px", lg: "70px" }}
            px={{ base: "0px", md: "24px" }}
            py="5px"
            mx="4"
          >
            × {parseFloat(loseOdds.toFixed(2))}
          </Button>
          <Flex
            w="max-content"
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
            align="center"
            display={{ base: "none", md: "flex" }}
          >
            <Icon as={FaDollarSign} color={textColor} width="9px" me="7px" />
            <Text
              w="max-content"
              fontWeight="700"
              fontSize="md"
              color={textColor}
            >
              {totalPod}
            </Text>
            <Icon
              as={CalendarIcon}
              color={textColor}
              width="9px"
              me="7px"
              ml="4"
            />
            <Text fontWeight="700" color={textColor} w="24">
              {date}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
