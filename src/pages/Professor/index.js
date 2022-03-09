import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { render } from "react-dom";
import { toast } from "react-toastify";

import ListView from "../../components/ListView/index";
import Modal from "../../components/Modal/index";
import Page from "../../components/Page/index";
import api from "../../services/axios";


const endpoint = "/professor";

const columns = [
  {
    value: "ID",
    id: "id",
  
  },
  {
    value: "Name",
    id: "name",
  },
  {
    value: "cpf",
    id: "cpf",
  }
  {
      value: "departamentId",
      id: "departamentId",
      render: (departamentId)=> departamentId.name,
  }
];

const Professor = () => {
    const [visible, setVisible] = useState(false);
    const [professor, setProfessor] = useState(INITIAL_STATE);

    const handleSave = async (refetch) => {
      try {
        if (professor.id) {
            await api.put(`${endpoint}/${professor.id})`, {
              name: professor.name,   
            });
            toast.success("Atualizado com sucesso!");
        } else {
          await api.post(endpoint, { name: professor.name });
  
          toast.success("Cadastrado com sucesso!");
        }
  
        setVisible(false);
  
        await refetch();
      } catch (error) {
        toast.error(error.message);
      }
    };
    

}
const actions = [
    {
      name: "Edit",
      action: (professor) => {
        setCourse(professor);
        setVisible(true);
      },
    },
    {
      name: "Remove",
      action: async (item, refetch) => {
        if (window.confirm("Você tem certeza que deseja remover?")) {
          try {
            await api.delete(`${endpoint}/${item.id}`);
            await refetch();
            toast.info(`${item.name} foi removido`);
          } catch (error) {
            toast.info(error.message);
          }
        }
      },
    },
  ];

  return (
    <Page title="professor">
      <Button
        className="mb-2"
        onClick={() => {
          setCourse(INITIAL_STATE);
          setVisible(true);
        }}
      >
        Criar Professor
      </Button>
      <ListView actions={actions} columns={columns} endpoint={endpoint}>
        {({ refetch }) => (
          <Modal
            title={`${professor.id ? "Update" : "Create"} professor`}
            show={visible}
            handleClose={() => setVisible(false)}
            handleSave={() => handleSave(refetch)}
          >
            <Form>
              <Form.Group>
                <Form.Label>professor Name</Form.Label>
                <Form.Control
                  name="professor"
                  onChange={(event) =>
                    setProfessor({ ...professor, name: event.target.value })
                  }
                  value={professor.name}
                />
              </Form.Group>
            </Form>
          </Modal>
        )}
      </ListView>
    </Page>
  );
};

export default professor;
