import { Platform } from 'react-native';

class Config {
    public get baseUrl():string {
        if(Platform.OS === 'android') {
            return 'http://10.0.2.2:3000';
        }
        return 'http://localhost:3000';
    }
}

export default new Config();