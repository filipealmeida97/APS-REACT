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
  import { useState } from "react";
  
  const ModalCadastroServico = ({ data, setData, dataEdit, isOpen, onClose }) => {
    
    const [nameService, setNameService] = useState(dataEdit.nameService || "");
    const [descService, setDescService] = useState(dataEdit.descService || "");
  
    const handleSave = () => {
      if (!nameService || !descService) return;
  
      if (nameAlreadyExists()) {
        return alert("Nome de serviço já cadastrado!");
      }
  
      if (Object.keys(dataEdit).length) {
        data[dataEdit.index] = { nameService, descService };
      }
  
      const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), { nameService, descService }]
        : [...(data ? data : [])];
  
      localStorage.setItem("cad_service", JSON.stringify(newDataArray));
  
      setData(newDataArray);
  
      onClose();
    };
  
    const nameAlreadyExists = () => {
      if (dataEdit.nameService !== nameService && data?.length) {
        return data.find((item) => item.nameService === nameService);
      }
  
      return false;
    };
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cadastro de Serviço</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
            </ModalBody>
  
            <ModalFooter justifyContent="start">
              <Button colorScheme="green" mr={3} onClick={handleSave}>
                SALVAR
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                CANCELAR
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalCadastroServico;
  