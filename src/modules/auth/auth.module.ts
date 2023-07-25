import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "src/common/common.module";
import { UsersModule } from "../users/users.module";
import { HelperModule } from "src/common/helper/helper.module";
import { ProfessionalsModule } from "../professionals/professionals.module";

@Module({
    imports: [
          CommonModule,
          UsersModule,
          HelperModule,
          ProfessionalsModule
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})

export class AuthModule { }