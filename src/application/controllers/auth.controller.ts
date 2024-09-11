import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import { LoginUseCase } from "../../domain/useCases/login.use-case";
import { CriptographyAdapter } from "../../infra/adapters/CriptograpyAdapter";
import HttpError from "../../infra/exceptions/httpError";
import { RefreshTokenUseCase } from "../../domain/useCases/refresh-token.use-case";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { cpf, password } = req.body;

      if (!cpf) throw new HttpError("CPF não informado", 400);
      if (!password) throw new HttpError("Senha não informada", 400);

      const repository = new UserRepository();
      const criptography = new CriptographyAdapter();
      const useCase = new LoginUseCase(repository, criptography);

      const loginUser = await useCase.execute({ cpf, password });

      res.status(200).json({
        message: "Login bem sucedido",
        accessToken: loginUser.token.accessToken,
        refreshToken: loginUser.token.refreshToken,
        user: {
          id: loginUser.user.id,
          name: loginUser.user.name,
          cpf: loginUser.user.cpf,
          role: loginUser.user.role,
          hospitalId: loginUser.user.hospitalId,
        }
      });
    } catch (error) {
      if (error instanceof HttpError)
        res.status(error.statusCode).json({
          message: error.message
        });

      else
        res.status(500).json({
          message: "Erro ao fazer login"
        });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const user = req.user;

      const useCase = new RefreshTokenUseCase();
      const refresh = await useCase.execute(user);

      res.status(200).json({
        message: "Token atualizado",
        accessToken: refresh.token.accessToken,
        refreshToken: refresh.token.refreshToken
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao atualizar token"
      });
    }
  }
}

export default new AuthController();