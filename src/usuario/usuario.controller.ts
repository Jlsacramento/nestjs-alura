import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get(':nomeDeUsuario')
  @ApiParam({
    name: 'nomeDeUsuario',
    type: 'string',
    description: 'Nome de usuário registrado na API.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado.',
    type: Usuario,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  public buscaPorNomeDeUsuario(
    @Param('nomeDeUsuario') nomeDeUsuario: string,
  ): Usuario {
    const usuarioEncontrado =
      this.usuarioService.buscaPorNomeDeUsuario(nomeDeUsuario);

    if (!usuarioEncontrado) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado.',
      });
    }
    return usuarioEncontrado;
  }

  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    type: Usuario,
  })
  public cria(@Body() usuario: Usuario): NestResponse {
    const usuarioCriado = this.usuarioService.cria(usuario);

    return new NestResponseBuilder()
      .comStatus(HttpStatus.CREATED)
      .comHeaders({
        Location: `/users/${usuarioCriado.nomeDeUsuario}`,
      })
      .comBody(usuarioCriado)
      .build();
  }
}
