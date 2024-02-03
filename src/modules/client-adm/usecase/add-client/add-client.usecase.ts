import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";
import { ClientGateway } from "../../gateway/client.gateway";
import { AddClientInputDTO, AddClientOutputDTO } from "./add-client.usecase.dto";


export class AddClientUseCase {
  constructor(private readonly clientRepository: ClientGateway) {}

  async execute(input: AddClientInputDTO): Promise<AddClientOutputDTO> {
    const client = new Client({
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      document: input.document,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
    });
    await this.clientRepository.add(client);

    return {
      id: client.id.value,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}