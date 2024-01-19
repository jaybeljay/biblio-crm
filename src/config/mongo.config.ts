import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export const createMongoConfig = (
    configService: ConfigService
): MongooseModuleOptions => {
    const host = configService.get('MONGO_HOST');
    const database = configService.get('MONGO_INITDB_DATABASE');
    const replicaSet = configService.get('MONGO_REPLICA_SET_NAME');
    return {
        uri: `mongodb://${host}/${database}?replicaSet=${replicaSet}`,
        user: configService.get('MONGO_INITDB_ROOT_USERNAME'),
        pass: configService.get('MONGO_INITDB_ROOT_PASSWORD'),
        autoIndex: false,
    };
};
