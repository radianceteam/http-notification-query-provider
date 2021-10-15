"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!process.env.IS_TS_NODE) {
    require('module-alias/register');
}
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    console.log(process.env.SENDGRID_API_KEY);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Notification app')
        .setDescription('Notification app work for query app')
        .setVersion('1.0.0')
        .addTag('Free Ton')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
    app.enableCors();
    await app.listen(5002);
}
bootstrap();
//# sourceMappingURL=main.js.map