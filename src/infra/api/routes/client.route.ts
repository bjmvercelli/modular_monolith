import { Router } from "express";
import { ClientAdmFacadeFactory } from "../../../modules/client-adm/factory/client-adm.facade.factory";

const clientRouter = Router();

clientRouter.post("/", async (req, res) => {
  try {
    const clientFacade = ClientAdmFacadeFactory.create();
    const input = {
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      complement: req.body.complement,
      document: req.body.document,
      number: req.body.number,
      state: req.body.state,
      street: req.body.street,
      zipCode: req.body.zipCode,
    };
    await clientFacade.add(input);
    res.status(201).send("Client created");
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

export { clientRouter}