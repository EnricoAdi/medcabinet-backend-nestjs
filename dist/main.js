"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: {
            origin: "*",
            methods: 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            optionsSuccessStatus: 200,
            credentials: true,
        } });
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        stopAtFirstError: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }));
    await app.listen(3002);
}
bootstrap();
//# sourceMappingURL=main.js.map