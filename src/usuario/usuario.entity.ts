import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { IsNomeDeUsuarioUnico } from './is-nome-de-usuario-unico.validator';
import { ApiProperty } from '@nestjs/swagger';

export class Usuario {
  id: number;

  @ApiProperty()
  @Expose({
    name: 'username',
  })
  @IsNomeDeUsuarioUnico({
    message: 'nomeDeUsuario precisa ser único.',
  })
  @IsNotEmpty({
    message: 'nomeDeUsuario é obrigatório.',
  })
  @IsString({
    message: 'nomeDeUsuario precisa ser uma string.',
  })
  nomeDeUsuario: string;

  @ApiProperty()
  @Expose({
    name: 'email',
  })
  @IsEmail(
    {},
    {
      message: 'email precisa ser um endereço de email válido.',
    },
  )
  email: string;

  @ApiProperty()
  @Expose({
    name: 'password',
  })
  @Exclude({
    toPlainOnly: true,
  })
  @IsNotEmpty({
    message: 'senha é obrigatório.',
  })
  senha: string;

  @ApiProperty()
  @Expose({
    name: 'fullName',
  })
  @IsNotEmpty({
    message: 'nomeCompleto é obrigatório.',
  })
  nomeCompleto: string;

  @ApiProperty()
  @Expose({
    name: 'joinDate',
  })
  dataDeEntrada: Date;
}
