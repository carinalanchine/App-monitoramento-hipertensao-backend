import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import { LoginUseCase } from "../../domain/useCases/login.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { cpf, password } = req.body;

      if (!cpf) throw new Error("CPF is required");
      if (!password) throw new Error("Password is required");

      const repository = new UserRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new LoginUseCase(repository, criptography);

      const loginUser = await useCase.execute({ cpf, password });

      res.status(200).json({
        status: "success",
        message: "Login successful",
        id: loginUser.user.id,
        name: loginUser.user.name,
        token: loginUser.token
      });
    } catch (e) {
      const error = e as { message: string };
      res.status(400).json({ status: "error", message: error.message });
    }
  }
}

export default new AuthController();
