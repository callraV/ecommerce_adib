import React, { useState } from "react";
import Axios from "axios";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { loginUser } from "../features/users/usersSlice";

import { useSelector, useD } from "react-redux";
import { Flex, Center, Card, CardBody, Image, Stack, Heading, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";

function Profile() {
  const userGlobal = useSelector((state) => state.users.user);
  // const dispatch = useDispatch();
  const profilePhoto = `http://localhost:8001${userGlobal.imagePath}`;
  const id = userGlobal.id;

  //modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //edit profile - new pfp
  const [file, setFile] = useState(null);
  const onFileChange = (event) => {
    console.log(event.target.files[0]); //checker
    setFile(event.target.files[0]);
    let preview = document.getElementById("imagePrev");
    preview.src = URL.createObjectURL(event.target.files[0]);
  };

  //send to backend
  const uploadImage = async () => {
    if (file) {
      //create form data (postman)
      const obj = {
        id: id,
      };
      let formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(obj));

      const response = await axios.post("http://localhost:8001/upload", formData);
      console.log(response);
      // alert("Profile updated");
    } else {
      alert("No image selected");
    }
  };

  return (
    <div className="bg-[#0d1117] text-white p-9 min-h-screen">
      <Card backgroundColor="#0d1117" color="white" border="2px" borderColor="gray.800" maxW="380px">
        <CardBody>
          <Image src={profilePhoto} objectFit="cover" boxSize="300px" alt="profile photo" borderRadius="full" />
          <Stack mt="6" spacing="3">
            <Heading size="lg">{userGlobal.name}</Heading>
            <Flex color="gray.500" gap="2">
              <Text fontSize="xl">@{userGlobal.username}</Text>
              {/* // */}.{/* // */}
              {userGlobal.isAdmin === 0 ? <Text fontSize="xl">User</Text> : <Text fontSize="xl">Admin</Text>}
            </Flex>

            <Text color="white">Description</Text>

            <Button variant="solid" colorScheme="green" width="300px" onClick={onOpen}>
              Edit
            </Button>

            {/* modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update profile picture</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Center>
                    <Image id="imagePrev" boxSize="350px" objectFit="cover" />
                  </Center>
                </ModalBody>

                <ModalFooter>
                  <div>
                    <input
                      type="file"
                      id="file"
                      onChange={(event) => {
                        onFileChange(event);
                      }}
                    ></input>
                  </div>
                  <Button colorScheme="blue" mr={3} onClick={uploadImage}>
                    Upload
                  </Button>
                  {/* <Button variant="ghost" onClick={onClose}>
                    Close
                  </Button> */}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;
