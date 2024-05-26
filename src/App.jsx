// Importando os componentes da biblioteca chackara-ui
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
// Fim da importação dos componentes da biblioteca chackara-ui

// Importando hooks do React e componente ModalCadastroServico
import { useEffect, useState } from "react";
import ModalCadastroServico from "./components/ModalCadastroServico";
// Fim importação dos hooks do React e componente ModalCadastroServico

const App = () => {
  // useDisclosure é um hook do Chakra UI para gerenciar a abertura e fechamento de modais
  const { isOpen, onOpen, onClose } = useDisclosure();

  // useState é um hook do React para gerenciar estados locais
  const [data, setData] = useState([]);// State para armazenar os dados dos serviços
  const [dataEdit, setDataEdit] = useState({});// State para armazenar os dados editados de serviço

  // useBreakpointValue é um hook do Chakra UI para aplicar estilos responsivos
  const isMobile = useBreakpointValue({
    base: true, // Para telas pequenas (mobile), isMobile será true
    lg: false, // Para telas grandes (desktop), isMobile será false
  });

  // useEffect é um hook do React que executa uma função após a renderização do componente
  useEffect(() => {
    // Recupera os dados dos serviços armazenados no localStorage
    const db_service = localStorage.getItem("cad_service")
      ? JSON.parse(localStorage.getItem("cad_service"))// Se existir, análisa os dados em uma String JSON e os converte objetos estruturados em JavaScript
      : []; // Se não existir, inicia com um array vazio

    setData(db_service); // Atualiza o estado com os dados recuperados
  }, [setData]);

  // Função para remover um serviço da lista
  const handleRemove = (nameService) => {
    // Filtra os dados da state removendo o serviço com o nome especificado
    const newArray = data.filter((item) => item.nameService !== nameService);

    setData(newArray);// Atualiza o state com os dados filtrados

    // Atualiza o localStorage com os dados filtrados
    localStorage.setItem("cad_service", JSON.stringify(newArray));
  };

  return (
    // Flex container do Chakra UI para criar um layout flexível e com as estilizações necessárias para uma boa visualização
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        {/* Cabeçalho */}
        <Heading mb={4}>Cadastro de Serviços - Filipe Almeida - 2017200655</Heading>
        {/* Butão de cadastro */}
        <Button  bgGradient={[
    'linear(to-tr, teal.300, yellow.400)',
    'linear(to-t, blue.200, teal.500)',
    'linear(to-b, orange.100, purple.300)',
  ]} onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>
        {/* Fim cabeçalho */}

        {/* Tabela de visualização de dados cadastrados */}
        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome do Serviço
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Descrição do Serviço
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ nameService, descService }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{nameService}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{descService}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ nameService, descService, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(nameService)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {/* Fim tabela de visualização */}
      {/* Chamada do componente/modal que realiza o cadastro de novos serviços caso seja clicado o botão de novo cadastrado */}
      {isOpen && (
        <ModalCadastroServico
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
    // Fim do container
  );
};

export default App; //Exportar o componente
