import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30s' }
    })
  ],
  exports: [JwtModule]
})
export class CoreModule {}