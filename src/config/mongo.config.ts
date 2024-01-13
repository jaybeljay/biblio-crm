import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export const createMongoConfig = (
    configService: ConfigService
): MongooseModuleOptions => {
    const host = configService.get('MONGODB_HOST');
    const database = configService.get('MONGODB_DATABASE');
    const replicaSet = configService.get('MONGODB_REPLICA_SET');
    return {
        uri: `mongodb://${host}/${database}?replicaSet=${replicaSet}`,
        user: configService.get('MONGODB_USERNAME'),
        pass: configService.get('MONGODB_PASSWORD'),
        autoIndex: false,
    };
};
