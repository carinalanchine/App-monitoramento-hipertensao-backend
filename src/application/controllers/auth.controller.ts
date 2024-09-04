import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import { LoginUseCase } from "../../domain/useCases/login.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";
import HttpError from "../../infra/exceptions/httpError";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { cpf, password } = req.body;

      if (!cpf) throw new HttpError("CPF is required", 400);
      if (!password) throw new HttpError("Password is required", 400);

      const repository = new UserRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new LoginUseCase(repository, criptography);

      const loginUser = await useCase.execute({ cpf, password });

      res.status(200).json({
        status: "success",
        message: "Login realizado com sucesso",
        accessToken: loginUser.token,
        user: {
          id: loginUser.user.id,
          name: loginUser.user.name,
          cpf: loginUser.user.cpf,
          role: loginUser.user.role,
          hospitalId: loginUser.user.hospitalId,
        }
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          status: "error",
          message: error.message
        });
      }

      else
        res.status(500).json({
          status: "error",
          message: "Erro ao fazer login"
        });
    }
  }
}

export default new AuthController();
