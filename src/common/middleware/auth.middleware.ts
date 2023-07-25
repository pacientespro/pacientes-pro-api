// auth.middleware.ts

import { CanActivate, ExecutionContext, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../helper/token.service';

@Injectable()
export class AuthMiddleware implements CanActivate {
  constructor(private jwtService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Without authorization');
    }
    try {
      const payload = await this.jwtService.verifyToken(token);
      request['claims'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid authorization');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//     constructor(
//         private readonly tokenService: TokenService
//     ) {

//     }
//     async use(req: Request, res: Response, next: NextFunction) {

//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const token = authHeader.split(' ')[1];
//         const decoded = true;
//         if (!token || !decoded) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//         req["claims"] = decoded;

//         next();
//     }
// }
