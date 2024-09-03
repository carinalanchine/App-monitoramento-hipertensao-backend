import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import { LoginUseCase } from "../../domain/useCases/login.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { cpf, password } = req.body;

      try {
        if (!cpf) throw new Error("CPF is required");
        if (!password) throw new Error("Password is required");
      } catch (error) {
        console.error(error);
        res.status(400).json({
          status: "error",
          message: "Dados incompletos"
        });
      }

      const repository = new UserRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new LoginUseCase(repository, criptography);

      const loginUser = await useCase.execute({ cpf, password });

      if (!loginUser)
        throw new Error("Erro ao fazer login");

      res.status(200).json({
        status: "success",
        message: "Login realizado com sucesso",
        token: loginUser.token,
        user: {
          id: loginUser.user.id,
          name: loginUser.user.name,
          cpf: loginUser.user.cpf,
          hospital_id: loginUser.user.hospitalId
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Erro ao fazer login"
      });
    }
  }
}

export default new AuthController();
