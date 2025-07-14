import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';
import { PatientsModule } from './patients/patients.module';
import { VisitsModule } from './visits/visits.module';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://jeanoduhay:cGXFbZr2Fw7HqLlG@cluster0.x72bw4h.mongodb.net/patient-visit-db?retryWrites=true&w=majority&appName=Cluster0'), 
    PatientsModule, 
    VisitsModule],
})
export class AppModule implements OnModuleInit{
    constructor(@InjectConnection() private readonly connection: Connection) {}

    onModuleInit() {
        const state = this.connection.readyState;
        const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
        console.log(`✅ Mongoose connection state: ${states[state]}`);
    }
}
