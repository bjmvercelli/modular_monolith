import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import {
  AddClientFacadeInputDTO,
  ClientAdmFacadeInterface,
  FindClientFacadeInputDTO,
  FindClientFacadeOutputDTO,
} from "./client-adm.facade.interface";

export class ClientAdmFacade implements ClientAdmFacadeInterface {
  constructor(
    private readonly addClientUseCase: UseCaseInterface,
    private readonly findClientUseCase: UseCaseInterface
  ) {}

  add(input: AddClientFacadeInputDTO): Promise<void> {
    return this.addClientUseCase.execute(input);
  }
  find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
    return this.findClientUseCase.execute(input);
  }
}
