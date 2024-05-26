// Importação dos componentes necessários do Chakra UI para criar e estilizar o modal
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
  } from "@chakra-ui/react";
  // Importação do hook useState do React para gerenciar o estado dos inputs
  import { useState } from "react";

  // Definição do componente funcional ModalCadastroServico que recebe várias props
  const ModalCadastroServico = ({ data, setData, dataEdit, isOpen, onClose }) => {
    
    // Inicializa as States nameService e descService com valores de dataEdit ou valores vazios
    const [nameService, setNameService] = useState(dataEdit.nameService || "");
    const [descService, setDescService] = useState(dataEdit.descService || "");
  
    // Função chamada quando o botão de salvar é clicado
    const handleSave = () => {
      // Verifica se ambos os campos nameService e descService estão preenchidos
      if (!nameService || !descService) return;
  
      // Verifica se o nome do serviço já existe nos dados
      if (nameAlreadyExists()) {
        return alert("Nome de serviço já cadastrado!");
      }
      
      // Se dataEdit não estiver vazio, atualiza o serviço existente
      if (Object.keys(dataEdit).length) {
        data[dataEdit.index] = { nameService, descService };
      }
      // Cria um novo array de dados com o novo serviço adicionado se dataEdit estiver vazio
      const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), { nameService, descService }]
        : [...(data ? data : [])];
      
      // Armazena o novo array de dados no localStorage
      localStorage.setItem("cad_service", JSON.stringify(newDataArray));
  
      // Atualiza o estado data com o novo array de dados
      setData(newDataArray);

      // Fecha o modal
      onClose();
    };
  
    // Função que verifica se o nome do serviço já existe nos dados
    const nameAlreadyExists = () => {
      if (dataEdit.nameService !== nameService && data?.length) {
        return data.find((item) => item.nameService === nameService);
      }
  
      return false;
    };
  
    // Retorna o JSX que define a estrutura e os elementos do modal para cadastro de serviços
    return (
      <>
        {/* Modal do Chakra UI que abre ou fecha baseado na prop isOpen */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            {/* Título do modal */}
            <ModalHeader>Cadastro de Serviço</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Formulário de controle com dois campos de entrada para nome e descrição do serviço */}
              <FormControl display="flex" flexDir="column" gap={4}>
                <Box>
                  <FormLabel>Nome do serviço</FormLabel>
                  <Input
                    type="text"
                    value={nameService}
                    onChange={(e) => setNameService(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Descrição do serviço</FormLabel>
                  <Input
                    type="text"
                    value={descService}
                    onChange={(e) => setDescService(e.target.value)}
                  />
                </Box>
              </FormControl>
              {/* Fim formulário */}
            </ModalBody>
            {/* Fim corpo do modal */}

            {/* Rodapé do modal com botões de salvar e cancelar */}
            <ModalFooter justifyContent="start">
              <Button colorScheme="green" mr={3} onClick={handleSave}>
                SALVAR
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                CANCELAR
              </Button>
            </ModalFooter>
            {/* Fim do rodapé */}
          </ModalContent>
          {/* Fim do conteúdo do modal */}
        </Modal>
        {/* Fim modal */}
      </>
    );
  };
  
  export default ModalCadastroServico; //Exportar o componente ModalCadastroServico
  