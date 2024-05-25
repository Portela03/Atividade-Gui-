import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyCXopIGq5pj3MH_r430-AnNplaqD6w5uTM",
    authDomain: "atividade-gui-1.firebaseapp.com",
    projectId: "atividade-gui-1",
    storageBucket: "atividade-gui-1.appspot.com",
    messagingSenderId: "321579827051",
    appId: "1:321579827051:web:b3c6166a529d8ef80c562e"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app); 

  const [name, setName] = useState("");
  const [ra, setRa] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "alunos"), {
        name: name,
        ra: ra
      });
      console.log("Documento escrito com ID: ", docRef.id);
    
      setName("");
      setRa("");
    } catch (error) {
      console.error("Erro ao adicionar: ", error);
    }
  };


  const handleGetName = (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setName(e.target.value)
    
  }
  const handleGetRa = (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
   
    setRa(e.target.value)
  }

  return (
    <Container>
      <h1>Formulário de Cadastro de Aluno</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do aluno"
            name="name"
            value={name}
            onChange={handleGetName}
          />
        </Form.Group>

        <Form.Group controlId="formBasicRA">
          <Form.Label>R.A</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o R.A. do aluno"
            name="ra"
            value={ra}
            onChange={handleGetRa}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default App;