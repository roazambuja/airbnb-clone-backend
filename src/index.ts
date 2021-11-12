import app from './app';
import { connect } from 'mongoose';

const uriMongoDB = process.env.MONGO_URL || 'mongodb://localhost:27017/';

async function main() {
    try {
        await connect(uriMongoDB);
        console.log('Conectado ao MongoDb Atlas');

        app.listen(app.get('port'), () => {
            console.log('Express na porta:', app.get('port'));
            console.log('Express no modo:', app.get('env'));
        });
        
    } catch (error) {
        console.log('Falha de acesso ao BD:');
        console.error(error);
    } 
}

main();