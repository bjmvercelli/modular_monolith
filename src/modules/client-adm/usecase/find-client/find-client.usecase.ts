import { ClientGateway } from "../../gateway/client.gateway";
import {
  FindClientInputDTO,
  FindClientOutputDTO,
} from "./find-client.usecase.dto";

export class FindClientUseCase {
  constructor(private readonly clientRepository: ClientGateway) {}

  async execute(input: FindClientInputDTO): Promise<FindClientOutputDTO> {
    const client = await this.clientRepository.find(input.id);
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
